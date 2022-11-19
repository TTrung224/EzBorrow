import React from 'react'
import './Navbar.css'

function Navbar() {
  return (
    <div>
         <div className='Main'>
            <div className='profile'>
                <img src='https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg' height={50}></img>
            </div>
        </div>
        <div className='Search'>
            <input type="text" placeholder="Search.."/>
        </div>
    </div>
  )
}

export default Navbar