import React, { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onPopupBackgroundClick, handleUpdateAvatar}) {

    const [url, setUrl] = React.useState('');

    useEffect(() => {
        setUrl('');
    }, [isOpen])

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch(name) {
            case 'url':
                setUrl(value);
                break;
            default:
                console.log(`Invalid input: name:${name} value:${value}`);
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateAvatar({url});
    }

    return (
        <PopupWithForm name='avatar' title='Change profile picture' submitText='Save' isOpen={isOpen} onClose={onClose} onPopupBackgroundClick={onPopupBackgroundClick} handleSubmit={handleSubmit} >
            <div className='popup__field'>
                <input id='avatar-url' type='url' name='url' className='popup__input popup__input_type_image-url' placeholder='Image Link' required value={url} onChange={handleChange} />
                <span id='avatar-url-error' className='popup__error'></span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;