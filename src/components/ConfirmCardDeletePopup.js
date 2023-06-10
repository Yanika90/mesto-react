import PopupWithForm from './PopupWithForm';

function ConfirmCardDeletePopup({ card, isOpen, onClose, onDeleteCard }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="popupDeleteCard"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmCardDeletePopup;
