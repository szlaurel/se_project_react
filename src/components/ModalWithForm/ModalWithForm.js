import "./ModalWithForm.css";
import React from "react";

const ModalWithForm = ({
  children,
  buttonText,
  title,
  onClose,
  name,
  isOpen,
  onSubmit,
}) => {
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
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__button-submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
