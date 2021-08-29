import React, { useEffect, useState } from "react"
import { Button } from "@material-ui/core"
import { database } from "../services/firebase"

function Rooms({ setCurrentRoom, submitted }) {
  const [allRooms, setAllRooms] = useState([])
  const changeRoom = (e) => {
    const clickedRoom = e.target.innerText
    setCurrentRoom(clickedRoom)
  }

  useEffect(() => {
    setAllRooms([])
    database
      .collection("channels")
      .get()
      .then((blah) => {
        blah.forEach((doc) => {
          const ha = doc.data().name
          setAllRooms((allRooms) => [...allRooms, ha])
        })
      })
      .catch((error) => {
        console.log("Error getting documents: ", error)
      })
  }, [submitted])

  const arr = allRooms

  return (
    <div className="rooms">
      {arr.map((room, index) => {
        return (
          <Button key={index} onClick={changeRoom}>
            {room}
          </Button>
        )
      })}
    </div>
  )
}

export default Rooms
