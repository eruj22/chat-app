import React, { useState, useEffect } from "react"
import { auth, database } from "../services/firebase"
import SendMessage from "./SendMessage"
import Rooms from "./Rooms"
import { ImPlus } from "react-icons/im"
import { Button } from "@material-ui/core"
import Account from "./Account"
import AddNewChannel from "./AddNewChannel"
import { timeConverter } from "../helpers/functions"

function ChatRoom() {
  const [currentRoom, setCurrentRoom] = useState("General")
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const currentUser = auth.currentUser.displayName

  const openChannelModal = () => {
    setIsChannelModalOpen(true)
  }

  const closeChannelModal = () => {
    setIsChannelModalOpen(false)
  }

  let unix_timestamp = 1549312445
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000)
  // Hours part from the timestamp
  var hours = date.getHours()
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes()
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds()

  // Will display time in 10:30:23 format
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2)

  console.log(formattedTime)

  useEffect(() => {
    database
      .collection("messages")
      .where("room", "==", currentRoom)
      .orderBy("createdAt")
      .limit(25)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()))
      })
  }, [currentRoom])

  return (
    <div className="wrapper">
      <aside className="wrapper__aside">
        <div className="top">
          <p>Channels</p>
          <Button onClick={openChannelModal}>
            <ImPlus />
          </Button>
          <AddNewChannel
            isChannelModalOpen={isChannelModalOpen}
            closeChannelModal={closeChannelModal}
          />
        </div>
        <div className="wrapper__aside--content">
          {/* <p className="current-channel">{currentRoom}</p> */}
          <Rooms setCurrentRoom={setCurrentRoom} currentRoom={currentRoom} />
          <Account />
        </div>
      </aside>
      <main className="wrapper__main">
        <div className="top">
          <span className="current-channel">{currentRoom}</span>
        </div>
        <div className="wrapper__main--messages">
          {messages.map((message) => {
            const { id, photoURL, text, uid, createdAt } = message
            const messageTime = timeConverter(createdAt.seconds)
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
                <small className="message__date">{messageTime}</small>
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
