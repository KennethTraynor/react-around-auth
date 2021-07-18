import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister, setCurrentPageType }) {
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    useEffect(() => {
        setCurrentPageType('signup');
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
        onRegister({email: email, password: password});
    };

    return (
        <div className='member-form'>
            <div className='member-form__container'>
                <h2 className='member-form__title'>Sign Up</h2>
                <form action='#' className='member-form__form' onSubmit={handleSubmit}>
                    <input id="email" name="email" type="email" className='member-form__input' placeholder='Email' required value={email} onChange={handleChange} />
                    <input id="password" name="password" type="password" className='member-form__input' placeholder='Password' required value={password} onChange={handleChange} />
                    <button className='member-form__submit-button' aria-label='submit' name='submit' type='submit'>Sign Up</button>
                </form>
                <Link className='member-form__bottom-link' to='/signin'>Already a member? Log in here!</Link>
            </div>

        </div>
    )
}


export default Register;