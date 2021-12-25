import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setCardSelected] = useState({ name: "", link: "" });

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
    setCardSelected(cardData)
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setImagePopupOpen(false)
    setCardSelected({ name: "", link: "" });
  }

  return (
    <body className="body">
      <div className="page">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick} />
        <PopupWithForm id="avatar-popup" title="Обновить аватар" formId="editAvatarForm" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <fieldset className="popup__form-settings">
            <input
              name="avatar"
              id="avatar-input"
              type="url"
              className="popup__input popup__input_type_link"
              placeholder="Ссылка на аватар"
              required />
            <span className="avatar-input-error"></span>
            <button
              id="save-avatar__button"
              className="popup__button"
              type="submit"
            >
              Сохранить
            </button>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm id="profile-popup" title="Редактировать профиль" formId="editProfileForm" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <fieldset className="popup__form-settings">
            <input
              name="name"
              id="name-input"
              type="text"
              className="popup__input popup__input_type_name"
              required
              minlength="2"
              maxlength="40" />
            <span className="name-input-error"></span>
            <input
              name="about"
              id="description-input"
              type="text"
              className="popup__input popup__input_type_description"
              required
              minlength="2"
              maxlength="200" />
            <span className="description-input-error"></span>
            <button className="popup__button" type="submit">Сохранить</button>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm id="edit-card-popup" title="Новое место" formId="addCardForm" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <fieldset className="popup__form-settings">
            <input
              name="name"
              id="place-input"
              type="text"
              className="popup__input popup__input_type_place"
              placeholder="Название"
              required
              minlength="2"
              maxlength="30" />
            <span className="place-input-error"></span>
            <input
              name="link"
              id="link-input"
              type="url"
              className="popup__input popup__input_type_link"
              placeholder="Ссылка на картинку"
              required />
            <span className="link-input-error"></span>
            <button
              id="create-card__button"
              className="popup__button"
              type="submit"
            >
              Создать
            </button>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm id="submit-popup" title="Вы уверены?" formId="submitForm">
          <button className="popup__button" type="submit">Да</button>
        </PopupWithForm>
        <ImagePopup currentCard={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
        <Footer />
      </div>
    </body>
  );
}

export default App;
