import React from 'react';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

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
            
            
            <div className='img-box'>
              <img src={arduino} className='product-img' alt="arduino" style={{ width: '130px' }}/>
            </div>

            <div className='detail'>
              <div className='product_title'>
                <h4> Ardruino </h4>
              </div>
              <div className='wrapper-request'>
                <div className='product_qty'>
                  
                  <span className='minus'>-</span>
                  <span className='quantity'>01</span>
                  <span className='increase'>+</span>
                </div>   
                  <span className='close-button'>
                      <CloseButton variant='danger'/>
                  </span>                                        
              </div>          
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