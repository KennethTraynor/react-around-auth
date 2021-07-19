import React, { useCallback, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ImagePopup from '../ImagePopup/ImagePopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import * as auth from '../../utils/auth';
import api from '../../utils/Api';

function App() {

  const history = useHistory();

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [infoTooltipMessage, setInfoTooltipMessage] = React.useState('');
  const [infoTooltipStatus, setInfoTooltipStatus] = React.useState('');

  const [currentPageType, setCurrentPageType] = React.useState('');

  const [email, setEmail] = React.useState('');
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
        .catch((err) => console.log(err));
    }
  };

  const getCards = () => {
    api.getInitialCards()
      .then((res) => setCards(res.map(item => (createCardElement(item)))))
      .catch((err) => console.log(err))
  }

  const onRegister = (data) => {
    auth.register(data.password, data.email).then((res) => {
      if (!res) {
        showInfoTooltip('Oops, something went wrong! Please try again.', 'failure');
      } else {
        showInfoTooltip('Success! You have now been registered.', 'success');
      }
    })
      .catch((err) => {
        console.log(err);
        showInfoTooltip('Oops, something went wrong! Please try again.', 'failure');
      });
  }

  const onLogin = (data) => {
    auth.authorize(data.password, data.email).then((res) => {
      if (!res) {
        showInfoTooltip('Oops, something went wrong! Please try again.', 'failure');
      } else if (res.token) {
        setLoggedIn(true);
        history.push('/');
      }
    })
      .catch((err) => {
        console.log(err)
        showInfoTooltip('Oops, something went wrong! Please try again.', 'failure');
      });
  }

  const onSignOut = () => {
    setLoggedIn(false);
    setEmail('');
    setCurrentUser({ userName: '', userDescription: '', userAvatar: '', userId: '' });
    localStorage.removeItem('token');
    history.push('/signin');
  }

  const requestUserInfo = () => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(currentUser => ({ ...currentUser, userName: res.name, userDescription: res.about, userAvatar: res.avatar, userId: res._id }))
      })
      .catch((err) => console.log(err))
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

  const onPopupKeyPress = useCallback((e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }, []);

  const addPopupKeyListener = () => {
    document.addEventListener('keydown', onPopupKeyPress, false);
  }

  const createCardElement = (item) => {
    return {
      createdAt: item.createdAt,
      likes: item.likes,
      src: item.link,
      name: item.name,
      owner: item.owner,
      id: item._id
    }
  }

  const handleAddPlace = (data) => {
    api.addCard({ name: data.title, link: data.url })
      .then((res) => setCards(cards => [createCardElement(res), ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
  }

  const handleUpdateAvatar = (data) => {
    api.setUserAvatar({ avatar: data.url })
      .then((res) => setCurrentUser(currentUser => ({ ...currentUser, userAvatar: res.avatar })))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
  }

  const handleUpdateProfile = (data) => {
    api.setUserInfo({ name: data.name, about: data.about })
      .then((res) => setCurrentUser(currentUser => ({ ...currentUser, userName: res.name, userDescription: res.about })))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
  }

  const onCardLikeClick = (card) => {
    const liked = card.likes.some((e) => e._id === currentUser.userId);
    api.updateCardLike({ cardID: card.id, like: !liked })
      .then((res) => {
        const newCards = [...cards];
        const index = cards.indexOf(card);
        newCards[index] = createCardElement(res);
        setCards(newCards);
      })
      .catch((err) => console.log(err))
  }

  const onCardDeleteClick = (card) => {
    setSelectedCard(card);
    setConfirmPopupOpen(true);
  }

  const handleConfirmDelete = () => {
    api.deleteCard({ cardID: selectedCard.id })
      .then(() => setCards(cards.filter(c => c.id !== selectedCard.id)))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
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
            onCardLikeClick={onCardLikeClick}
            onCardDeleteClick={onCardDeleteClick}
            component={Main} />
          <Route path='/signup'><Register onRegister={onRegister} setCurrentPageType={setCurrentPageType} /></Route>
          <Route path='/signin'><Login onLogin={onLogin} setCurrentPageType={setCurrentPageType} /></Route>
          <Route>{loggedIn ? <Redirect to='/' /> : <Redirect to='/signin' />}</Route>
        </Switch>

        <Footer />

        {loggedIn && <>
          <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} onPopupBackgroundClick={onPopupBackgroundClick} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onPopupBackgroundClick={onPopupBackgroundClick} handleAddPlace={handleAddPlace} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onPopupBackgroundClick={onPopupBackgroundClick} handleUpdateAvatar={handleUpdateAvatar} />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onPopupBackgroundClick={onPopupBackgroundClick} handleUpdateProfile={handleUpdateProfile} />

          <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onPopupBackgroundClick={onPopupBackgroundClick} handleConfirm={handleConfirmDelete} />
        </>}

        <InfoTooltip message={infoTooltipMessage} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} onPopupBackgroundClick={onPopupBackgroundClick} iconStatus={infoTooltipStatus} ></InfoTooltip>
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;