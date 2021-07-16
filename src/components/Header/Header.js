import logoPath from '../../images/logo.svg';

function Header({ loggedIn }) {
    return (
        <header className='header'>
            <img src={logoPath} className='header__logo' alt='Around The U.S. logo' />
            <div className='header__info-container'>
                {loggedIn && <p class='header__email'>email@mail.com</p>}
                {loggedIn && <button className='header__logout-button'>Log Out</button>}
            </div>
        </header>
    )
}

export default Header;