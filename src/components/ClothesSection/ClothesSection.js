import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ClothesSection = ({ items, onSelectCard, onCreateModal, onCardLike }) => {
  const userValue = React.useContext(CurrentUserContext);
  const userId = userValue.currentUser.id;
  // const cardOwner = items.owner;

  // console.log(userId);
  // console.log(items);
  // console.log("clothesection im here");

  // const filterOwnerCardsById = items.filter((item) => item.owner === userId);
  // console.log(filterOwnerCardsById);

  const filterOwnerCardsById = (items, ownerId) => {
    return items.filter((item) => item.owner === ownerId);
  };

  const filteredItems = filterOwnerCardsById(items, userId);

  // console.log(filteredItems);

  // console.log(items)

  return (
    <div className="clothes-section__main">
      <div className="clothes-section__container">
        <div className="clothes-section__title">Your items</div>
        <button className="clothes-section__button" onClick={onCreateModal}>
          + Add New
        </button>
      </div>
      <div className="clothes-section__cards">
        {filteredItems.map((item, index) => {
          return (
            <ItemCard
              key={index}
              item={item}
              onSelectCard={onSelectCard}
              onCardLike={onCardLike}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClothesSection;

/* -------------------------------------------------------------------------- */
/*                       old clothessection render code                       */
/* -------------------------------------------------------------------------- */

// const ClothesSection = ({ items, onSelectCard, onCreateModal }) => {
//   const userValue = React.useContext(CurrentUserContext);
//   const userId = userValue.userData.id;
//   // const cardOwner = items.owner0;

//   console.log(userId);
//   console.log(items);
//   console.log("clothesection im here");

//   // console.log(items)

//   return (
//     <div className="clothes-section__main">
//       <div className="clothes-section__container">
//         <div className="clothes-section__title">Your items</div>
//         <button className="clothes-section__button" onClick={onCreateModal}>
//           + Add New
//         </button>
//       </div>
//       <div className="clothes-section__cards">
//         {items.map((item, index) => {
//           return (
//             <ItemCard key={index} item={item} onSelectCard={onSelectCard} />
//           );
//         })}
//       </div>
//     </div>
//   );
// };
