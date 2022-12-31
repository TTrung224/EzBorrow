//do not mind this file
import {createContext, useEffect, useState} from 'react'
import axios from 'axios'
import {backendUrl} from './serverURLContext' 
import {axiosSetting} from './serverURLContext'
import { useNavigate } from "react-router-dom";
import { Navigate, resolvePath } from 'react-router-dom';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    function refreshPage() {
        window.location.reload(false);
      }
    // auth state
    const [authState, setAuth] = useState({
        isAuthenticated: false,
        user: null
    })
    const navigate = useNavigate();

    const [lecturer, setLect] = useState([]);


    // check Auth from server


    const loadUser = async () => {
        try {console.log("this is load user")
            const res = await axios.get(`${backendUrl}/account/getAccount`, {withCredentials: true})
            if (res.status === 200) {
                
                setAuth({
                    isAuthenticated: true,
                    user: res.data
                })
            } else if (res.status === 205) {
                sessionStorage.clear();
                console.log("token expired");
                setAuth({
                    isAuthenticated: false,
                    user: null
                }, () => {refreshPage();});
            
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
            const response = await axiosSetting.get('/account/lecturers')
            if(response.status === 200){
                setLect(response.data)
            } else if (response.status === 205) {
                sessionStorage.clear();
                console.log("token expired");
                setAuth({
                    isAuthenticated: false,
                    user: null
                }, () => {refreshPage();});
            }
        } catch (error) {
            setLect([]);
            console.log(error)
        }
        
    }

    useEffect(() =>  {
        loadLecturer();
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
                const response = await axiosSetting.get('/account/lecturers')
                if(response.status === 200){
                    setLect(response.data)
                }
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
                setLect([]);
            }
            return {success: true, message: "you are logged out"}
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {status: false, message: error.message}
        }
    }

    const authContextData = { LoginContext, authState, Logout, lecturer, loadUser, loadLecturer };
    
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>    
    )
    
    
}

export default AuthContextProvider



