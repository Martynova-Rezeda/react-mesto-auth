import { useEffect, useState } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
import ProtectedRoute from './ProtectedRoute';
import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
//import { register } from '../utils/auth';
console.log(Register);

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopup, setImagePopup] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //const [loggedIn, setLoggedIn] = useState(false);
  useEffect((obj) => {
    api
      .getInitialCards(obj)
      .then((obj) => {
        setCards(obj);
      })
      .catch((err) => {
        console.log(`Error:${err}`);
      });
  }, []);

  useEffect((data) => {
    api
      .getUserProfile(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Error:${err}`);
      });
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setImagePopup(true);
    setSelectedCard(card);
  };

  const handleDeletePopupClick = (card) => {
    setDeletePopupOpen(true);
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setDeletePopupOpen(false);
    setImagePopup(false);
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Error:${err}`);
      });
  }

  const handleCardDelete = (cardId) => {
    setIsLoading(true);
    api
      .deleteCard(cardId)

      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error:${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api
      .updateUserProfile(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error:${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .updateUserAvatar(data)
      .then((obj) => {
        setCurrentUser(obj);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error:${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(obj) {
    setIsLoading(true);
    api
      .addNewCard(obj)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error:${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  //const handleRegistationSubmit=(username, password)=>{

  // }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onDeletePopupClick={handleDeletePopupClick}
              />
            }
          />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/" element={<Footer />} />
          <Route path="/" element={<Header />} />
        </Routes>

        <EditProfilePopup
          onClose={closeAllPopups}
          onLoading={isLoading}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />
        <DeletePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isDeletePopupOpen}
          onSubmit={handleCardDelete}
          onLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
