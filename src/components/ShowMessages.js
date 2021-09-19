import React from "react"
import { auth } from "../services/firebase"
import { timeConverter } from "../helpers/functions"

function ShowMessages({ messages }) {
  const currentUserName = auth.currentUser.displayName
  const currentUserId = auth.currentUser.uid

  return (
    <div className="main__messages">
      {messages.map((message, index) => {
        const { photoURL, text, uid, createdAt } = message

        return (
          <div
            key={index}
            className={`message ${
              uid === currentUserId ? "message--sent" : "message--received"
            }`}
          >
            <img className="message__img" src={photoURL} alt="" />
            <p className="message__user">
              {currentUserName ? currentUserName : null}
            </p>
            <small className="message__date">
              {createdAt ? timeConverter(createdAt.seconds) : null}
            </small>
            <p className="message__text">{text}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ShowMessages
