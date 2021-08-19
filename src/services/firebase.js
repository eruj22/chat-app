import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCZ6dfdB6DnIOoVa9e_WflQ_Q9UUV7e4Ag",
  authDomain: "chatty-689e7.firebaseapp.com",
  databaseURL:
    "https://chatty-689e7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatty-689e7",
  storageBucket: "chatty-689e7.appspot.com",
  messagingSenderId: "722833537210",
  appId: "1:722833537210:web:5a942474c92d65499d6a83",
})

const database = firebaseApp.firestore()

const auth = firebase.auth()

export { database, auth }
