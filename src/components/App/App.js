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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import api from '../../utils/Api';

function App() {
  const history = useHistory();

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [infoTooltipMessage, setInfoTooltipMessage] = React.useState('');
  const [infoTooltipStatus, setInfoTooltipStatus] = React.useState('');
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [currentPageType, setCurrentPageType] = React.useState('');

  const [currentUser, setCurrentUser] = React.useState({ userName: '', userDescription: '', userAvatar: '', userId: '' });

  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token).then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
          requestUserInfo();
          getCards();
          history.push('/');
        }
      })
    }
  };

  const getCards = () => {
    api.getInitialCards()
      .then((res) => {
        setCards(res.map(item => ({
          createdAt: item.createdAt,
          likes: item.likes,
          src: item.link,
          name: item.name,
          owner: item.owner,
          id: item._id
        })))
      })
  }


  const onRegister = (data) => {
    auth.register(data.password, data.email).then((res) => {
      if (!res) {
        showInfoTooltip('Oops, something went wrong! Please try again.', 'failure');
      } else {
        showInfoTooltip('Success! You have now been registered.', 'success');
      }
    })
      .catch(err => console.log(err));
  }

  const onLogin = (data) => {
    auth.authorize(data.password, data.email).then((res) => {
      if (!res) {
        showInfoTooltip('Oops, something went wrong! Please try again.', 'failure');
      }
      if (res.token) {
        setLoggedIn(true);
        history.push('/');
      }
    })
      .catch(err => console.log(err));
  }

  const onSignOut = () => {
    setEmail('');
    setLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/signin');
  }

  const requestUserInfo = () => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(currentUser => ({ ...currentUser, userName: res.name, userDescription: res.about, userAvatar: res.avatar, userId: res._id }))
      })
  }

  const showInfoTooltip = (message, status) => {
    setInfoTooltipMessage(message);
    setInfoTooltipStatus(status);
    setInfoTooltipOpen(true);
  }

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


  const handleAddPlace = (data) => {
    api.addCard({ name: data.title, link: data.url }).then(
      (res) => setCards(cards => [{
        createdAt: res.createdAt,
        likes: res.likes,
        src: res.link,
        name: res.name,
        owner: res.owner,
        id: res._id
      }, ...cards])
    )
  }

  const handleUpdateAvatar = (data) => {
    api.setUserAvatar({ avatar: data.url }).then(
      (res) => setCurrentUser(currentUser => ({ ...currentUser, userAvatar: res.avatar }))
    )
  }

  const handleUpdateProfile = (data) => {
    api.setUserInfo({ name: data.name, about: data.about }).then(
      (res) => setCurrentUser(currentUser => ({ ...currentUser, userName: res.name, userDescription: res.about }))
    )
  }

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={{ currentUser }}>
        <Header loggedIn={loggedIn} onSignOut={onSignOut} email={email} currentPageType={currentPageType} />
        <Switch>
          <ProtectedRoute exact path='/'
            loggedIn={loggedIn}
            onCardClick={onCardClick}
            handleAddPlaceClick={onAddPlace}
            handleEditAvatarClick={onEditAvatar}
            handleEditProfileClick={onEditProfile}
            cards={cards}
            component={Main} />
          <Route path='/signup'>
            <Register onRegister={onRegister} setCurrentPageType={setCurrentPageType} />
          </Route>
          <Route path='/signin'>
            <Login onLogin={onLogin} setCurrentPageType={setCurrentPageType} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to='/' /> : <Redirect to='/signin' />}
          </Route>
        </Switch>
        <Footer />

        <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} onPopupBackgroundClick={onPopupBackgroundClick} />

        <PopupWithForm name='confirm' title='Are you sure?' isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onPopupBackgroundClick={onPopupBackgroundClick} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onPopupBackgroundClick={onPopupBackgroundClick} handleAddPlace={handleAddPlace} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onPopupBackgroundClick={onPopupBackgroundClick} handleUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onPopupBackgroundClick={onPopupBackgroundClick} handleUpdateProfile={handleUpdateProfile} />

        <InfoTooltip message={infoTooltipMessage} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} onPopupBackgroundClick={onPopupBackgroundClick} iconStatus={infoTooltipStatus} ></InfoTooltip>
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;