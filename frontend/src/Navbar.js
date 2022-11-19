import React from 'react'
import './Navbar.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Profile = (
  <img
    src={'https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg'}
    alt="UserName profile image"
    roundedCircle
    style={{ width: '40px' }}
  />
)

function Navbar() {
  return (
    <div>
         <div className='Main'>
            <div className='profile'>
              <DropdownButton id="dropdown-item-button" title={Profile} variant="success">
                <Dropdown.Item as="button">Login</Dropdown.Item>
                <Dropdown.Item as="button">Logout</Dropdown.Item>
              </DropdownButton>
            </div>
        </div>
        <div className='search'>
            <div className='search-bar'>
                <input type="text" placeholder="Search.."/>
                <button type='button' className='btn-search'><img src='https://cdn-icons-png.flaticon.com/512/3917/3917754.png' height={20} width={20}/></button>
            </div>
        </div>
    </div>
  )
}

export default Navbar