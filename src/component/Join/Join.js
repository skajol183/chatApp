import React, { useState } from "react";
import "./Join.scss";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

let candidate;

const sendUser = () => {
  candidate = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};

const Join = () => {
  const [name, setName] = useState("");

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>SK CHAT</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your Name"
          type="text"
          id="joinInput"
        />
        <Link
          onClick={(event) => (!name ? event.preventDefault() : null)}
          to="/chat"
        >
          <button onClick={sendUser} className="joinbtn">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { candidate };
