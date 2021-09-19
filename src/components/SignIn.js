import firebase from "firebase"
import { Button } from "@material-ui/core"

const SignIn = () => {
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().useDeviceLanguage()

    try {
      await firebase.auth().signInWithPopup(provider)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <section className="welcome">
      <h1 className="welcome__title">Welcome to Chatty,</h1>
      <p>the newest chat app</p>
      <Button onClick={signInWithGoogle}>Sign In With Google</Button>
    </section>
  )
}

export default SignIn
