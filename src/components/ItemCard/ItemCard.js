import "./ItemCard.css";
import React from "react";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div>
      <div>
        <img
          className="item-card__image"
          src={item.link}
          alt="clothing"
          onClick={() => onSelectCard(item)}
        />
      </div>
      <div className="item-card__name">{item.name}</div>
    </div>
  );
};

export default ItemCard;
