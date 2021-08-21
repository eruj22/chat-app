import React from "react"
import firebase from "firebase"
import { auth } from "../services/firebase"
import { Button } from "@material-ui/core"

function SignIn() {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <section className="welcome">
      <h1>Welcome to Chatty,</h1>
      <p>the newest chat app</p>
      <Button onClick={signInWithGoogle}>Sign In With Google</Button>
    </section>
  )
}

export default SignIn
