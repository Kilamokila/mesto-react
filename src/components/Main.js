import React, { useState, useEffect } from 'react';
import { api } from '../utils/Api';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {

    const [userInfo, setUserData] = useState({
        "name": "Жак-Ив Кусто",
        "about": "Исследователь океана",
        "avatar": "https://poindexters.com/wp-content/uploads/2018/12/jacques-costeau-pic-e1547579876160.jpg",
        "_id": null,
        "cohort": null
    });
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getCardsData()
            .then(cardsData => setCards(cardsData))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        api.getUserData()
            .then(userData => setUserData(userData))
            .catch(err => console.log(err))
    }, [])

    return (
        <main className="content">
            <section className="profile">
                <a className="profile__image-link" onClick={onEditAvatar}>
                    <img src={userInfo.avatar} alt="Аватар" className="profile__avatar" />
                </a>
                <div className="profile__container">
                    <div className="profile__info">
                        <h1 className="profile__info-name">{userInfo.name}</h1>
                        <p className="profile__info-description">{userInfo.about}</p>
                        <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                    </div>
                    <button className="profile__card-add-button" type="button" onClick={onAddPlace}></button>
                </div>
            </section>
            <section className="elements">
                {cards.map((card) => <Card card={card} name={card.name} link={card.link} likes={card.likes.length} key={card._id} onCardClick={onCardClick} />)}
            </section>
        </main>
    )
}

export default Main 