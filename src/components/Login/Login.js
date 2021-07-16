import React from "react";
import { Link } from "react-router-dom";

function Login() {

    return (
        <div className='member-form'>
            <div className='member-form__container'>
                <h2 className='member-form__title'>Log In</h2>
                <form action='#' className='member-form__form'>
                    <input type="email" className='member-form__input' placeholder='Email' required />
                    <input type="password" className='member-form__input' placeholder='Password' required />
                    <button className='member-form__submit-button' aria-label='submit' name='submit' type='submit'>Log in</button>
                </form>
                <Link className='member-form__bottom-link' to='/signup'>Not a member yet? Sign up here!</Link>
            </div>

        </div>
    )
}

export default Login;