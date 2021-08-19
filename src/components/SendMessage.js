import React, { useState } from "react"
import { Button, Input } from "@material-ui/core"
import firebase from "firebase"
import { database, auth } from "../services/firebase"
import { BiSend } from "react-icons/bi"

function SendMessage({ currentRoom }) {
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { uid, photoURL } = auth.currentUser

    await database.collection("messages").add({
      text: message,
      photoURL,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      room: currentRoom,
    })

    setMessage("")
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Input
        className="form__input"
        id="outlined-basic"
        variant="outlined"
        aria-label="empty textarea"
        placeholder="Message..."
        value={message}
        minRows={3}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit">
        <BiSend />
      </Button>
    </form>
  )
}

export default SendMessage
