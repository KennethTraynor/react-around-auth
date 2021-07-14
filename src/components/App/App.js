import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const onEditAvatar = () => {
    setEditAvatarPopupOpen(true);
  }

  const onEditProfile = () => {
    setEditProfilePopupOpen(true);
  }

  const onAddPlace = () => {
    setAddPlacePopupOpen(true);
  }

  const onCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className='page'>
      <Header />

      <Main handleEditAvatarClick={onEditAvatar} handleEditProfileClick={onEditProfile} handleAddPlaceClick={onAddPlace} onCardClick={onCardClick} />

      <Footer />

      <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} />

      <PopupWithForm name='profile' title='Edit profile' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <div className='popup__field'>
          <input id='profile-name' type='text' name='name' className='popup__input popup__input_type_name' placeholder='Name' required minLength='2' maxLength='40' />
          <span id='profile-name-error' className='popup__error'></span>
        </div>

        <div className='popup__field'>
          <input id='profile-about' type='text' name='about' className='popup__input popup__input_type_about' placeholder='About me' required minLength='2' maxLength='200' />
          <span id='profile-about-error' className='popup__error'></span>
        </div>
      </PopupWithForm>

      <PopupWithForm name='confirm' title='Are you sure?' isOpen={isConfirmPopupOpen} onClose={closeAllPopups} />

      <PopupWithForm name='avatar' title='Change profile picture' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <div className='popup__field'>
          <input id='avatar-url' type='url' name='url' className='popup__input popup__input_type_image-url' placeholder='Image Link' required />
          <span id='avatar-url-error' className='popup__error'></span>
        </div>
      </PopupWithForm>

      <PopupWithForm name='new-card' title='New Place' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <div className='popup__field'>
          <input id='card-title' type='text' name='title' className='popup__input popup__input_type_title' placeholder='Title' required minLength='1' maxLength='30' />
          <span id='card-title-error' className='popup__error'></span>
        </div>

        <div className='popup__field'>
          <input id='card-url' type='url' name='url' className='popup__input popup__input_type_image-url' placeholder='Image Link' required />
          <span id='card-url-error' className='popup__error'></span>
        </div>
      </PopupWithForm>

    </div>

  );
}

export default App;
