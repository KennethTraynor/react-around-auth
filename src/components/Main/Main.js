import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Card from '../Card/Card';

function Main({ handleEditAvatarClick, handleEditProfileClick, handleAddPlaceClick, onCardClick, onCardLikeClick, onCardDeleteClick, cards }) {

  const value = React.useContext(CurrentUserContext);

  return (
    <main className='content'>

      <section className='profile'>
        <div className='profile__container'>
          <div className='profile__avatar-container'>
            <img className='profile__avatar' alt='profile' src={value.currentUser.userAvatar} />
            <button className='profile__avatar-edit-button' onClick={handleEditAvatarClick}>
              <div className='profile__avatar-edit-icon'></div>
            </button>
          </div>
          <div className='profile__info'>
            <div className='profile__edit-container'>
              <h1 className='profile__name'>{value.currentUser.userName}</h1>
              <button aria-label='edit-profile' name='edit-profile' className='profile__edit-button' type='button' onClick={handleEditProfileClick}></button>
            </div>

            <p className='profile__about'>{value.currentUser.userDescription}</p>

          </div>

          <button aria-label='add' name='add' className='profile__add-button' type='button' onClick={handleAddPlaceClick}></button>
        </div>
      </section>

      <section className='elements'>
        <ul className='elements__container'>
          {cards.map((card) => <Card key={card.id} card={card} onCardClick={onCardClick} onCardLikeClick={onCardLikeClick} onCardDeleteClick={onCardDeleteClick} /> )}
        </ul>

      </section>

    </main>
  )
}

export default Main;