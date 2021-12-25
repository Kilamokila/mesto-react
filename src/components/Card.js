import React from 'react';

function Card(props) {

    function handleCardClick() {
        props.onCardClick(props.card);
    }

    return (
        <article className="element-card">
            <div className="elements__card-image-container">
                <img
                    src={props.link}
                    alt={props.name}
                    className="elements__card-image"
                    onClick={handleCardClick} />
                <button className="elements__delete-button" type="button"></button>
            </div>
            <div className="elements__card-description">
                <h3 className="elements__place-name">{props.name}</h3>
                <div className="elements__like">
                    <button className="elements__like-button" type="button"></button>
                    <p className="elements__like-counter">{props.likes}</p>
                </div>
            </div>
        </article>
    )
}

export default Card