import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Add Garment",
  title,
  onClose,
  name,
}) => {
  console.log("modalwithform");
  return (
    <div className={`modal modal_type${name}`}>
      <div className="modal__container">
        <button type="button" onClick={onClose}>
          Close
        </button>
        <h3>{title}</h3>
        <form>{children}</form>
        <button type="submit">{buttonText}</button>
      </div>
    </div>
  );
};

export default ModalWithForm;
