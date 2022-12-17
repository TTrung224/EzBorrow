import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState} from 'react'
import axios from 'axios';


function Confirmation(props) {

    const [sum, setSum] = useState(((sessionStorage.getItem('cart-sum')) ? sessionStorage.getItem('cart-sum') : 0)*1);
    const currentItems = (sessionStorage.getItem('cart-items')) ? JSON.parse(sessionStorage.getItem('cart-items')) : []; 
    const [cartItems, setCartItems] = useState(currentItems);
    const [fname, setFname] = useState(sessionStorage.getItem('fname'))
    const [lname, setLname] = useState(sessionStorage.getItem('lname'))
    const [email, setEmail] = useState(sessionStorage.getItem('email'))
    const [cc, setCC] = useState('')

    const sid = "s1234"
    const cname = "BITS"
    const comp = "Arduino"
    const compNum = 1

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Student Information</h4>
                    <p>
                        Student Name: {fname} {lname} <br></br>
                        Sid: {sid} <br></br>
                    </p>
                    <h4>Course Information</h4>
                    <p>
                        Course Code: <input onChange={e=>setCC(e.target.value)}></input><br/>
                        Lecturer Name: {lname} <br></br>
                        Lecturer Email: {email} <br></br>
                    </p>
                    <h4>Request Information</h4>
                    <ul>
                        {cartItems.map( (item) => (
                            <li>{item.name} x {item.quantity}</li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} variant='danger'>Cancel</Button>
                    <Button onClick={props.onHide} variant='success'>Send</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Confirmation