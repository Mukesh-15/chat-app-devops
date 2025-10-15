// Home.js
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ChatList from "./Chatlist";
import ChatBox from "./Chatbox";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const socket = io.connect("http://localhost:5500");

export default function Home() {
  const navigate = useNavigate();
  const [currFrnd, setCurrFrnd] = useState("");
  const [id, setId] = useState("100");
  const [users, setUsers] = useState([]);
  const [frndName, setFrndName] = useState("VibeNest Chat");

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const fetchAllMsgs = async () => {
      try {
        const res = await fetch("http://localhost:5500/users/getAllMsgs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        setUsers(data);
        setCurrFrnd(data[0].friendId);
        setFrndName(data[0].username);
        setId(data.yourId);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchAllMsgs();
  }, []);

  return (
    <div className="home">
      <Sidebar id={id} />
      <ChatList users={users} setCurrFrnd={setCurrFrnd} setFrndName={setFrndName} />
      <ChatBox currFrnd={currFrnd} socket={socket} frndName={frndName} />
    </div>
  );
}
