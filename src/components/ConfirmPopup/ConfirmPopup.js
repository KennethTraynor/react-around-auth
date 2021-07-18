import PopupWithForm from "../PopupWithForm/PopupWithForm";

function ConfirmPopup({isOpen, onClose, onPopupBackgroundClick, handleConfirm}) {

    const handleSubmit = (e) => {
        e.preventDefault();
        handleConfirm();
    }

    return (
        <PopupWithForm name='confirm' title='Are you sure?' submitText='Yes' isOpen={isOpen} onClose={onClose} onPopupBackgroundClick={onPopupBackgroundClick} handleSubmit={handleSubmit} />
    )
}

export default ConfirmPopup;