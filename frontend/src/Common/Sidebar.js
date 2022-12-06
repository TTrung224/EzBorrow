import React from 'react'
import './Sidebar.css'
import {LinkContainer} from 'react-router-bootstrap';


function Sidebar() {
  return (
      <div className="sideBarContainer">
        <LinkContainer to={"/request"}>
          <div className='nonActive'>Dashboard</div>
        </LinkContainer>
        <LinkContainer to={"/dashboard"}>
          <div className='nonActive'>Request</div>
        </LinkContainer>
      </div>
  )
}

export default Sidebar