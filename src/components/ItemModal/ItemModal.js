import "./ItemModal.css";

export const ItemModal = ({ selectedCard, onClose }) => {
  console.log(ItemModal);

  return (
    <div className={`modal`}>
      <div className="modal__container">
        <button
          type="button"
          onClick={onClose}
          className="modal__close"
        ></button>
        <img src={selectedCard.link} alt={selectedCard.name} />
        <div>{selectedCard.name}</div>
        <div>Weather type: {selectedCard.weather}</div>
      </div>
    </div>
  );
};

export default ItemModal;
