import React from 'react';
import './Login.css';
export const Login = () => {
    return(
        <div className="auth-form-container">

        <form className='login-form'>
                <label for="username">USERNAME</label>
                <input value="email" placeholder="your Sid" id="username" name="username"></input>
                <label for="password">PASSWORD</label>
                <input value="password" placeholder="********"id="password" name="password"></input>
        </form>
        <button type='submit'>Log In</button>
        </div>
    )
}

export default Login