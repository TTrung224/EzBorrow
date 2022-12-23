import './Login.css';
import { Navigate, Outlet} from "react-router-dom";
import {useContext} from 'react'

import {AuthContext} from '../../Context/loginSessionContext'

const Loading = () => {
    const { authState: {isAuthenticated}} = useContext(AuthContext)


    if (isAuthenticated) {
        console.log("you are in")
        return <Outlet/>
    } else if (window.location.pathname === '/') {
        return <Navigate to="hero"/>
    }
    else {
        console.log("navigating") 
        return <Navigate to="/login"/>
    }

}

export default Loading;
