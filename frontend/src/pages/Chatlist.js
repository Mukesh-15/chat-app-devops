
import "./ChatList.css";

const ChatList = ({ users, setCurrFrnd, setFrndName }) => {
  return (
    <div className="chatlist">
      <div className="chatlist-search">
        <input placeholder="Search..." />
      </div>
      <div className="chatlist-users">
        {users.map((user, idx) => (
          <div
            key={idx}
            className="chatlist-item"
            onClick={() => {
              setCurrFrnd(user.friendId);
              setFrndName(user.username);
            }}
          >
            <img
              src={`https://i.pravatar.cc/150?img=${idx + 10}`}
              alt="avatar"
            />
            <div className="chatlist-info">
              <div className="chatlist-top">
                <span className="username">{user.username}</span>
                <span className="time">{user.time}</span>
              </div>
              <div className="chatlist-msg">{user.message}</div>
            </div>
            {user.unread && <div className="chatlist-dot"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
