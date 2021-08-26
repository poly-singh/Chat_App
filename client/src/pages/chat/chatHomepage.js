// import { Message } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
// import { useQuery } from "@apollo/client";

import Navbar from "../../components/navbar/Navbar";
import Message from "../../components/message/message";
import MessageForm from "../../components/messageForm/messageForm";
import Auth from "../../utils/auth";
import "./chatHomepage.css";

const ChatHomepage = ({ user }) => {
  const { username } = Auth.getProfile().data;
  console.log(username, "user here");
  const { data, loading, subscribeToMore } = useQuery(GET_MESSAGES);
  useEffect(() => {
    subscribeToMore({
      document: MESSAGE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.newMessage;
        const updatedMessageList = Object.assign({}, prev, {
          messages: [...prev.messages, newMessage],
        });
        return updatedMessageList;
      },
    });
  }, );
  // }, []);

  if (!loading) {
    var messageMap = data.messages.map((message) => {
      const own = message.messageAuthor === username ? true : false;
      return (
        <Message
          own={own}
          messageAuthor={message.messageAuthor}
          messageText={message.messageText}
        />
        // <div className={`message ${MessageType}`}>
        //   {MessageType === "message-incomming" ? (
        //     <p className="name">{message.messageAuthor}</p>
        //   ) : null}
        //   <p>{message.messageText}</p>
        // </div>
      );
    });
  }

  return (
    <main>
      <Navbar />
      <div className="chatApp">
        <div className="chatMenu">
          <div className="chatMenuWrapper"></div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">{messageMap}</div>
            {/* <div className="chatBoxBottom"> */}
            {/* Message submission form */}
            <MessageForm />
            {/* <textarea
              className="chatMessageInput"
              placeholder="commence the chattering..."
            ></textarea>
            <button className="chatSendButton">Send</button> */}

            {/* </div> */}
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

const GET_MESSAGES = gql`
  query {
    messages {
      messageText
      messageAuthor
    }
  }
`;
const MESSAGE_SUB = gql`
  subscription {
    newMessage {
      messageText
      messageAuthor
    }
  }
`;
