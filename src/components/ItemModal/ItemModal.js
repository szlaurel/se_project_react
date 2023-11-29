import "./ItemModal.css";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export const ItemModal = ({ selectedCard, onClose, onDelete }) => {
  const userValue = React.useContext(CurrentUserContext);
  const userId = userValue.currentUser.id;
  console.log("is this coming throguh in item modal?");
  console.log(userValue, "this is in the ItemModal");
  console.log(ItemModal);
  console.log("ItemModal");
  const cardOwner = selectedCard.owner;

  console.log(selectedCard.owner);
  console.log(userId);

  const isOwn = cardOwner === userId;

  console.log(isOwn);

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;

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
        <button className={itemDeleteButtonClassName} onClick={onDelete}>
          Delete item
        </button>
      </div>
    </div>
  );
};

export default ItemModal;

/* -------------------------------------------------------------------------- */
/*                             Old item Modal code                            */
/* -------------------------------------------------------------------------- */
{
  /* <div className={`modal`}>
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
</div> */
}
