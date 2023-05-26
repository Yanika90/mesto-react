//import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState } from 'react';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopup() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main
          onEditProfile={setIsEditProfilePopupOpen}
          onAddPlace={setIsAddPlacePopupOpen}
          onEditAvatar={setIsEditAvatarPopupOpen}
          onCardClick={handleCardClick}
        />
        <Footer />

        {/* Поп-ап редактирования профиля */}
        <PopupWithForm
          title="Редактировать профиль"
          name="popupProfile"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
        >
          <input
            type="text"
            placeholder="Имя"
            name="userNameInput"
            id="name"
            minLength="2"
            maxLength="40"
            required
            className="popup__input popup__input_type_name"
          />
          <span className="popup__input-error name-error" />
          <input
            type="text"
            placeholder="О себе"
            name="userAboutYourselfInput"
            id="about-yourself"
            minLength="2"
            maxLength="200"
            required
            className="popup__input popup__input_type_about-yourself"
          />
          <span className="popup__input-error about-yourself-error" />
        </PopupWithForm>

        {/* Поп-ап добавления карточки */}
        <PopupWithForm
          title="Новое место"
          name="popupCard"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
        >
          <input
            type="text"
            placeholder="Название места"
            name="placeNameInput"
            id="name-place"
            minLength="2"
            maxLength="30"
            required
            className="popup__input popup__input_type_name-place"
          />
          <span className="popup__input-error name-place-error" />
          <input
            type="url"
            placeholder="Ссылка на картинку"
            name="placeLinkInput"
            id="link-place"
            minLength="5"
            maxLength="100"
            required
            className="popup__input popup__input_type_link-place"
          />
          <span className="popup__input-error link-place-error" />
        </PopupWithForm>

        {/* Просмотр карточки */}
        <ImagePopup onClose={closeAllPopup} card={selectedCard} name="card"></ImagePopup>

        {/* Поп-ап удаления карточки */}
        <PopupWithForm
          title="Вы уверены?"
          name="popupDeleteCard"
          buttonText="Да"
          // isOpen={}
          onClose={closeAllPopup}
        ></PopupWithForm>

        {/* Поп-ап редактирования аватарки */}
        <PopupWithForm
          title="Обновить аватар"
          name="popupAvatar"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
        >
          <input
            type="url"
            placeholder="Ссылка на картинку"
            name="avatarLinkInput"
            id="link-avatar"
            minLength="5"
            maxLength="100"
            required
            className="popup__input popup__input_type_link-avatar"
          />
          <span className="popup__input-error link-avatar-error" />
        </PopupWithForm>
      </div>
    </div>
  );
}

export default App;
