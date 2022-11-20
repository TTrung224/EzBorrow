import React from 'react'
import {useState} from 'react'
import './Navbar.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Logout from './Logout'

const Profile = (
  <img
    src={'https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg'}
    alt="UserName profile image"
    style={{ width: '40px' }}
  />
)

function Navbar() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
        <div className='Main'>
            <div className='profile'>
              <DropdownButton id="dropdown-item-button" title={Profile} variant="success">
                <Dropdown.Item as="button">Login</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => setModalShow(true)}>Logout</Dropdown.Item>
              </DropdownButton>
            </div>
        </div>
        <div className='search'>
            <div className='search-bar'>
                <input type="text" placeholder="Search.."/>
                <button type='button' className='btn-search'><img src='https://cdn-icons-png.flaticon.com/512/3917/3917754.png' height={20} width={20}/></button>
            </div>
        </div>
        <Logout show={modalShow} onHide={() => setModalShow(false)}></Logout>
    </div>
  )
}

export default Navbar