//do not mind this file
import {createContext, useEffect, useState} from 'react'
import axios from 'axios'
import {backendUrl} from './serverURLContext' 
import {axiosSetting} from './serverURLContext'
import {cookie} from './serverURLContext'
import Cookies from 'universal-cookie'
export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    // auth state
    const [authState, setAuth] = useState({
        isAuthenticated: false,
        user: null
    })

    const [lecturer, setLect] = useState([]);


    // check Auth from server


    useEffect(() =>  {
        const loadUser = async () => {
            try {console.log("this is load user")
                const res = await axiosSetting.get('account/getAccount')
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

        const loadLecturer = async () => {
            try {
                console.log("loading lecturers");
                const response = await axiosSetting.get('account/lecturers')
                if(response.status === 200){
                    setLect(response.data)
                }
            } catch (error) {
                setLect([]);
                console.log(error)
            }
            
        }
        loadLecturer();
        loadUser();
    },[])

    //login
    const LoginContext = async userForm => {
        try {
            const cookies = new Cookies();
            console.log("cookie from context: " + cookie)
            const res = await axiosSetting.post('account/login', userForm,{withCredentials: true})
            if(res.status === 200){
                console.log(200)
                const token = res.data.token;
                cookies.set('token', token, { path: '/', maxAge: 7200 })
                console.log("cookie from context: " + cookie)
                setAuth({
                    isAuthenticated: true,
                    user: res.data
                });
                console.log("set")
                const response = await axiosSetting.get('account/lecturers')
                if(response.status === 200){
                    setLect(response.data)
                }
                console.log("cookie from context: " + cookie)
            }
            return {success: true, data: res.data}
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {status: false, message: error.message}
        }
    }

    
    const Logout = async () => {
        try {
            const cookies = new Cookies();

            console.log("logging out")
            const res = await axiosSetting.post('account/logout',{},{withCredentials: true})
            if (res.status === 200) {
                cookies.remove("token", { path: '/' });
                console.log("logout succcess")
                setAuth({isAuthenticated: false, user: null})
                setLect([]);
            }
            return {success: true, message: "you are logged out"}
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {status: false, message: error.message}
        }
    }

    const authContextData = { LoginContext, authState, Logout, lecturer };
    
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>    
    )
    
    
}

export default AuthContextProvider



