import "./ItemCard.css";

const ItemCard = ({ item }) => {
  return (
    <div>
      <div>
        <img className="item-card__image" src={item.link} alt="clothing" />
      </div>
      <div className="item-card__name">{item.name}</div>
    </div>
  );
};

export default ItemCard;
