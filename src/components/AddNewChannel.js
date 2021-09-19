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
        isChannelModalOpen ? "modalChannel modalChannel--open" : "modalChannel"
      }
    >
      <div className="modalChannel__container">
        <Button className="close" onClick={closeChannelModal}>
          <AiOutlineClose />
        </Button>
        <h3 className="modalChannel__title">new channel</h3>
        <form className="formChannel" onSubmit={handleSubmit}>
          <div className="formChannel__child">
            <input
              className="formChannel__input"
              placeholder="Channel name"
              onChange={(e) => setChannelName(e.target.value)}
            />
          </div>
          <div className="formChannel__child">
            <textarea
              className="formChannel__textarea"
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
