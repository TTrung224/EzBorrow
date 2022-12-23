import React from 'react'
import './Navbar.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Logout from './Logout'
import {LinkContainer, Button} from 'react-router-bootstrap';
import icon from './icon.png';
import { useNavigate } from "react-router-dom";
import {useContext} from 'react'
import {AuthContext} from '../Context/loginSessionContext'

const Profile = (
  <img
    src={'https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg'}
    alt="UserName profile image"
    style={{ width: '40px' }}
  />
)

function Navbar() {
  const { authState: {isAuthenticated}} = useContext(AuthContext)
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div>
        <div className='Main'>
          <div className="app_navbar-logo">
            <img src={icon} alt="app logo" />
            
          </div>
          <div className='profile'>
            {isAuthenticated &&

              <DropdownButton id="dropdown-button" title={Profile} variant="transparent">
                {/* these are just placeholder, not all are meant to be used */}
                <Dropdown.Item as="button" onClick={() => navigate("/profile", {replace: true})}>Profile</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => navigate("/request", {replace: true})}>Request</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => navigate("/about", {replace: true})}>About  </Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => setModalShow(true)}>Logout</Dropdown.Item>
              </DropdownButton>

            }
            {(!isAuthenticated && (window.location.pathname !== '/login') && (window.location.pathname !== "/hero")) && <button type="button" class="btn btn-primary" onClick={() => navigate("/login", {replace: true})}>Login</button>}
          </div>
        </div>
        <Logout show={modalShow} onHide={() => setModalShow(false)}></Logout>
    </div>
  )
}

export default Navbar