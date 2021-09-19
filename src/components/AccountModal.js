import SignOut from "./SignOut"
import { auth } from "../services/firebase"

function AccountModal({ isModalOpen }) {
  const email = auth.currentUser.email
  return (
    <div
      className={
        isModalOpen ? "modalAccount modalAccount--open" : "modalAccount"
      }
    >
      <p className="modalAccount__email">{email}</p>
      <SignOut />
    </div>
  )
}

export default AccountModal
