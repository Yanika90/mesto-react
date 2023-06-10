import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmCardDeletePopup from './ConfirmCardDeletePopup';
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmCardDeletePopupOpen, setIsConfirmCardDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState({});

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getPhotoCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch(err => {
        console.log(`Ошибка сервера: ${err}`);
      });
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDeleteConfirm(card) {
    setDeletedCard(card);
    // setIsConfirmCardDeletePopupOpen(true);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => {
        console.log(`При постановке или удалении лайка возникла ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== card._id));
      })
      .catch(err => {
        console.log(`При удалении карточки возникла ошибка: ${err}`);
      });
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`При редактировании профиля возникла ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`При изменении аватара возникла ошибка: ${err}`);
      });
  }

  function handleCardAdd(data) {
    api
      .addCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`При добавлении карточки возникла ошибка: ${err}`);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmCardDeletePopupOpen(false);
    setSelectedCard({});
    setDeletedCard({});
  }

  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            cards={cards}
            onEditProfile={setIsEditProfilePopupOpen}
            onAddPlace={setIsAddPlacePopupOpen}
            onEditAvatar={setIsEditAvatarPopupOpen}
            onConfirmDelete={setIsConfirmCardDeletePopupOpen}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onDeleteClick={handleCardDeleteConfirm}
          />
          <Footer />

          {/* Поп-ап редактирования профиля */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          {/* Поп-ап добавления карточки */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleCardAdd}
          />

          {/* Просмотр карточки */}
          <ImagePopup onClose={closeAllPopups} card={selectedCard} name="card" />

          {/* Поп-ап удаления карточки */}
          <ConfirmCardDeletePopup
            card={deletedCard}
            isOpen={isConfirmCardDeletePopupOpen}
            onClose={closeAllPopups}
            onConfirm={handleCardDelete}
          />

          {/* Поп-ап редактирования аватарки */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
