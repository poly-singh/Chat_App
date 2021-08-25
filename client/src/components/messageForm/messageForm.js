import "./messageForm.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_MESSAGE } from "../../utils/mutations";
import Auth from "../../utils/auth";

const MessageForm = () => {
  const [messageText, setMessageText] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [addMessage, { error }] = useMutation(ADD_MESSAGE, {
    update(cache, { data: { addMessage } }) {
      //   try {
      // const { message } = cache.readQuery({ query: QUERY_THOUGHTS });
      // cache.writeQuery({
      //   query: QUERY_THOUGHTS,
      //   data: { thoughts: [addThought, ...thoughts] },
      // });
      //   } catch (e) {
      //     console.error(e);
      //   }
      // update me object's cache
      //   const { me } = cache.readQuery({ query: QUERY_ME });
      //   cache.writeQuery({
      //     query: QUERY_ME,
      //     data: { me: { ...me, messages: [...me.messages, addMessage] } },
      //   });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addMessage({
        variables: {
          messageText,
          messageAuthor: Auth.getProfile().data.username,
        },
      });

      setMessageText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "messageText" && value.length <= 280) {
      setMessageText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      {/* {localStorage.getItem("id_token") ? ( */}
      {/* {Auth.getProfile().data ? ( */}
      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form className="formBox" onSubmit={handleFormSubmit}>
            <div className="chatBoxBottom">
              <textarea
                name="messageText"
                placeholder="commence the chattering..."
                value={messageText}
                className="chatMessageInput"
                // style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
              {/* </div> */}

              {/* <div className=""> */}
              <button className="chatSendButton" type="submit">
                Send
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to chat. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default MessageForm;
