import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleCangeAvatar(e) {
    const avatar = avatarRef.current.value;
    return avatar;
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="popupAvatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        placeholder="Ссылка на картинку"
        name="avatar"
        id="link-avatar"
        minLength="5"
        maxLength="100"
        required
        className="popup__input popup__input_type_link-avatar"
        ref={avatarRef}
        onChange={handleCangeAvatar}
      />
      <span className="popup__input-error link-avatar-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
