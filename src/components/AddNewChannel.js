import { Button, Input, TextareaAutosize } from "@material-ui/core"
import { AiOutlineClose } from "react-icons/ai"

function AddNewChannel({ isChannelModalOpen, closeChannelModal }) {
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
        <form>
          <Input />
          <TextareaAutosize />
        </form>
      </div>
    </div>
  )
}

export default AddNewChannel
