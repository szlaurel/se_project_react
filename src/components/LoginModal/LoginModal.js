import React from "react";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./LoginModal.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import * as auth from "../../utils/auth";

const LoginModal = ({
  handleCloseModal,
  isOpen,
  handleLogin,
  onLoggedInUser,
}) => {
  const history = useHistory();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoggedInUser().then((data) => {
      if (data.jwt) {
        setEmail("");
        setPassword("");
        history.push("/profile");
      }
    });

    // if (!email || !password) {
    //     return;
    //   }
    //   auth.authorize(email, password).then((data) => {
    //     if (data.jwt) {
    //       setEmail("");
    //       setPassword("");
    //       handleLogin();
    //       history.push("/profile");
    //     }
    //   });
    //the code that goes here is when the button is pushed, the user gets logged in and gets redirected to the mainpage
  };

  return (
    <ModalWithForm
      title="Log In"
      onClose={handleCloseModal}
      buttonText="Log In"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      alternateButtonText="or Register"
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
    </ModalWithForm>
  );
};

export default LoginModal;
