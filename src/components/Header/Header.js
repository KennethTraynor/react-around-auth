import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logoPath from '../../images/logo.svg';

function Header({ loggedIn, email, onSignOut, currentPageType }) {

    const [isAboveInfoVisible, setAboveInfoVisible] = React.useState(false);

    useEffect(() => {
        if (!loggedIn) {
            setAboveInfoVisible(false);
        }
    }, [loggedIn])

    const handleMenuButtonClick = () => {
        setAboveInfoVisible(!isAboveInfoVisible);
    }

    return (
        <header className='header'>
            {loggedIn &&
                <div className={`header__above-info-container ${isAboveInfoVisible ? 'header__above-info-container_visible' : ''}`}>
                    <p className='header__email header__email_type_above'>{email}</p>
                    <button className='header__logout-button header__logout-button_type_above' onClick={onSignOut}>Log Out</button>
                </div>
            }
            <div className='header__container'>
                <img src={logoPath} className='header__logo' alt='Around The U.S. logo' />
                <div className='header__info-container'>
                    {loggedIn &&
                        <>
                            <p className='header__email header__email_type_bar'>{email}</p>
                            <button className='header__logout-button header__logout-button_type_bar' onClick={onSignOut}>Log Out</button>
                            <button className={`header__menu-button ${isAboveInfoVisible ? 'header__menu-button_active' : ''}`} onClick={handleMenuButtonClick}></button>
                        </>
                    }
                    {!loggedIn &&
                        <>
                            {currentPageType === 'signup' && <Link className='header__login-signup-link' to='/signin'>Log in</Link>}
                            {currentPageType === 'signin' && <Link className='header__login-signup-link' to='/signup'>Sign Up</Link>}
                        </>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;