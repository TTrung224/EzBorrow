import React from 'react'
import './Sidebar.css'
import {useState} from 'react'
import {LinkContainer} from 'react-router-bootstrap';


function Sidebar() {
  const [active1, setActive1] = useState('sideBarItem')
  const [active2, setActive2] = useState('sideBarItem')

  return (
      <div className="sideBarContainer">
        <LinkContainer to={"/dashboard"}>
          <div className='nonActive' onClick={e => {setActive1('sideBartItemActive'); setActive2('sideBarItem')}}>Dashboard</div>
        </LinkContainer>
        <LinkContainer to={"/request"}>
          <div className='nonActive' onClick={e => {setActive2('sideBarItemActive'); setActive1('sideBarItem')}}>Request</div>
        </LinkContainer>
      </div>
  )
}

export default Sidebar