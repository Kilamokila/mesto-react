import React, { useState, useEffect } from 'react';
import { api } from '../utils/Api';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {

    const [userName, setUserName] = useState('Жак-Ив Кусто');
    const [userDescription, setUserDescription] = useState('Исследователь океана');
    const [userAvatar, setUserAvatar] = useState('https://poindexters.com/wp-content/uploads/2018/12/jacques-costeau-pic-e1547579876160.jpg');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getCardsData()
            .then(cardsData => setCards(cardsData))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <main className="content">
                <section className="profile">
                    <a className="profile__image-link" onClick={onEditAvatar}>
                        <img src={userAvatar} alt="Аватар" className="profile__avatar" />
                    </a>
                    <div className="profile__container">
                        <div className="profile__info">
                            <h1 className="profile__info-name">{userName}</h1>
                            <p className="profile__info-description">{userDescription}</p>
                            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                        </div>
                        <button className="profile__card-add-button" type="button" onClick={onAddPlace}></button>
                    </div>
                </section>
                <section className="elements">
                    {cards.map((card) => <Card card={card} name={card.name} link={card.link} likes={card.likes.length} key={card._id} onCardClick={onCardClick} />)}
                </section>
            </main>
        </>
    )
}

export default Main 