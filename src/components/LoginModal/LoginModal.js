import React, { useContext } from "react";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./LoginModal.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import * as auth from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useEffect } from "react";

const LoginModal = ({
  handleCloseModal,
  isOpen,
  handleLogin,
  // onLoggedInUser,
  alternateModalOpen,
}) => {
  // const history = useHistory();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [emailLabel, setEmailLabel] = useState("");
  const [passwordLabel, setPasswordLabel] = useState("");

  const history = useHistory();

  // const handleSubmit = (e) => {
  //   // debugger;
  //   e.preventDefault();
  //   if (!email || !password) {
  //     setEmailLabel("Incorrect Email");
  //   } else {
  //     handleLogin({ email: email, password: password });
  //     setEmail("");
  //     setPassword("");
  //     handleCloseModal();
  //     console.log("the info got sent and the handle submit works");
  //   }
  // };

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleSubmit = (e) => {
    // debugger;
    e.preventDefault();
    handleLogin({ email: email, password: password });
    console.log("the info got sent and the handle submit works");
  };

  return (
    <ModalWithForm
      title="Log In"
      onClose={handleCloseModal}
      buttonText="Log In"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      alternateButtonText="or Register"
      alternateModalOpen={alternateModalOpen}
      idForEachCloseButton={"login"}
    >
      <label className="modal__label" htmlFor="email">
        Email*
      </label>
      <input
        name="email"
        className="modal__input"
        placeholder="Email"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="modal__label" htmlFor="password">
        Password*
      </label>
      <input
        name="password"
        className="modal__input"
        placeholder="Password"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </ModalWithForm>
  );
};

export default LoginModal;
