import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./EditProfileModal.css";
import { useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ handleCloseModal, isOpen, handleEditUser }) => {
  /* -------------------------------------------------------------------------- */
  /*                          set states for input data                         */
  /* -------------------------------------------------------------------------- */

  const [name, setName] = useState("");
  const [link, setUrl] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                    handle submit for edit profile modal                    */
  /* -------------------------------------------------------------------------- */

  const userValue = React.useContext(CurrentUserContext);
  const username = userValue.currentUser.username;
  const avatar = userValue.currentUser.avatar;
  // console.log({ user: username, avatar: avatar });

  //   const reloadPage = setTimeout(() => {
  //     window.location.reload();
  //   }, 10);

  useEffect(() => {
    setName(username);
    setUrl(avatar);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditUser({ username: name, avatar: link });
    console.log({ username: name, avatar: link });
  };

  return (
    <ModalWithForm
      title="Change Profile Data"
      onClose={handleCloseModal}
      buttonText="Save Changes"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="name">
        Name *
      </label>
      <input
        name="name"
        className="modal__input"
        placeholder="Enter new Name Here"
        value={name}
        type="text"
        id="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label className="modal__label" htmlFor="avatar">
        Avatar
      </label>
      <input
        name="link"
        className="modal__input"
        placeholder="Enter new Avatar URL here"
        value={link}
        type="url"
        id="avatar"
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
    </ModalWithForm>
  );
};

export default EditProfileModal;
