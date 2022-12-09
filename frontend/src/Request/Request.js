import React from 'react';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import {FaPlus} from 'react-icons/fa';
import {FaMinus} from 'react-icons/fa';

import Confirmation from './Confirmation';
import './Request.css'
import arduino from './arduino.png'

function Request(props) {
  const {cartItems, onAdd, onDesc, onRemove} = props; 
  console.log(cartItems.length)
  const [modalShow, setModalShow] = React.useState(false);
  console.log(modalShow)
  return (
    <div className='cart'>
      <div className='cart-item-box'></div>
        <div className='req-title'>
          <h4>Requests</h4>
        </div>
        {cartItems.length === 0 && <div className='empty-cart'>Cart is empty</div>}
        {cartItems.map((item) => (
          <div key={item._id} className='product-cart'>
            <div className='detail'>
              <div className='product_title'>
                <h4>{item.name}</h4>
              </div>
              <div className='product_qty'>
                    <button id='decreasebtn' onClick={()=>onDesc(item)}>
                        <FaMinus/>                         
                    </button>
                    <span className='quantity'>{item.quantity}</span>
                    <button id='inscreasebtn' onClick={()=> onAdd(item)}>
                        <FaPlus/>                         
                    </button>
                    
              </div>
              <span className='close-button'>
                      <CloseButton variant='danger' onClick={() => onRemove(item)}/>
              </span>
            </div>
              
          </div>
        ))}
        <div className='product-cart'>         
            <div className='detail'>
              <div className='product_title'>
                <h4> Ardruino </h4>
              </div>
              <div className='product_qty'>
                  <button id='decreasebtn'>
                      <FaMinus/>                         
                  </button>
                  <span className='quantity'>01</span>
                  <button id='inscreasebtn'>
                      <FaPlus/>                         
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