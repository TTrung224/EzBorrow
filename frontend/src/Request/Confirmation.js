import React from 'react'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import {useState} from 'react'
import axios from 'axios';


function Confirmation(props) {

    const cartItems = props.cartItems;
    const [sname, setSname] = useState(sessionStorage.getItem('sname'))
    const [lname, setLname] = useState(JSON.parse(sessionStorage.getItem('lname')) ? JSON.parse(sessionStorage.getItem('lname')) : [])
    const [chosenLecturer, setChosenLecturer] = useState('')
    const [email, setEmail] = useState(sessionStorage.getItem('email'))
    const [cc, setCC] = useState('')
    const [pickupdate,setPickupdate] = useState()
    const [returndate, setReturndate] = useState()
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
                        Student Name: {sname}<br></br>
                        Sid: {sid} <br></br>
                    </p>
                    <h4>Course Information</h4>
                    <p>
                        <label for="lecturer">Lecturer:</label>
                        <select id="lecturer" onChange={(e) => setChosenLecturer(e.target.value)}>
                            {lname.map((item) => (
                                <option>{item.first_name}</option>
                            ))}
                        </select> <br/>
                        Lecturer email: {lname.map((item) => {
                            if(item.first_name === chosenLecturer) {
                                return(<span>{item.email}</span>)
                            }
                        })}<br/>
                        Course Code: <input onChange={e=>setCC(e.target.value)}></input><br/>
                    </p>
                    <h4>Request Information</h4>
                    <ul>
                        {cartItems.map( (item) => (
                            <li>{item.name} x {item.quantity}</li>
                        ))}
                    </ul>
                    <div>                        
                        <p>Select pick up date</p>
                        <input type="date" onChange={e=>setPickupdate(e.target.value)}></input>
                        <p>Select return up date</p>
                        <input type="date" onChange={e=>setReturndate(e.target.value)}></input>
                        <p>Note: <input onChange={e=>setCC(e.target.value)}></input></p>
                    </div>
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