import React from 'react';
import api from '../../utils/Api.js';
import Card from '../Card/Card';

function Main({ handleEditAvatarClick, handleEditProfileClick, handleAddPlaceClick, onCardClick }) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
        setUserId(res._id);
      })
      .then(() => api.getInitialCards())
      .then((res) => {
        setCards(res.map(item => ({
          createdAt: item.createdAt,
          likes: item.likes,
          src: item.link,
          name: item.name,
          owner: item.owner,
          id: item._id
        })));
      });
  }, []);

  return (
    <main className='content'>

      <section className='profile'>
        <div className='profile__container'>
          <div className='profile__avatar-container'>
            <img className='profile__avatar' alt='profile' src={userAvatar} />
            <button className='profile__avatar-edit-button' onClick={handleEditAvatarClick}>
              <div className='profile__avatar-edit-icon'></div>
            </button>
          </div>
          <div className='profile__info'>
            <div className='profile__edit-container'>
              <h1 className='profile__name'>{userName}</h1>
              <button aria-label='edit-profile' name='edit-profile' className='profile__edit-button' type='button' onClick={handleEditProfileClick}></button>
            </div>

            <p className='profile__about'>{userDescription}</p>

          </div>

          <button aria-label='add' name='add' className='profile__add-button' type='button' onClick={handleAddPlaceClick}></button>
        </div>
      </section>

      <section className='elements'>
        <ul className='elements__container'>
          {cards.map((card) => <Card key={card.id} card={card} onCardClick={onCardClick} userId={userId} /> )}
        </ul>

      </section>

    </main>
  )
}

export default Main;