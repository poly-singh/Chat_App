import "./navbar.css";
// Removed Search, and People
import { AccountBox, Chat } from "@material-ui/icons";

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
            <span className="navbarIconBadge">Chat</span>
          </div>
          {/* <div className="navbarIconItem">
            <People />
            <span className="navbarIconBadge">Friends</span>
          </div> */}
          <div className="navbarIconItem">
            <AccountBox />
            <span className="navbarIconBadge">Profile</span>
          </div>
        </div>
        {/* <img src="" alt="" className="navbarImg" /> */}
      </div>
    </div>
  );
}
