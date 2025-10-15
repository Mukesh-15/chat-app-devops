import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./AddFriends.css";

export default function AddFriends() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5500/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        console.log("Fetched data:", data); 

        if (Array.isArray(data)) {
          setUsers(data);
        } else if (Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const sendRequest = async (frndId) => {
    try {
      const res = await fetch("http://localhost:5500/users/frndrequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ frndId }),
      });

      const response = await res.json();

      if (response.success) {
        alert("✅ Friend request sent successfully");
      } else {
        alert("❌ Friend request failed");
      }
    } catch (err) {
      console.error("Error sending friend request:", err);
    }
  };

  return (
    <div className="addfriends-page">
      <Sidebar />

      <div className="addfriends-container">
        <h2 className="addfriends-title">Add New Friends</h2>

        <div className="addfriends-search">
          <input
            type="text"
            placeholder="Search by name or email"
            className="search-input"
          />
        </div>

        <div className="friends-grid">
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <div key={user._id} className="friend-card">
                <div className="friend-info">
                  <img
                    src={`https://i.pravatar.cc/150?u=${user._id}`}
                    alt={user.username}
                    className="friend-avatar"
                  />
                  <div>
                    <h4 className="friend-name">{user.username}</h4>
                    <p className="friend-email">{user.email}</p>
                  </div>
                </div>
                <button
                  className="addfriend-btn"
                  onClick={() => sendRequest(user._id)}
                >
                  Add Friend
                </button>
              </div>
            ))
          ) : (
            <p className="no-users">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
