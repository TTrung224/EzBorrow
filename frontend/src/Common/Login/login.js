import './Login.css';
import {  useNavigate} from "react-router-dom";
import {useState, useContext} from 'react'
import {AuthContext} from '../../Context/loginSessionContext'


export const Login = (props) => {
    const {LoginContext, authState: {isAuthenticated}} = useContext(AuthContext)
    const [formData, setFormData] = useState({email: '', password: ''})
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const onSubmit = async event => {
        event.preventDefault();
        try {
            const loginData = await LoginContext(formData)
            if (loginData.success){
                console.log(loginData.data)
                console.log("loginnnnn")
                navigate("/dashboard");
            } else {
                console.log('err')
                setError('Invalid Credentials')
            }
        } catch (error) {
            console.log(error)
        }

    }

    if (isAuthenticated) navigate("/dashboard")
    
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

