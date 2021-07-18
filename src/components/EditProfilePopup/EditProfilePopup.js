import React, { useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditProfilePopup({isOpen, onClose, onPopupBackgroundClick, handleUpdateProfile}) {

    const value = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');

    useEffect(() => {
        if(isOpen) {
            setName(value.currentUser.userName);
            setAbout(value.currentUser.userDescription);
        }
    }, [isOpen])

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch(name) {
            case 'name':
                setName(value);
                break;
            case 'about':
                setAbout(value);
                break;
            default:
                console.log(`Invalid input: name:${name} value:${value}`);
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateProfile({name, about});
    }

    return (
        <PopupWithForm name='profile' title='Edit profile' submitText='Save' isOpen={isOpen} onClose={onClose} onPopupBackgroundClick={onPopupBackgroundClick} handleSubmit={handleSubmit}>
            <div className='popup__field'>
                <input id='profile-name' type='text' name='name' className='popup__input popup__input_type_name' placeholder='Name' required minLength='2' maxLength='40' value={name} onChange={handleChange} />
                <span id='profile-name-error' className='popup__error'></span>
            </div>

            <div className='popup__field'>
                <input id='profile-about' type='text' name='about' className='popup__input popup__input_type_about' placeholder='About me' required minLength='2' maxLength='200' value={about} onChange={handleChange} />
                <span id='profile-about-error' className='popup__error'></span>
            </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup;