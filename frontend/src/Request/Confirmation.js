import React from 'react'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import {useState} from 'react'
import axios from 'axios';
import './Confirmation.css'

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
                    <div>
                    INFORMATION
                    </div> 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='Student-info'>
                    <h4>Student Information</h4>
                    <p>
                        <p><span className='bold-words' >Name :&emsp;</span>{sname}</p>
                        <p><span className='bold-words'>Student ID :&emsp;</span>{sid}</p>
                    </p>
                    </div>
                    <h4>Course Information</h4>
                    <p>
                        <p><span className='bold-words' >Lecturer :&emsp;</span><select id="lecturer" onChange={(e) => setChosenLecturer(e.target.value)} required ></select></p>
                        
                            {lname.map((item) => (
                                <option>{item.first_name}</option>
                            ))}
                        <p><span className='bold-words' >Lecturer email :&emsp;</span>{lname.map((item) => {
                            if(item.first_name === chosenLecturer) {
                                return(<span>{item.email}</span>)
                            }
                        })}</p>
                        {/* Lecturer email: {lname.map((item) => {
                            if(item.first_name === chosenLecturer) {
                                return(<span>{item.email}</span>)
                            }
                        })} */}
                        <p><span className='bold-words' > Course Code :&emsp;</span><input onChange={e=>setCC(e.target.value)} required ></input></p>
                    </p>
                    <h4>Request Information</h4>
                    <ul>
                        {cartItems.map( (item) => (
                            <li>{item.name} x {item.quantity}</li>
                        ))}
                    </ul>
                    <div className='request-info'>                    
                        <p><span className='bold-words' >Select pickup date&emsp;</span><input type="date" onChange={e=>setPickupdate(e.target.value)} required ></input>
                        <span className='bold-words' >&emsp; Select return date&emsp;</span><input type="date" onChange={e=>setReturndate(e.target.value)} required ></input></p>
                        <p><span className='bold-words' >Note :&emsp;</span><input onChange={e=>setCC(e.target.value)}></input></p>
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