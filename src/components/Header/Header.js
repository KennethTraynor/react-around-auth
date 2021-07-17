import { Link } from "react-router-dom";
import logoPath from '../../images/logo.svg';

function Header({ loggedIn, email, onSignOut, currentPageType }) {

    return (
        <header className='header'>
            <img src={logoPath} className='header__logo' alt='Around The U.S. logo' />
            <div className='header__info-container'>
                {loggedIn && <p className='header__email'>{email}</p>}

                {loggedIn && <button className='header__user-state-button header__user-state-button_type_logout' onClick={onSignOut}>Log Out</button>}
                {!loggedIn && currentPageType === 'signup' && <Link className='header__user-state-button header__user-state-button_type_signin' to='/signin'>Log in</Link>}
                {!loggedIn && currentPageType === 'signin' && <Link className='header__user-state-button header__user-state-button_type_signin' to='/signup'>Sign Up</Link>}
                
            </div>
        </header>
    )
}

export default Header;