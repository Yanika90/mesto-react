import React from 'react';

function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }
  return (
    <div className="photo">
      <button aria-label="Удалить" type="button" className="button photo__delete-button" />
      <img src={card.link} alt={card.name} className="photo__image" onClick={handleClick} />
      <div className="photo__info-elements">
        <h2 className="photo__title">{card.name}</h2>
        <div className="photo__like-elements">
          <button aria-label="Нравится" type="button" className="button photo__like-button" />
          <p className="photo__like-count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
