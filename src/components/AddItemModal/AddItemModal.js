import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");

  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link });
  };

  return (
    <ModalWithForm
      title="New Garment"
      onClose={handleCloseModal}
      buttonText="Add garment"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">Name</label>
      <input
        name="name"
        type="text"
        minLength="1"
        maxLength="30"
        placeholder="Name"
        className="modal__input"
        value={name}
        onChange={handleNameChange}
      />
      {/* <span className="modal__span">Please enter a Name</span> */}
      <label className="modal__label">Image</label>
      <input
        name="link"
        type="url"
        minLength="1"
        // maxLength="30"
        placeholder="Image URL"
        className="modal__input"
        value={link}
        onChange={handleUrlChange}
      />
      {/* <span className="modal__span">Please enter a valid URL</span> */}
      <p>Select the weather type:</p>
      <div>
        <div>
          <input type="radio" id="hot" name="weather-type" value="hot" />
          <label> Hot</label>
        </div>
        <div>
          <input type="radio" id="warm" name="weather-type" value="warm" />
          <label> Warm</label>
        </div>
        <div>
          <input type="radio" id="cold" name="weather-type" value="cold" />
          <label> Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
