import React, { useState, useEffect } from "react"
import { database } from "../services/firebase"
import SendMessage from "./SendMessage"
import Rooms from "./Rooms"
import { ImPlus } from "react-icons/im"
import { AiOutlineClose } from "react-icons/ai"
import { GiHamburgerMenu } from "react-icons/gi"
import { Button } from "@material-ui/core"
import Account from "./Account"
import AddNewChannel from "./AddNewChannel"
import ShowMessages from "./ShowMessages"

function ChatRoom() {
  const [currentRoom, setCurrentRoom] = useState("General")
  const [submitted, setSubmitted] = useState(false)
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
      <AddNewChannel
        isChannelModalOpen={isChannelModalOpen}
        closeChannelModal={closeChannelModal}
        setSubmitted={setSubmitted}
        submitted={submitted}
      />
      <aside
        className={
          isMobileMenuOpen
            ? "wrapper__aside wrapper__aside-open"
            : "wrapper__aside"
        }
      >
        <div className="top">
          <p>Channels</p>
          <Button onClick={openChannelModal}>
            <ImPlus />
          </Button>
          <AiOutlineClose className="top__close" onClick={closeMobileMenu} />
        </div>
        <div className="wrapper__aside--content">
          <Rooms setCurrentRoom={setCurrentRoom} submitted={submitted} />
          <Account />
        </div>
      </aside>
      <main className="wrapper__main">
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
