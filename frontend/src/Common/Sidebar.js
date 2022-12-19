import React from 'react'
import './Sidebar.css'
import {LinkContainer} from 'react-router-bootstrap';

var isClose = true;
function openClose(){ 
  if(isClose){
    document.querySelector(".dashboardClose").className = "dashboardOpen";
    document.querySelector(".requestClose").className = "requestOpen";
    isClose = false;
  }else if(!isClose){
    document.querySelector(".dashboardOpen").className = "dashboardClose";
    document.querySelector(".requestOpen").className = "requestClose";
    isClose =true;
  }
}

function Sidebar() {
  return (
      <div className="sideBarContainer" onClick={openClose}>
        <button className='sideBarCloseOpentBtn' >sidebar</button>
        <div></div>
        <LinkContainer to={"/dashboard"}>
          <div className='nonActive dashboardClose'>Dashboard</div>
        </LinkContainer>
        <LinkContainer to={"/request"}>
          <div className='nonActive requestClose'>Request</div>
        </LinkContainer>
      </div>
  )
}

export default Sidebar