import React from 'react';
import './Login.css';
import {LinkContainer} from 'react-router-bootstrap';
import { useState} from 'react';
import axios from 'axios'
import { useSignIn } from 'react-auth-kit'
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";

export const Login = () => {
    const signIn = useSignIn()
    const [formData, setFormData] = React.useState({email: '', password: ''})

    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/account/login', formData)
            .then((res)=>{
                console.log(res)
                return (
                    <Navigate to="/hero" replace={true} /> //Navigate to components
                )
            })
    }


    return(
        <div className='login-body'>
            <div className='MainContainer' >
                <div className="auth-form-container">
                    <div className='login-header'>
                        <h2>Welcome!</h2>
                    </div>
                    
                    <form className='login-form' onSubmit={onSubmit}>
                        <label for="username">USERNAME</label>
                        <input type="email" placeholder="your email" id="username" name="username" onChange={(e)=>setFormData({...formData, email: e.target.value})}></input>
                        <label for="password">PASSWORD</label>
                        <input type="password" placeholder="********" id="password" name="password" onChange={(e)=>setFormData({...formData, password: e.target.value})}></input>
                        <button type='submit' className='btn-login'>Log in</button>
                    </form>
                </div>
            </div>  
        </div>
    )
}

export default Login

