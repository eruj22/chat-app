import { Button } from "@material-ui/core"
import { useState } from "react"
import { auth } from "../services/firebase"
import AccountModal from "./AccountModal"
import { BiDownArrow } from "react-icons/bi"

function Account() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { photoURL, displayName } = auth.currentUser

  const openModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <AccountModal isModalOpen={isModalOpen} />
      <div className="account">
        <Button onClick={openModal}>
          <img src={photoURL} alt="" />
          {displayName}
          <div
            className={
              isModalOpen
                ? "account__icon account__icon--open"
                : "account__icon"
            }
          >
            <BiDownArrow />
          </div>
        </Button>
      </div>
    </>
  )
}

export default Account
