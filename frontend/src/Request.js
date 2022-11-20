import React from 'react';
import Button from 'react-bootstrap/Button';
import './Request.css'

function Request() {
  return (
    <div className='Request'>
        <div className='items'>
            <div><span>Title</span><span> : </span><span>Number</span></div>
            <div><span>Title</span><span> : </span><span>Number</span></div>
            <div><span>Title</span><span> : </span><span>Number</span></div>
            <div><span>Title</span><span> : </span><span>Number</span></div>
        </div>
        <div className='buttons'>
            <Button variant='danger'>Clear</Button>
            <Button variant='success'>Request</Button>
        </div>
    </div>
  )
}

export default Request