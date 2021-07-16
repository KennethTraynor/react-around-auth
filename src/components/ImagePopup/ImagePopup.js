import React from "react";

function ImagePopup({ onClose, card, isOpen, onPopupBackgroundClick }) {

    return (
        <div className={`popup popup_type_preview ${isOpen ? 'popup_opened' : ''}`} onClick={onPopupBackgroundClick}>
            <div className='popup__container popup__container_type_preview'>
                <button className='popup__close-button' aria-label='close' name='close' type='button' onClick={onClose} ></button>
                <div className='preview-image'>
                    <img className='preview-image__image' src={card.src} alt={card.name} />
                    <p className='preview-image__caption'>{card.name}</p>
                </div>
            </div>
        </div>
    )
}

export default ImagePopup;