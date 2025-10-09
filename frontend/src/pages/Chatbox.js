// ChatBox.js
import { useEffect, useState } from "react";
import "./ChatBox.css";

const ChatBox = ({ currFrnd, socket, frndName }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userId, setUserId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await fetch(
          `http://localhost:5500/users/messages/${currFrnd}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setChatHistory(data.messages);
        setUserId(data.yourId);

        const room = [data.yourId, currFrnd].sort().join("_");
        setRoomId(room);
        socket.emit("join-room", room);
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };

    if (currFrnd) fetchChatHistory();
  }, [currFrnd, socket]);

  useEffect(() => {
    const handleIncomingMsg = (data) => {
      setChatHistory((prev) => [...prev, data]);
    };
    if (roomId) socket.on("send-message", handleIncomingMsg);
    return () => socket.off("send-message", handleIncomingMsg);
  }, [roomId, socket]);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!msg.trim()) return;

    try {
      await fetch("http://localhost:5500/users/sendMsg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          to: currFrnd,
          content: msg,
        }),
      });
      setMsg("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <div>
          <h2>{frndName}</h2>
        </div>
        <div className="chatbox-icons">
          <ion-icon name="call-outline"></ion-icon>
          <ion-icon name="videocam-outline"></ion-icon>
          <ion-icon name="search-outline"></ion-icon>
          <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
        </div>
      </div>

      <div className="chatbox-messages">
        {chatHistory.map((chat, idx) =>
          chat.from === userId ? (
            <div key={idx} className="chat-outgoing">
              <div className="msg blue">{chat.content}</div>
              <span className="time">
                {new Date(chat.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ) : (
            <div key={idx} className="chat-incoming">
              <div className="msg white">{chat.content}</div>
              <span className="time">
                {new Date(chat.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          )
        )}
      </div>

      <form className="chatbox-input" onSubmit={handleClick}>
        <ion-icon name="happy-outline" class="emoji-icon" />
        <input
          placeholder="Your message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit">
          <ion-icon name="send" class="send-icon" />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
