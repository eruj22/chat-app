import React, { useState } from "react"
import ChatRoom from "./components/ChatRoom"
import SignIn from "./components/SignIn"
import { auth } from "./services/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import "./style/main.scss"

function App() {
  const [currentRoom, setCurrentRoom] = useState("General")
  const [user] = useAuthState(auth)

  // add user.displayName
  return <>{user ? <ChatRoom currentRoom={currentRoom} /> : <SignIn />}</>
}

export default App
