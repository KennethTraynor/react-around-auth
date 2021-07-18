import React from "react";

function PopupWithForm({ name, title, submitText, isOpen, onClose, children, onPopupBackgroundClick, handleSubmit }) {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onPopupBackgroundClick}>
            <div className='popup__container'>
                <button className='popup__close-button' aria-label='close' name='close' type='button' onClick={onClose} ></button>
                <h2 className='popup__title'>{title}</h2>
                <form action='#' className='popup__form' name={name} onSubmit={handleSubmit}>
                    {children}
                    <button className={`popup__button popup__button_type_${name}`} aria-label='submit' name='submit' type='submit'>{submitText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;