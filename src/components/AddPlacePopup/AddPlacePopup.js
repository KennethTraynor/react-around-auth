import React, { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onPopupBackgroundClick, handleAddPlace }) {

    const [title, setTitle] = React.useState('');
    const [url, setUrl] = React.useState('');

    useEffect(() => {
        setTitle('');
        setUrl('');
    }, [isOpen])

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'url':
                setUrl(value);
                break;
            default:
                console.log(`Invalid input: name:${name} value:${value}`);
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddPlace({ title, url });
    }

    return (
        <PopupWithForm name='new-card' title='New Place' submitText='Create' isOpen={isOpen} onClose={onClose} onPopupBackgroundClick={onPopupBackgroundClick} handleSubmit={handleSubmit} >
            <div className='popup__field'>
                <input id='card-title' type='text' name='title' className='popup__input popup__input_type_title' placeholder='Title' required minLength='1' maxLength='30' value={title} onChange={handleChange} />
                <span id='card-title-error' className='popup__error'></span>
            </div>

            <div className='popup__field'>
                <input id='card-url' type='url' name='url' className='popup__input popup__input_type_image-url' placeholder='Image Link' required value={url} onChange={handleChange} />
                <span id='card-url-error' className='popup__error'></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;