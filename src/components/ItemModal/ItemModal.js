import "./ItemModal.css";
import React from "react";

export const ItemModal = ({ selectedCard, onClose, onDelete }) => {
  console.log(ItemModal);

  return (
    <div className={`modal`}>
      <div className="modal__container item-modal__container">
        <button
          type="button"
          onClick={onClose}
          className="modal__close item-modal__close-button"
        ></button>
        <img
          className="item-modal__image"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        />
        <div className="item-modal__name">{selectedCard.name}</div>
        <div className="item-modal__weather-name">
          Weather type: {selectedCard.weather}
        </div>
        <button className="item-modal__delete-button" onClick={onDelete}>
          Delete item
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
