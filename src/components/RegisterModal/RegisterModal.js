import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import "./RegisterModal.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as auth from "../../utils/auth";

const RegisterModal = ({ handleCloseModal, isOpen, handleRegister }) => {
  console.log("some string");
  const history = useHistory();
  const [name, setName] = useState("");

  //link is avatar url
  const [link, setUrl] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [email, setEmail] = useState("");

  // still determining if this "handleSubmit" code is the correct code
  //  or not for this or if this is the thing that needs to be passed to
  // "App.js" VVVVV

  //   const handleSubmit = () => {
  //     if (password === confirmPassword) {
  //       auth.register(name, link, email, password).then((res) => {
  //         if (res.jwt) {
  //           setName("");
  //           setUrl("");
  //           setEmail("");
  //           setPassword("");
  //           history.push("/profile");
  //         }
  //       });
  //       // TODO -- handle registration
  //       // this is where the once the button is pressed the information gets sent and the jwt gets put onto localstorage
  //     }
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({
      name: name,
      link: link,
      email: email,
      password: password,
    });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      onClose={handleCloseModal}
      buttonText="Next"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      alternateButtonText="or Log In"
    >
      <label className="modal__label">Email*</label>
      <input
        name="email"
        className="modal__input"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="modal__label">Password*</label>
      <input
        name="password"
        className="modal__input"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label className="modal__label">Name*</label>
      <input
        name="name"
        className="modal__input"
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="modal__label">Avatar URL*</label>
      <input
        name="link"
        className="modal__input"
        placeholder="Avatar URL"
        type="url"
        value={link}
        onChange={(e) => setUrl(e.target.value)}
      />
    </ModalWithForm>
  );
};

export default RegisterModal;
