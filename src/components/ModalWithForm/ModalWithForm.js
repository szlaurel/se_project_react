import "./ModalWithForm.css";
import React from "react";
const ModalWithForm = ({ children, buttonText, title, onClose, name }) => {
  console.log("modalwithform");
  return (
    <div className={`modal modal_type${name}`}>
      <div className="modal__container">
        <button
          type="button"
          onClick={onClose}
          className="modal__close"
          id="close-garment-modal"
        ></button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form">{children}</form>
        <button type="submit" className="modal__button" disabled>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ModalWithForm;
