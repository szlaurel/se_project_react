import "./ItemCard.css";
import React from "react";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div>
      <div>
        <img
          className="item-card__image"
          src={item.imageUrl}
          alt={item.name}
          onClick={() => onSelectCard(item)}
        />
        <h3 className="item-card__name">{item.name}</h3>
      </div>
    </div>
  );
};

export default ItemCard;
