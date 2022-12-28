import React from "react";
import './Banner.css';
import { useNavigate } from "react-router-dom";
function Banner() {
    const navigate = useNavigate();
    return(
        <div className="app_banner app_wrapper section_padding" id="home">
            <div className="app_wrapper_info">
                <div style={{marginBottom:'1rem'}}>
                    <p>EzBorrow make borrow so easy</p>
                </div>
                <h1 className="app_header-h1">Need something?</h1>
                <div>
                    <button type="button" class="btn btn-primary access-btn" onClick={() => navigate("/login", {replace: true})}>Borrow Now!</button>
                </div>
            </div>
        </div>
    
    )
}


export default Banner;