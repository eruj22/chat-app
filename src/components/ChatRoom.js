import React, { useState, useEffect } from "react"
import { auth, database } from "../services/firebase"
import SignOut from "./SignOut"
import SendMessage from "./SendMessage"

function ChatRoom({ currentRoom }) {
  const [messages, setMessages] = useState([])
  const currentUser = auth.currentUser.displayName

  useEffect(() => {
    database
      .collection("messages")
      .where("room", "==", currentRoom)
      .orderBy("createdAt")
      .limit(25)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()))
      })
  }, [])

  // console.log(messages)

  return (
    <div className="wrapper">
      <aside className="wrapper__aside">
        <div className="top">
          <span>all channels</span>
        </div>
      </aside>
      <main className="wrapper__main">
        <div className="top">
          <h2>{currentRoom}</h2>
        </div>
        <SignOut />
        <div className="wrapper__main--messages">
          {messages.map((message) => {
            const { id, photoURL, text, uid, createdAt } = message
            return (
              <div
                key={id}
                className={`message ${
                  uid === auth.currentUser
                    ? "message--sent"
                    : "message--received"
                }`}
              >
                <img className="message__img" src={photoURL} alt="" />
                <p className="message__user">{currentUser}</p>
                {/* <small className="message__date">{createdAt.seconds}</small> */}
                <p className="message__text">{text}</p>
              </div>
            )
          })}
        </div>
        <SendMessage currentRoom={currentRoom} />
      </main>
    </div>
  )
}

export default ChatRoom
