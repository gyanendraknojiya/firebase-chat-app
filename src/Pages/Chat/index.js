import React, { useState, useEffect } from "react";
import firebase from "firebase";

const Chat = () => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const user = firebase.auth().currentUser;
  const messageRef = firebase.firestore().collection("messages");

  const handleMessageInput = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (userMessage) {
      messageRef
        .add({
          sender: user.uid,
          senderName: user.displayName,
          message: userMessage,
          createdAt: Date.now(),
        })
        .then(() => {
          setUserMessage("");
        })
        .catch((e) => {
          console.log(e);
          alert(e);
        });
    }
  };

  const handleLogout=()=>{
    firebase.auth().signOut();
  }

  const scroll_to = (div)=>{
    if (div.scrollTop < div.scrollHeight - div.clientHeight)
         div.scrollTop += div.scrollHeight; 
 
 }
  useEffect(() => {
    const getAllMessages = messageRef.orderBy("createdAt").onSnapshot((doc) => {
      let tempMessages = [];
      doc.docChanges().forEach((change) => {
        if (change.type === "added") {
          tempMessages.push(change.doc.data());
        }
      });
      setMessages((prevState) => [...prevState, ...tempMessages]);

        const messageContainer =document.querySelector("#messages")
        scroll_to(messageContainer)
  
    });
    return () => getAllMessages();
  }, []);

  return (
    <div className="d-flex vh-100 vw-100 justify-content-center align-items-center">
      <div
        style={{ maxWidth: 600, width: "90%", height: "90vh" }}
        className="rounded shadow p-2 text-white bg-dark"
      >
       <div style={{height:150}} >
       <div className="d-flex">
          <span className="ms-auto btn btn-danger btn-sm" onClick={handleLogout} >Logout</span>
        </div>
        <div className="text-center">
          <h1>Chat</h1>
          <p>
            Welcome <span className="text-warning">{user.displayName}</span> !
          </p>
        </div>
       </div>
        <div
        id="messages"
          className="bg-white rounded "
          style={{ height: "calc(100% - 200px)", overflowY: "auto" }}
        >
          {messages.length ? (
            messages.map((message, i) => (
              <div className="d-flex" key={i}>
                <div
                  className={`m-2 p-2 rounded w-75 ${
                    message.sender === user.uid ? "ms-auto text-dark": "bg-dark text-white"
                  }`}
                  style={{ background: "#E8F6EF" }}
                >
                  <div style={{ fontSize: 11 }}>
                    <span className="text-muted">{message.senderName}</span>
                    <span className="float-end text-muted">
                      {new Date(message.createdAt).toUTCString()}
                    </span>
                  </div>
                  {message.message}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center pt-5">No message found!</div>
          )}
        </div>
        <div>
          <form className="d-flex" onSubmit={handleSendMessage}>
            <input
              className="form-control mt-1 bg-light"
              placeholder="Enter a message"
              onChange={handleMessageInput}
              value={userMessage}
            />
            <div>
              <button type="submit" className=" btn btn-primary mt-1 ms-1">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
