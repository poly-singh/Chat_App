// import { Message } from "@material-ui/icons";
import React from "react";
// import { useQuery } from "@apollo/client";

import Navbar from "../../components/navbar/Navbar";
import Message from "../../components/message/message";
import "./chatHomepage.css";

const ChatHomepage = () => {
  return (
    <main>
      <Navbar />
      <div className="chatApp">
        <div className="chatMenu">
          <div className="chatMenuWrapper"></div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own={true} />
              <Message />
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="start chatting..."
              ></textarea>
              <button className="chatSendButton">Send</button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper"></div>
        </div>
      </div>
    </main>
  );
};

export default ChatHomepage;
