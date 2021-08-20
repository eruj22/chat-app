import { Button } from "@material-ui/core"
import { useState } from "react"
import { auth, database } from "../services/firebase"
import AccountModal from "./AccountModal"

function Account() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { photoURL, displayName } = auth.currentUser

  const openModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <AccountModal isModalOpen={isModalOpen} />
      <Button onClick={openModal} className="account">
        <img src={photoURL} alt="" />
        {displayName}
      </Button>
    </>
  )
}

export default Account
