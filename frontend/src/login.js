import React from 'react';
import './Login.css';
export const Login = () => {
    return(
        <div className="auth-form-container">
        <form>
                <label for="username">USERNAME</label>
                <input type="email" placeholder="your Sid" id="username" name="username"></input>
                <label for="password">PASSWORD</label>
                <input type="password" placeholder="********"id="password" name="password"></input>
        </form>
        <button type='submit'>Log In</button>
        </div>
    )
}

export default Login