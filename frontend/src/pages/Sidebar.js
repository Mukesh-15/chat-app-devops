import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ id, onChatClick }) => {
  return (
    <div className="sidebar">
      <div className="avatar">
        <img src={`https://imgs.search.brave.com/q-QoMPyZHgH3putURkfCdIQMa5Bg8luup8qs3GjbpQs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvdXNlci1wcm9m/aWxlLWljb24tY2ly/Y2xlXzEyNTYwNDgt/MTI0OTkuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MCZxPTgw`} alt="avatar" />
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
