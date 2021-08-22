import React from "react"
import { auth } from "../services/firebase"
import { timeConverter } from "../helpers/functions"
// TODO: fix issue with displaying date when sending new message

function ShowMessages({ messages }) {
  const currentUserName = auth.currentUser.displayName
  const currentUserId = auth.currentUser.uid
  return (
    <div className="wrapper__main--messages">
      {messages.map((message, index) => {
        const { photoURL, text, uid, createdAt } = message
        // const messageTime = timeConverter(createdAt.seconds)

        return (
          <div
            key={index}
            className={`message ${
              uid === currentUserId ? "message--sent" : "message--received"
            }`}
          >
            <img className="message__img" src={photoURL} alt="" />
            <p className="message__user">{currentUserName}</p>
            {/* <small className="message__date">{messageTime}</small> */}
            <p className="message__text">{text}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ShowMessages
