//do not mind this file
import {createContext, useEffect, useState} from 'react'
import axios from 'axios'
import {backendUrl} from './serverURLContext' 

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    // auth state
    const [authState, setAuth] = useState({
        isAuthenticated: false,
        user: null
    })


    // check Auth from server


    useEffect(() =>  {
        const loadUser = async () => {
            try {console.log("this is load user")
                const res = await axios.get(`${backendUrl}/account/getAccount`, {withCredentials: true})
                if (res.status === 200) {
                    
                    setAuth({
                        isAuthenticated: true,
                        user: res.data
                    })
                }
            } catch (error) {
                setAuth({
                    isAuthenticated: false,
                    user: null
                })
            }
        }
        loadUser();
    },[])

    //login
    const LoginContext = async userForm => {
        try {
            const res = await axios.post(`${backendUrl}/account/login`, userForm,{withCredentials: true})
            if(res.status === 200){
                setAuth({
                    isAuthenticated: true,
                    user: res.data
                })
                
            }
            return {success: true, data: res.data}
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {status: false, message: error.message}
        }
    }
    
    const Logout = async () => {
        try {
            console.log("logging out")
            const res = await axios.post(`${backendUrl}/account/logout`,{},{withCredentials: true})
            if (res.status === 200) {
                console.log("logout succcess")
                setAuth({isAuthenticated: false, user: null})
            }
            return {success: true, message: "you are logged out"}
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {status: false, message: error.message}
        }
    }

    const authContextData = { LoginContext, authState, Logout };
    
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>    
    )
    
    
}

export default AuthContextProvider



