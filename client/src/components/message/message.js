import "./message.css";

const Message = ({ own, messageAuthor, messageText }) => {
  console.log(own, "===own===");
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src="" alt="" />
        <p className="messageText">{messageText}</p>
      </div>
      <div className="messageBottom"></div>
    </div>
  );
};

export default Message;
