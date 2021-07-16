import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import * as auth from '../../auth';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Login from '../Login/Login';
import Register from '../Register/Register';

function App() {
  const history = useHistory();

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(true);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserData({ _id: res._id, email: res.email });
          history.push('/');
        }
      })
    }
  };

  const onAddPlace = () => {
    addPopupKeyListener();
    setAddPlacePopupOpen(true);
  }

  const onCardClick = (card) => {
    addPopupKeyListener();
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  const onEditAvatar = () => {
    addPopupKeyListener();
    setEditAvatarPopupOpen(true);
  }

  const onEditProfile = () => {
    addPopupKeyListener();
    setEditProfilePopupOpen(true);
  }

  const closeAllPopups = () => {
    document.removeEventListener('keydown', onPopupKeyPress, false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({});
  }

  const onPopupBackgroundClick = (e) => {
    if (e.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  const onPopupKeyPress = (e) => {
    if (e.keyCode === 27) {
      closeAllPopups();
    }
  };

  const addPopupKeyListener = () => {
    document.addEventListener('keydown', onPopupKeyPress, false);
  }

  return (
    <div className='page'>
      <Header loggedIn={loggedIn} />
      <Switch>
        <ProtectedRoute exact path='/' loggedIn={true} component={Main}/>
        <Route path='/signup'><Register /></Route>
        <Route path='/signin'><Login /></Route>
        <Route>
          {loggedIn ? <Redirect to='/' /> : <Redirect to='/signin' />}
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;

  // const onAddPlace = () => {
  //   addPopupKeyListener();
  //   setAddPlacePopupOpen(true);
  // }

  // const onCardClick = (card) => {
  //   addPopupKeyListener();
  //   setSelectedCard(card);
  //   setImagePopupOpen(true);
  // }

  // const onEditAvatar = () => {
  //   addPopupKeyListener();
  //   setEditAvatarPopupOpen(true);
  // }

  // const onEditProfile = () => {
  //   addPopupKeyListener();
  //   setEditProfilePopupOpen(true);
  // }

  // const closeAllPopups = () => {
  //   document.removeEventListener('keydown', onPopupKeyPress, false);
  //   setEditAvatarPopupOpen(false);
  //   setEditProfilePopupOpen(false);
  //   setAddPlacePopupOpen(false);
  //   setImagePopupOpen(false);
  //   setConfirmPopupOpen(false);
  //   setInfoTooltipOpen(false);
  //   setSelectedCard({});
  // }

  // const onPopupBackgroundClick = (e) => {
  //   if (e.target.classList.contains('popup')) {
  //     closeAllPopups();
  //   }
  // }

  // const onPopupKeyPress = (e) => {
  //   if (e.keyCode === 27) {
  //     closeAllPopups();
  //   }
  // };

  // const addPopupKeyListener = () => {
  //   document.addEventListener('keydown', onPopupKeyPress, false);
  // }

//   return (
//     <div className='page'>
//       <Header />

//       <Main handleEditAvatarClick={onEditAvatar} handleEditProfileClick={onEditProfile} handleAddPlaceClick={onAddPlace} onCardClick={onCardClick} />

//       <Footer />

//       <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} onPopupBackgroundClick={onPopupBackgroundClick} />

//       <PopupWithForm name='profile' title='Edit profile' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onPopupBackgroundClick={onPopupBackgroundClick}>
//         <div className='popup__field'>
//           <input id='profile-name' type='text' name='name' className='popup__input popup__input_type_name' placeholder='Name' required minLength='2' maxLength='40' />
//           <span id='profile-name-error' className='popup__error'></span>
//         </div>

//         <div className='popup__field'>
//           <input id='profile-about' type='text' name='about' className='popup__input popup__input_type_about' placeholder='About me' required minLength='2' maxLength='200' />
//           <span id='profile-about-error' className='popup__error'></span>
//         </div>
//       </PopupWithForm>

//       <PopupWithForm name='confirm' title='Are you sure?' isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onPopupBackgroundClick={onPopupBackgroundClick} />

//       <PopupWithForm name='avatar' title='Change profile picture' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onPopupBackgroundClick={onPopupBackgroundClick} >
//         <div className='popup__field'>
//           <input id='avatar-url' type='url' name='url' className='popup__input popup__input_type_image-url' placeholder='Image Link' required />
//           <span id='avatar-url-error' className='popup__error'></span>
//         </div>
//       </PopupWithForm>

//       <PopupWithForm name='new-card' title='New Place' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onPopupBackgroundClick={onPopupBackgroundClick} >
//         <div className='popup__field'>
//           <input id='card-title' type='text' name='title' className='popup__input popup__input_type_title' placeholder='Title' required minLength='1' maxLength='30' />
//           <span id='card-title-error' className='popup__error'></span>
//         </div>

//         <div className='popup__field'>
//           <input id='card-url' type='url' name='url' className='popup__input popup__input_type_image-url' placeholder='Image Link' required />
//           <span id='card-url-error' className='popup__error'></span>
//         </div>
//       </PopupWithForm>

//       <InfoTooltip message='Success! You have now been registered.' isOpen={isInfoTooltipOpen} onClose={closeAllPopups} onPopupBackgroundClick={onPopupBackgroundClick} iconStatus='success' ></InfoTooltip>

//     </div>

//   );
// }

