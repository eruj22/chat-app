import { useState } from "react"
import { Button } from "@material-ui/core"
import { AiOutlineClose } from "react-icons/ai"
import { database } from "../services/firebase"
import firebase from "firebase"

function AddNewChannel({
  isChannelModalOpen,
  closeChannelModal,
  setSubmitted,
  submitted,
}) {
  const [channelName, setChannelName] = useState("")
  const [channelDescription, setChannelDescription] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!channelName) {
      return
    }

    await database.collection("channels").add({
      description: channelDescription,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      name: channelName,
    })

    setSubmitted(!submitted)
    closeChannelModal()
  }

  return (
    <div
      className={
        isChannelModalOpen
          ? "modal__channel modal__channel--open"
          : "modal__channel"
      }
    >
      <div className="modal-container">
        <Button className="close" onClick={closeChannelModal}>
          <AiOutlineClose />
        </Button>
        <h3>new channel</h3>
        <form className="form__channel" onSubmit={handleSubmit}>
          <div>
            <input
              placeholder="Channel name"
              onChange={(e) => setChannelName(e.target.value)}
            />
          </div>
          <div>
            <textarea
              placeholder="Channel description"
              rows={4}
              onChange={(e) => setChannelDescription(e.target.value)}
            />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </div>
    </div>
  )
}

export default AddNewChannel
