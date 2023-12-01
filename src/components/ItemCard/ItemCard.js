import "./ItemCard.css";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemCard = ({ item, onSelectCard, onCardLike }) => {
  const userValue = React.useContext(CurrentUserContext);

  const isLiked = item.likes.some((userId) => {
    return userId === userValue.currentUser.id;
  });

  const handleLikeClick = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  //testing to see if this would work VVVV

  const itemCardLikeButtonClassName = `item-card__like-button ${
    isLiked ? "item-card__like-button_active" : "item-card__like-button"
  }`;

  const userId = userValue.currentUser.id;

  const itemCardLikeButtonHidden = `item-card__like-button ${
    !userId ? "item-card__like-button_hidden" : "item-card__like-button"
  }`;

  return (
    <div>
      <div className="item-card__container">
        <img
          className="item-card__image"
          src={item.imageUrl}
          alt={item.name}
          onClick={() => onSelectCard(item)}
        />
        <h3 className="item-card__name">{item.name}</h3>
        <button
          type="button"
          className={
            userId ? itemCardLikeButtonClassName : itemCardLikeButtonHidden
          }
          onClick={handleLikeClick}
        ></button>
      </div>
    </div>
  );
};

export default ItemCard;

/* -------------------------------------------------------------------------- */
/*                              old ItemCard code                             */
/* -------------------------------------------------------------------------- */

// const ItemCard = ({ item, onSelectCard }) => {
//   return (
//     <div>
//       <div>
//         <img
//           className="item-card__image"
//           src={item.imageUrl}
//           alt={item.name}
//           onClick={() => onSelectCard(item)}
//         />
//         <h3 className="item-card__name">{item.name}</h3>
//         <button type="button" className=".item-card__like-button"></button>
//       </div>
//     </div>
//   );
// };

/* -------------------------------------------------------------------------- */
/*                  latest itemcard code backup just in case                  */
/* -------------------------------------------------------------------------- */

// return (
//   <div>
//     <div className="item-card__container">
//       <img
//         className="item-card__image"
//         src={item.imageUrl}
//         alt={item.name}
//         onClick={() => onSelectCard(item)}
//       />
//       <h3 className="item-card__name">{item.name}</h3>
//       <button
//         type="button"
//         className={itemCardLikeButtonClassName}
//         onClick={handleLikeClick}
//       ></button>
//     </div>
//   </div>
// );
