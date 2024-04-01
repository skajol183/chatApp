import React, { useEffect, useState, useRef } from "react";
import socketIo from "socket.io-client";
import "./Chat.scss";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";
import { candidate } from "../Join/Join";

let socket;
const ENDPOINT = "https://chat-app-sever-gvi3b9byy-redcliffe.vercel.app/";

let checking; // for checking

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

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    // socket on when user connect the chat
    socket.on("connect", () => {
      alert(`${candidate} Connected`);
    });

    // socket on when new user join the chat to show others
    socket.emit("new-user-joined", candidate);

    // socket on for welcoming user
    socket.on("welcome", (name) => {
      appendMessage(`Admin: Welcome to the chat ${name}`, "left");
    });

    // socket on when new user join the chat to show others
    socket.on("user-joined", (name) => {
      appendMessage(`${name} joined the chat`, "left");
    });

    // socket on when user get messages from others
    socket.on("receive", (data) => {
      console.log(data, "sendData");
      appendMessage(`${data.name}: ${data.message}`, "left");
    });

    // socket on when any user left the chat to show others
    socket.on("left", (name) => {
      appendMessage(`${name} left the chat`, "left");
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

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
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
