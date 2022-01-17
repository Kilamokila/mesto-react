import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: null, link: null });
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([]);


  useEffect(() => {
    api.getCardsData()
      .then(cardsData => setCards(cardsData))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    api.getUserData()
      .then(userData => setCurrentUser(userData))
      .catch(err => console.log(err))
  }, [])


  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleCardClick(cardData) {
    setImagePopupOpen(true);
    setSelectedCard(cardData)
  }

  function handleUpdateUser(newUserData) {
    api.patchUserData(newUserData)
      .then(newUserData => setCurrentUser(newUserData))
      .catch(err => console.log(err))
      .finally(closeAllPopups())
  }

  function handleUpdateAvatar(avatarUrl) {
    api.patchAvatar(avatarUrl)
      .then(avatarUrl => setCurrentUser(avatarUrl))
      .catch(err => console.log(err))
      .finally(closeAllPopups())
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(error => console.log(error))
  }

  function hadleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id))
      })
      .catch(error => console.log(error))
  }

  function handleAddPlaceSubmit(placeData) {
    api.postCard(placeData)
      .then((placeData) => {
        setCards([placeData, ...cards])
      })
      .catch(err => console.log(err))
      .finally(closeAllPopups())
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setImagePopupOpen(false)
    setSelectedCard({ name: null, link: null });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />
          <Main
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={hadleCardDelete}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onCardData={handleAddPlaceSubmit} />
          <PopupWithForm id="submit-popup" title="Вы уверены?" formId="submitForm">
            <button className="popup__button" type="submit">Да</button>
          </PopupWithForm>
          <ImagePopup currentCard={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
