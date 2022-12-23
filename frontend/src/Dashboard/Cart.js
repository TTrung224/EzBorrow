import React from 'react';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import {FaPlus} from 'react-icons/fa';
import {FaMinus} from 'react-icons/fa';
import {useState, useEffect} from 'react'

import Confirmation from './Confirmation';
import './Cart.css'

function Cart(props) {
  const {cartItems, onAdd, onDesc, onRemove, sum, removeAll} = props; 
  // console.log(cartItems.length)
  const [modalShow, setModalShow] = React.useState(false);
  // console.log(modalShow)

  var requestDisplay = false;
  function openCloseRequest(){
    if(!requestDisplay){
      document.querySelector(".cart").classList.remove("nonactive") ;
      requestDisplay = true;
    } else {
      document.querySelector(".cart").classList.add("nonactive") ;
      requestDisplay = false;
    }
  }

  return (
    <>
    <div className='cartCloseOpentBtn' onClick={openCloseRequest}>
      <img src="/clipboard.png"/>
    </div>
    <div className='cart nonactive'>
      <img className='cartCloseBtn' src="/close.png" onClick={openCloseRequest}/>
      <div className='cart-item-box'></div>
        <div className='req-title'>
          <h2>Requests</h2>
        </div>
        {cartItems.length === 0 && <div className='empty-cart'>Cart is empty</div>}
        {cartItems.map((item) => (
          <div key={item._id} className='product-cart'>
            <div className='detail'>
              <div className='product_title'>
                <h4>{item.name}</h4>
              </div>
              <div className='product_qty'>
                    <button id='decreasebtn' disabled={item.quantity <= 1} onClick={()=>onDesc(item)}>
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
        <Confirmation show={modalShow} onHide={() => setModalShow(false)} cartItems={cartItems} sum={sum}/>
        <h4> Summary </h4>
        <div className='Total'>
              <span>Total</span><span/><span id='total'>{sum}</span>

        </div>
        <div className='buttons'>
            <Button id='clear-btn' variant='danger' onClick={removeAll}>Clear</Button>
            <Button id='request-btn' variant='success' onClick={() => setModalShow(true)}>Request</Button>
        </div>    
    </div>  
    </>

  )
}

export default Cart