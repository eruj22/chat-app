import React, { useState, useEffect } from "react"
import SendMessage from "./SendMessage"
import Rooms from "./Rooms"
import { ImPlus } from "react-icons/im"
import { AiOutlineClose } from "react-icons/ai"
import { GiHamburgerMenu } from "react-icons/gi"
import { Button } from "@material-ui/core"
import Account from "./Account"
import AddNewChannel from "./AddNewChannel"
import ShowMessages from "./ShowMessages"
import firebase from "firebase"

function ChatRoom() {
  const [currentRoom, setCurrentRoom] = useState("General")
  const [submitted, setSubmitted] = useState(false)
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const db = firebase.firestore()
  const query = db
    .collection("messages")
    .where("room", "==", currentRoom)
    .orderBy("createdAt")
    .limit(50)

  const openChannelModal = () => {
    setIsChannelModalOpen(true)
  }

  const closeChannelModal = () => {
    setIsChannelModalOpen(false)
  }

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const unsubscribe = query.onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data())
      setMessages(data)
    })

    return unsubscribe
    // eslint-disable-next-line
  }, [currentRoom])

  return (
    <div className="wrapper">
      <AddNewChannel
        isChannelModalOpen={isChannelModalOpen}
        closeChannelModal={closeChannelModal}
        setSubmitted={setSubmitted}
        submitted={submitted}
      />
      <aside className={isMobileMenuOpen ? "aside aside--open" : "aside"}>
        <div className="top">
          <p>Channels</p>
          <Button onClick={openChannelModal}>
            <ImPlus />
          </Button>
          <AiOutlineClose className="top__close" onClick={closeMobileMenu} />
        </div>
        <div className="aside__content">
          <Rooms setCurrentRoom={setCurrentRoom} submitted={submitted} />
          <Account />
        </div>
      </aside>
      <main className="main">
        <div className="top">
          <GiHamburgerMenu
            className="top__hamburger"
            onClick={openMobileMenu}
          />
          <span className="current-channel">{currentRoom}</span>
        </div>
        <ShowMessages messages={messages} />
        <SendMessage currentRoom={currentRoom} />
      </main>
    </div>
  )
}

export default ChatRoom
