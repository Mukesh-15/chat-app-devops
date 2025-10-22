
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
              src={`https://imgs.search.brave.com/q-QoMPyZHgH3putURkfCdIQMa5Bg8luup8qs3GjbpQs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvdXNlci1wcm9m/aWxlLWljb24tY2ly/Y2xlXzEyNTYwNDgt/MTI0OTkuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MCZxPTgw`}
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
