import React from 'react'
import './Sidebar.css'
import {LinkContainer} from 'react-router-bootstrap';

var isClose = true;
function openClose(){ 
  if(isClose){
    document.querySelector(".dashboardClose").classList.add("dashboardOpen") ;
    document.querySelector(".requestClose").classList.add("requestOpen");
    document.querySelector(".sideBarContainer").classList.add("sideBarContainerOpen")
    isClose = false;
  }else if(!isClose){
    document.querySelector(".dashboardClose").classList.remove("dashboardOpen") ;
    document.querySelector(".requestClose").classList.remove("requestOpen") ;
    document.querySelector(".sideBarContainer").classList.remove("sideBarContainerOpen")
    isClose =true;
  }
}

function Sidebar() {
  return (
      <div className="sideBarContainer" onClick={openClose}>
        <img className='sideBarCloseOpentBtn' src="/menu.2048x1366.png" alt="close button"/>
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