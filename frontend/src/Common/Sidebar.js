import React from 'react'
import './Sidebar.css'
import {LinkContainer} from 'react-router-bootstrap';

var isClose = true;
function openClose(){ 
  if(isClose){
    document.querySelector(".dashboardClose").classList.add("dashboardOpen") ;
    document.querySelector(".requestClose").classList.add("requestOpen");
    isClose = false;
  }else if(!isClose){
    document.querySelector(".dashboardClose").classList.remove("dashboardOpen") ;
    document.querySelector(".requestClose").classList.remove("requestOpen") ;
    isClose =true;
  }
}

function Sidebar() {
  return (
      <div className="sideBarContainer" onClick={openClose}>
        <button className='sideBarCloseOpentBtn' >sidebar</button>
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