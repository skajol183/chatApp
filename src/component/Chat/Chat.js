import React, { useEffect, useState, useRef } from "react";
import socketIo from "socket.io-client";
import "./Chat.css";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";
import sendLogo from "../../images/send.png";
import { candidate } from "../Join/Join";

let socket;
// const ENDPOINT = "http://localhost:5000/";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const chatBoxRef = useRef(null);

  // append function which will append event info to the container
  const appendMessage = (message, position) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: message, position: position },
    ]);
  };

  // handle submit btn when user type something
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = messageInput.trim();
    if (message !== "") {
      appendMessage(`You: ${message}`, "right");
      socket.emit("send", message);
      setMessageInput("");
    }
  };

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>SK CHAT</h2>
          <a href="/">
            <img src={closeIcon} alt="Close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox" ref={chatBoxRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.position}`}>
              {msg.content}
            </div>
          ))}
        </ReactScrollToBottom>

        <form
          className="inputBox"
          action="#"
          id="formContainer"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={messageInput}
            className="chatInput"
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button type="submit" className="sendBtn">
            <img src={sendLogo} alt="Send" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
