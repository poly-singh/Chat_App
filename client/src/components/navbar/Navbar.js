import "./navbar.css";
// Removed AccountBox, Search, and People
import { Chat, PowerSettingsNew } from "@material-ui/icons";
import AuthService from "../../utils/auth";

export default function Navbar() {
  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <span className="logo">Chatter Box</span>
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
            <a href="/">
              <span className="navbarIconBadge">
                <Chat />
                <span className="navWords">Chat</span>
              </span>
            </a>
          </div>
          {/* <div className="navbarIconItem">
            <People />
            <span className="navbarIconBadge">Friends</span>
          </div> */}
          <div className="navbarIconItem">
            <span
              onClick={() => AuthService.logout()}
              className="navbarIconBadge"
            >
              <PowerSettingsNew />
              <span className="navWords">Logout</span>
            </span>
          </div>
        </div>
        {/* <img src="" alt="" className="navbarImg" /> */}
      </div>
    </div>
  );
}
