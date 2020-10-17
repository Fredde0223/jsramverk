// import React from 'react';
//
// import io from 'socket.io-client';
//
// const newMessage = document.getElementById("new-message");
// const allMessages = document.getElementById("all-messages");
//
// const socket = io.connect('http://localhost:3000');
//
// socket.on('connect', function() {
//   console.info("Connected");
//   socket.on('chat message', function (message) {
//     let addedMessage = document.createElement("p");
//
//     addedMessage.textContent = message;
//
//     allMessages.appendChild(addedMessage);
//   });
//
//   newMessage.addEventListener("keyup", function (event) {
//     if (event.code === "Enter") {
//       socket.emit('chat message', event.target.value);
//       event.target.value = "";
//     }
//   });
// });
//
// socket.on('disconnect', function() {
//   console.info("Disconnected");
// });
//
// class Chat extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Websocket chatt</h1>
//
//         <h2>Messages:</h2>
//         <div id="all-messages" class="all-messages"></div>
//
//         <p><strong>Write new message:</strong></p>
//         <input id="new-message" class="new-message" value=""/>
//
//
//         <script type="text/javascript" src="../../dist/bundle.js"></script>
//       </div>
//     );
//   }
// };
//
// export default Chat;

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const ENDPOINT = "https://chat.frah19.me";
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

// import React, { useState, useEffect, useRef } from "react";
// import io from "socket.io-client";
//
// const Chat = () => {
//   const [allMessages, setAllMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//
//   const socketRef = useRef();
//
//   useEffect(() => {
//     socketRef.current = io.connect('/');
//
//     socketRef.current.on("newMessage", (message) => {
//         receivedMessage(message);
//     })
//   });
//
//   function receivedMessage(message) {
//     setAllMessages(oldMsgs => [...oldMsgs, message])
//   }
//
//   function sendMessage(e) {
//     e.preventDefault();
//     const messageObject = {
//       body: newMessage
//     };
//     setNewMessage("");
//     socketRef.current.emit("chat message", messageObject);
//   }
//
//   function handleChange(e) {
//       setNewMessage(e.target.value);
//   }
//
//   return (
//     <div>
//       <div>
//         {allMessages.map((message, index) => (
//           <p key={index}>{message.body}</p>
//         ))}
//       </div>
//       <form onSubmit={sendMessage}>
//         <textarea value={newMessage} onChange={handleChange} placeholder="Message: " className="area"/>
//         <input type="Submit" value="Send" className="registerButton"></input>
//       </form>
//     </div>
//   );
// }
//
// export default Chat;
