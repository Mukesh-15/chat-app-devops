import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ id, onChatClick }) => {
  return (
    <div className="sidebar">
      <div className="avatar">
        <img src={`https://i.pravatar.cc/150?u=${id}`} alt="avatar" />
      </div>
      <div className="sidebar-icons">
        <Link to="/"><ion-icon name="chatbubble-ellipses-outline" onClick={onChatClick}></ion-icon></Link>
        <Link to="/addFriends"><ion-icon name="person-add-outline"></ion-icon></Link>
        <ion-icon name="calendar-outline"></ion-icon>
        <ion-icon name="settings-outline"></ion-icon>
        <Link to="/login"><ion-icon name="log-out-outline"></ion-icon></Link>
      </div>
    </div>
  );
};

export default Sidebar;
