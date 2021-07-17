import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({card, onCardClick }) {

    const value = React.useContext(CurrentUserContext);

    function handleCardClick() {
        onCardClick(card);
    }

    return (
        <li className='element'>
            <img src={card.src} className='element__image' alt={card.name} onClick={handleCardClick} />
            <div className='element__text-row'>
                {card.owner._id === value.currentUser.userId && <button aria-label='delete' name='delete' className='element__delete-button' type='button'></button>}
                <h2 className='element__text'>{card.name}</h2>
                <div className='element__like-container'>
                    <button aria-label='like' name='like' className={'element__like-button' + (card.likes.some((e) => e._id === value.currentUser.userId) ? ' element__like-button_active' : '')} type='button'></button>
                    <p className='element__like-count'>{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;