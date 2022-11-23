import React from 'react';
import Button from 'react-bootstrap/Button';
import Confirmation from './Confirmation';
import './Request.css'

function Request() {
  const [modalShow, setModalShow] = React.useState(false);

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
            <Button variant='success' onClick={() => setModalShow(true)}>Request</Button>
        </div>
        <Confirmation show={modalShow} onHide={() => setModalShow(false)}/>
    </div>
  )
}

export default Request