import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin, setCurrentPageType }) {
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    useEffect(() => {
        setCurrentPageType('signin');
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch(name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                console.log(`Invalid input: name:${name} value:${value}`);
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({email: email, password: password});
    };

    return (
        <div className='member-form'>
            <div className='member-form__container'>
                <h2 className='member-form__title'>Log In</h2>
                <form action='#' className='member-form__form' onSubmit={handleSubmit}>
                    <input id="email" name="email" type="email" className='member-form__input' placeholder='Email' required value={email} onChange={handleChange} />
                    <input id="password" name="password" type="password" className='member-form__input' placeholder='Password' required value={password} onChange={handleChange} />
                    <button className='member-form__submit-button' aria-label='submit' name='submit' type='submit'>Log In</button>
                </form>
                <Link className='member-form__bottom-link' to='/signup'>Not a member yet? Sign up here!</Link>
            </div>

        </div>
    )
}


export default Login;