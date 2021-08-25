import "./message.css";
import Auth from "../../utils/auth";

const Message = ({ own, messageAuthor, messageText }) => {
  console.log(own, "===own===");
  const { username } = Auth.getProfile().data;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {/* <img className="messageImg" src="" alt="" /> */}
        <div class="username">
          <p className="username">{messageAuthor}</p>
        </div>
        <p className="messageText">{messageText}</p>
        
      </div>
      <div className="messageBottom"></div>
    </div>
  );
};

export default Message;
