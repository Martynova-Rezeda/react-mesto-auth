import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onDeletePopupClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__button-like ${
    isLiked && 'element__button-like_active'
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeletePopupClickOpen() {
    onDeletePopupClick(card);
  }

  return (
    <div className="element">
      {isOwn && (
        <button
          type="button"
          aria-label="Корзина"
          className="element__button-delete"
          onClick={handleDeletePopupClickOpen}
        />
      )}
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleCardClick}
      />
      <div className="element__wrapper">
        <h3 className="element__title">{card.name}</h3>
        <div className="element__like-wrapper">
          <button
            type="button"
            aria-label="Лайк"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}
export default Card;
