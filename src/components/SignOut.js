import React from "react"
import { Button } from "@material-ui/core"
import firebase from "firebase"

function SignOut() {
  const signOut = async () => {
    try {
      await firebase.auth().signOut()
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  )
}

export default SignOut
