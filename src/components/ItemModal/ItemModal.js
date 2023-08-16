export const ItemModal = ({ selectedCard, onClose }) => {
  console.log(ItemModal);

  return (
    <div className={`modal`}>
      <div className="modal__container">
        <button type="button" onClick={onClose}>
          Close
        </button>
        <img src={selectedCard.link} />
        <div>{selectedCard.name}</div>
        <div>Weather type: {selectedCard.weather}</div>
      </div>
    </div>
  );
};

export default ItemModal;
