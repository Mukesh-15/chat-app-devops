// ChatBox.js
import { useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import apiFetch from "../api";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const ChatBox = ({ currFrnd, frndName }) => {
  const { socket, setRoomId, getRoomId } = useContext(SocketContext);
  const [chatHistory, setChatHistory] = useState([]);
  const [userId, setUserId] = useState("");
  const [msg, setMsg] = useState("");

  const [callActive, setCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const divRef = useRef();

  const scrollToElement = () => {
    const { current } = divRef;
    if (current !== null) {
      current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await apiFetch(`users/messages/${currFrnd}`, {
          method: "GET",
        });
        const data = res;
        setChatHistory(data.messages);
        setUserId(data.yourId);

        const room = [data.yourId, currFrnd].sort().join("_");
        setRoomId(room);
        socket.emit("join-room", room);
        setTimeout(scrollToElement, 100);
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };

    if (currFrnd) fetchChatHistory();
  }, [currFrnd, socket]);

  useEffect(() => {
    const handleIncomingMsg = (data) => {
      setChatHistory((prev) => [...prev, data]);
      setTimeout(scrollToElement, 100); // auto scroll to last msg
    };

    if (getRoomId) socket.on("send-message", handleIncomingMsg);
    return () => socket.off("send-message", handleIncomingMsg);
  }, [getRoomId, socket]);

  useEffect(() => {
    let timer;
    if (callActive) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }

    return () => clearInterval(timer);
  }, [callActive]);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!msg.trim()) return;

    try {
      await fetch("http://localhost:5500/users/sendMsg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          to: currFrnd,
          content: msg,
        }),
      });
      setMsg("");
      setTimeout(scrollToElement, 100);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const callFrnd = () => {
    setCallActive(true);
  };

  const formatDuration = (secs) => {
    const minutes = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (secs % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <div>
          <h2>{frndName}</h2>
        </div>
        <div className="chatbox-icons">
          <ion-icon
            style={{ cursor: "pointer" }}
            name="call-outline"
            onClick={callFrnd}
          ></ion-icon>
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
        <div className="bottom-msg" ref={divRef}></div>
      </div>

      {callActive && (
        <div className="callbox-modal">
          <div className="callbox-container">
            <img
              src={`https://imgs.search.brave.com/q-QoMPyZHgH3putURkfCdIQMa5Bg8luup8qs3GjbpQs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvdXNlci1wcm9m/aWxlLWljb24tY2ly/Y2xlXzEyNTYwNDgt/MTI0OTkuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MCZxPTgw`}
              alt="Profile"
              className="callbox-avatar-large"
            />
            <h2 className="callbox-name-large">{frndName}</h2>
            <p className="callbox-status">Calling...</p>
            <p className="callbox-duration-large">
              {formatDuration(callDuration)}
            </p>

            <ion-icon
              name="call-outline"
              className="callbox-end-icon"
              onClick={() => setCallActive(false)}
              title="End Call"
            ></ion-icon>
          </div>
        </div>
      )}

      <form className="chatbox-input" onSubmit={handleClick}>
        <ion-icon name="happy-outline" class="emoji-icon" />
        <input
          name="msgbox"
          placeholder="Your message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" style={{ background: "transparent", border: 0 }}>
          <ion-icon name="send" class="send-icon" />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
