import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ChatList from "./Chatlist";
import ChatBox from "./Chatbox";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import apiFetch from "../api";
import "./Home.css";

const socket = io.connect("http://localhost:5500");

export default function Home() {
  const navigate = useNavigate();
  const [currFrnd, setCurrFrnd] = useState("");
  const [id, setId] = useState("100");
  const [users, setUsers] = useState([]);
  const [frndName, setFrndName] = useState("VibeNest Chat");
  const [showChatList, setShowChatList] = useState(false); // toggle from Sidebar

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const fetchAllMsgs = async () => {
      try {
        const res = await apiFetch("users/getAllMsgs", { method: "GET" });
        const data = res;
        setUsers(data);
        setCurrFrnd(data[0]?.friendId || "");
        setFrndName(data[0]?.username || "VibeNest Chat");
        setId(data.yourId || "100");
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchAllMsgs();
  }, []);

  return (
    <div className="home">
      <Sidebar id={id} onChatClick={() => setShowChatList(!showChatList)} />

      <div className={`chatlist-wrapper ${showChatList ? "show" : ""}`}>
        <ChatList
          users={users}
          setCurrFrnd={(id) => {
            setCurrFrnd(id);
            setShowChatList(false);
          }}
          setFrndName={setFrndName}
        />
      </div>

      <ChatBox currFrnd={currFrnd} socket={socket} frndName={frndName} />
    </div>
  );
}
