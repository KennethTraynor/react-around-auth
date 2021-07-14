import logoPath from '../../images/logo.svg';

function Header() {
    return (
        <header className='header'>
            <img src={logoPath} className='header__logo' alt='Around The U.S. logo' />
        </header>
    )
}

export default Header;