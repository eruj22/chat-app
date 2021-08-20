import React from "react"
import SignOut from "./SignOut"

function AccountModal({ isModalOpen }) {
  return (
    <div
      className={
        isModalOpen ? "modal__account modal__account--open" : "modal__account"
      }
    >
      <p>my profile</p>
      <SignOut />
    </div>
  )
}

export default AccountModal
