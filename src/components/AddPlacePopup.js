import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setCardName] = useState('');
  const [link, setCardImage] = useState('');

  function handleCangeCardName(e) {
    setCardName(e.target.value);
  }

  function handleCangeCardImage(e) {
    setCardImage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="popupCard"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Название места"
        name="name"
        id="name-place"
        minLength="2"
        maxLength="30"
        required
        className="popup__input popup__input_type_name-place"
        onChange={handleCangeCardName}
      />
      <span className="popup__input-error name-place-error" />
      <input
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        id="link-place"
        minLength="5"
        maxLength="100"
        required
        className="popup__input popup__input_type_link-place"
        onChange={handleCangeCardImage}
      />
      <span className="popup__input-error link-place-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;