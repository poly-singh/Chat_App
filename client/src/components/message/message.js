import "./message.css";

const Message = ({ own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src="" alt="" />
        <p className="messageText">Hello. This is my message.</p>
      </div>
      <div className="messageBottom"></div>
    </div>
  );
};

export default Message;
