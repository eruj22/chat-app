import React from "react"
import { Button } from "@material-ui/core"
import { rooms } from "../helpers/functions"

function Rooms({ setCurrentRoom, currentRoom }) {
  const changeRoom = (e) => {
    const clickedRoom = e.target.innerText
    setCurrentRoom(clickedRoom)
  }
  return (
    <div className="rooms">
      {rooms.map((room, index) => {
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
