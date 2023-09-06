import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({ items, onSelectCard }) => {
  console.log(items);

  return (
    <div className="clothes-section__main">
      <div className="clothes-section__container">
        <div className="clothes-section__title">Your items</div>
        <button className="clothes-section__button">+ Add New</button>
      </div>
      <div className="clothes-section__cards">
        {items.map((item, card) => {
          return (
            <ItemCard key={card._id} item={item} onSelectCard={onSelectCard} />
          );
        })}
      </div>
    </div>
  );
};

export default ClothesSection;
