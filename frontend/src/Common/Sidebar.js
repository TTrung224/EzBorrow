import React from 'react'
import './Sidebar.css'
import {useState} from 'react'
import classNames from 'classnames'
import {Link} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';


function Sidebar() {
  const [active1, setActive1] = useState(false)
  const [active2, setActive2] = useState(false)
  console.log(active1)

  return (
      <div className="sideBarContainer">
        <LinkContainer to={"/dashboard"}>
          <button className={classNames('sideBaritem', {'sideBarItem-active': active1})} onClick={e => {setActive1(true); setActive2(false)}}>Dashboard</button>
        </LinkContainer>
        <LinkContainer to={"/request"}>
          <button className={classNames('sideBaritem', {'sideBarItem-active': active2})} onClick={e => {setActive2(true); setActive1(false)}}>Request</button>
        </LinkContainer>
      </div>
  )
}

export default Sidebar