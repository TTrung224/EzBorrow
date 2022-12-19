import React from 'react'
import './Navbar.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Logout from './Logout'
import {LinkContainer} from 'react-router-bootstrap';
import icon from './icon.png';
import { useNavigate } from "react-router-dom";


const Profile = (
  <img
    src={'https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg'}
    alt="UserName profile image"
    style={{ width: '40px' }}
  />
)

function Navbar() {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div>
        <div className='Main'>
          <div className="app_navbar-logo">
            <img src={icon} alt="app logo" />
          </div>
          <div className='profile'>
            <DropdownButton id="dropdown-item-button" title={Profile} variant="transparent">
              {/* <LinkContainer to="/login"> */}
                <Dropdown.Item as="button" onClick={() => navigate("/login", {replace: true})}>Login</Dropdown.Item>
              {/* </LinkContainer> */}
              <Dropdown.Item as="button" onClick={() => setModalShow(true)}>Logout</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <Logout show={modalShow} onHide={() => setModalShow(false)}></Logout>
    </div>
  )
}

export default Navbar