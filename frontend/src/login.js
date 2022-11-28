import React from 'react';
import './Login.css';
import {LinkContainer} from 'react-router-bootstrap';
import { useState, useRef, useEffect } from 'react';
export const Login = ({f1}) => {
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const serverUser = 'johndoe@gmail.com';
    const serverPassword = '12345'

    const handleSubmit = (pwd, user) => {
        const auth = false;
        if (user == serverUser && pwd == serverPassword) {
            auth = true;
        }
        return auth;
    }

    return(
        <div className='login-body'>
            <div className='MainContainer' >
                <div className="auth-form-container">
                    <div className='login-header'>
                        <h2>Welcome!</h2>
                    </div>
                    
                    <form className='login-form'>
                        <label for="username">USERNAME</label>
                        <input type="email" placeholder="your email" id="username" name="username" onChange={(e) => setUser(e.target.value)}></input>
                        <label for="password">PASSWORD</label>
                        <input type="password" placeholder="********" id="password" name="password" onChange={(e) => setUser(e.target.value)}></input>
                    </form>
                    <LinkContainer to="/">
                        <button type='submit' className='btn-login' href="/" onClick={f1(true)}>Log in</button>
                    </LinkContainer>    
                </div>
            </div>  
        </div>
        
    )
}

export default Login

