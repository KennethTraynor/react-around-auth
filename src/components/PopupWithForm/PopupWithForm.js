import React from "react";

function PopupWithForm({ name, title, isOpen, onClose, children }) {

    function handleBackgroundClick(e) {
        if (e.target.classList.contains('popup')) {
            onClose();
        }
    }

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={handleBackgroundClick}>
            <div className='popup__container'>
                <button className='popup__close-button' aria-label='close' name='close' type='button' onClick={onClose} ></button>
                <h2 className='popup__title'>{title}</h2>
                <form action='#' className='popup__form' name={name}>
                    {children}
                    <button className='popup__button' aria-label='submit' name='submit' type='submit'>Save</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;