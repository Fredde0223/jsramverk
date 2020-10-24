import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const ENDPOINT = "localhost:3000";
const chatSocket = io(ENDPOINT);

function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [temp, setTemp] = useState("");
  let dateObj = new Date();
  let timeStamp = dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds();

  useEffect(() => {
    chatSocket.on('message', function (message) {
      receivedMessage(message);
    });
  });

  function receivedMessage(message) {
    chatSocket.off('message');
    setAllMessages(oldMsgs => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const m = "[" + timeStamp + "] " + username + ": " + newMessage;
    const messageObject = {
      body: m
    };
    setNewMessage("");
    chatSocket.emit('send message', messageObject);
    chatSocket.off('message');
  }

  function handleChange(e) {
    chatSocket.off('message');
    setNewMessage(e.target.value);
  }

  function handleUsernameChange(e) {
    chatSocket.off('message');
    setTemp(e.target.value);
  }

  function submitUsername(e) {
    e.preventDefault();
    setUsername(temp);
    const cm = "[" + timeStamp + "] " + "User '" + temp + "' has connected to the chat!";
    const connectedObject = {
      body: cm
    };
    chatSocket.emit('send message', connectedObject);
    chatSocket.off('message');
  }

  if (username != "") {
    return (
      <div>
        <h1>Chat</h1>
        <div className="chatWindow">
          {allMessages.map((message, index) => (
            <p className="txtMsg" key={index}>{message.body}</p>
          ))}
        </div>
        <form onSubmit={sendMessage}>
          <textarea value={newMessage} onChange={handleChange} placeholder="Message: "/>
          <input type="Submit" value="Send"></input>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Choose a username</h1>
        <form onSubmit={submitUsername}>
          <label>Username: <input onChange={handleUsernameChange} /></label>
          <input type="Submit" value="Enter"></input>
        </form>
      </div>
    );
  }
}

export default Chat;
