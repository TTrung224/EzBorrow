import './Login.css';
import { useNavigate, Navigate, Outlet} from "react-router-dom";
import {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import Login from './login'
import {AuthContext} from '../../Context/loginSessionContext'
import Spinner from 'react-bootstrap/Spinner'

const Loading = () => {
    const { authState: {isAuthenticated}} = useContext(AuthContext)
    const navigate = useNavigate()

    if (isAuthenticated) {
        console.log("you are in")
        return <Outlet/>
    }
    else {
        console.log("navigating") 
        return <Navigate to="/login"/>
    }

}

export default Loading;
