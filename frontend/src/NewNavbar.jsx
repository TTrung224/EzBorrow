import React from "react";
import './NewNavbar.css';
import icon from './icon.png';

const NewNavbar = () => (
   <nav className="app_navbar">
        <div className="app_navbar-logo">
            <img src={icon} alt="app logo" />
        </div>
        {/* <ul className="app_navbar-links">
            <li className="p_opensans"><a href="#home">LOG IN</a></li>
            <li className="p_opensans"><a href="#home">LOG IN</a></li>
            <li className="p_opensans"><a href="#home">LOG IN</a></li>
            <li className="p_opensans"><a href="#home">LOG IN</a></li>
        </ul> */}
        <div className="app_navbar-login">
            <a href ="#login" classname="p_opensans">Log in</a>
        </div>
   </nav>

);

export default NewNavbar;