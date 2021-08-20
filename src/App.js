import React, { useState } from "react"
import ChatRoom from "./components/ChatRoom"
import SignIn from "./components/SignIn"
import { auth } from "./services/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import "./style/main.scss"

function App() {
  const [user] = useAuthState(auth)

  return <>{user ? <ChatRoom /> : <SignIn />}</>
}

export default App
