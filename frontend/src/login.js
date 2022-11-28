import React from 'react';
import './Login.css';
import {LinkContainer} from 'react-router-bootstrap';
export const Login = () => {
    return(
        <div className='login-body'>
        <div className='MainContainer' >
        <div className="auth-form-container">
            <div className='login-header'>
                <h2>Welcome!</h2>
            </div>
            
            <form className='login-form'>
                <label for="username">USERNAME</label>
                <input type="email" placeholder="your email" id="username" name="username"></input>
                <label for="password">PASSWORD</label>
                <input type="password" placeholder="********" id="password" name="password"></input>
        </form>
        <LinkContainer to="/">
            <button type='submit' className='btn-login' href="/">Log in</button>
        </LinkContainer>    
        </div>
        </div>
            
        </div>
        
    )
}

export default Login

