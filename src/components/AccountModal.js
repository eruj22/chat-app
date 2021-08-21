import SignOut from "./SignOut"
import { auth } from "../services/firebase"

function AccountModal({ isModalOpen }) {
  const email = auth.currentUser.email
  return (
    <div
      className={
        isModalOpen ? "modal__account modal__account--open" : "modal__account"
      }
    >
      <p>{email}</p>
      <SignOut />
    </div>
  )
}

export default AccountModal
