import React from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const Login = () => {
    const [formData, setFormData] = React.useState({email: '', password: ''})
    const [error, setError] = React.useState("")
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/account/login', formData)
        .then((res)=>{
            console.log("res:", res)
            if(res.status === 200){
                localStorage.setItem('user', res.data.email)
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('auth', true)
                console.log("test")
                navigate("/", {replace: true});
            }
            if(res.status === 400) {
                console.log("Incorrect password or username")
                setError("Incorrect name or password")
            }
        })
    }


    return(
        <div className='login-body'>
            <div className='MainContainer' >
                <div className="auth-form-container">
                    <div className='login-header'>
                        <h2>Welcome!</h2>
                    </div>
                    <div className='login-error'>
                        <p>{error}</p>
                    </div>
                    <form className='login-form' onSubmit={onSubmit}>
                        <label for="username">USERNAME</label>
                        <input type="email" placeholder="your email" id="username" name="username" onChange={(e)=>setFormData({...formData, email: e.target.value})}></input>
                        <label for="password">PASSWORD</label>
                        <input type="password" placeholder="********" id="password" name="password" onChange={(e)=>setFormData({...formData, password: e.target.value})}></input>
                        <button type='submit' className='btn-login' href="/">Log in</button>
                    </form>
                </div>
            </div>  
        </div>
    )
}

export default Login

