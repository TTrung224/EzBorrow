import React from 'react';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import {FaPlus} from 'react-icons/fa';
import {FaMinus} from 'react-icons/fa';

import Confirmation from './Confirmation';
import './Request.css'
import arduino from './arduino.png'

function Request() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className='cart'>
      <div className='cart-item-box'></div>
        <div className='req-title'>
          <h4>Requests</h4>
        </div>
        <div className='product-cart'>         
            <div className='detail'>
              <div className='product_title'>
                <h4> Ardruino </h4>
              </div>
              <div className='product_qty'>
                  <button id='inscreasebtn'>
                      <FaPlus/>                         
                  </button>
                  <span className='quantity'>01</span>
                  <button id='decreasebtn'>
                      <FaMinus/>                         
                  </button>
              </div>
              <span className='close-button'>
                      <CloseButton variant='danger'/>
              </span>
            </div>
        <Confirmation show={modalShow} onHide={() => setModalShow(false)}/>
        </div>
        <h4> Summary </h4>
        <div className='Total'>
              <span>Total</span><span/><span id='total'>2</span>

        </div>
        <div className='buttons'>
            <Button id='clear-btn' variant='danger'>Clear</Button>
            <Button id='request-btn' variant='success' onClick={() => setModalShow(true)}>Request</Button>
        </div>
    </div>
    
  )
}

export default Request