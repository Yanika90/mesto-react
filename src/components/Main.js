import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getPhotoCards()])
      .then(([userData, cardData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardData);
      })
      .catch(err => console.log(`Ошибка сервера: ${err}`));
  }, []);

  return (
    <div className="page">
      <main className="content">
        <section className="profile">
          <div
            onClick={() => {
              onEditAvatar(true);
            }}
            className="profile__avatar-edit"
          >
            <img src={userAvatar} alt="Аватар пользователя" className="profile__avatar" />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button
              onClick={() => {
                onEditProfile(true);
              }}
              aria-label="Редактировать профиль"
              type="button"
              className="button profile__edit-button"
            />
            <p className="profile__about-yourself">{userDescription}</p>
          </div>
          <button
            onClick={() => {
              onAddPlace(true);
            }}
            aria-label="Добавить"
            type="button"
            className="button profile__add-button"
          />
        </section>
        <section className="photos">
          {cards.map(card => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Main;
