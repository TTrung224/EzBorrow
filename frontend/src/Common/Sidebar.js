import React from 'react'
import './Sidebar.css'
import {useState} from 'react'
import classNames from 'classnames'

function Sidebar() {
  const [active1, setActive1] = useState(false)
  const [active2, setActive2] = useState(false)
  console.log(active1)

  return (
      <div className="sideBarContainer">
          <button className={classNames('sideBaritem', {'sideBarItem-active': active1})} onClick={e => {setActive1(true); setActive2(false)}}>Dashboard</button>
          <button className={classNames('sideBaritem', {'sideBarItem-active': active2})} onClick={e => {setActive2(true); setActive1(false)}}>Request</button>
      </div>
  )
}

export default Sidebar