import "./navbar.css";
// Removed AccountBox, Search, and People
import { Chat, PowerSettingsNew } from "@material-ui/icons";
import AuthService from "../../utils/auth"

export default function Navbar() {
  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <span className="logo">Chat App</span>
      </div>
      <div className="navbarCenter">
        {/* <div className="searchbar">
          <Search />
          <input placeholder="Search for Chatters" className="searchInput" />
        </div> */}
      </div>
      <div className="navbarRight">
        <div className="navbarIcons">
          <div className="navbarIconItem">
            <Chat />
            <a href="/" ><span className="navbarIconBadge">Chat</span></a>
          </div>
          {/* <div className="navbarIconItem">
            <People />
            <span className="navbarIconBadge">Friends</span>
          </div> */}
          <div className="navbarIconItem">
            <PowerSettingsNew />
            <span onClick={() => AuthService.logout()} className="navbarIconBadge">Logout</span>
          </div>
        </div>
        {/* <img src="" alt="" className="navbarImg" /> */}
      </div>
    </div>
  );
}
