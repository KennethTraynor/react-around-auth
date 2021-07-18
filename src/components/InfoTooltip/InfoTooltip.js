import React from "react";

function InfoTooltip({ message, isOpen, onClose, onPopupBackgroundClick, iconStatus }) {

    return (
        <div className={`popup popup_type_info ${isOpen ? 'popup_opened' : ''}`} onClick={onPopupBackgroundClick}>
            <div className='popup__container popup__container_type_info'>
                <button className='popup__close-button popup__close-button_type_info' aria-label='close' name='close' type='button' onClick={onClose} ></button>
                <div className='info-tooltip'>
                    <div className={`info-tooltip__icon info-tooltip__icon_type_${iconStatus}`}></div>
                    <p className='info-tooltip__message'>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;