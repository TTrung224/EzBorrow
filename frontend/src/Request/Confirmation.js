import React from 'react'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import {useState} from 'react'
import axios from 'axios';
import './Confirmation.css'
// import { PromiseProvider } from 'mongoose';

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

    const authAxios = axios.create({
        baseURL: 'http://localhost:4500/',
        withCredentials: true
    })

    const request = async () => {
        await authAxios.post('/request/', {
            pickup_date: pickupdate,
            expected_return_date: returndate,
            component_list: cartItems,
            lecturer_email: email,
            course: cc,
        }).catch((error) => {
            console.log(error.response)
        })
    }


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
                    <div className='confirm-top-header'>
                    <h2>INFORMATION</h2>
                    </div> 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='Student-info'>
                    <div className='confirm-header'>
                    <h2>Student Information</h2>
                    </div>
                    <p>
                        <p><span className='bold-words' >Name :&emsp;</span>{sname}</p>
                        <p><span className='bold-words'>Student ID :&emsp;</span>{sid}</p>
                    </p>
                    </div>
                    <div className='confirm-header'>
                    <h3>Course Information</h3>
                    </div>
                    <p>
                        <p><span className='bold-words' >Lecturer :&emsp;</span><select id="lecturer" onChange={(e) => setChosenLecturer(e.target.value)} required > {lname.map((item) => (
                                <option>{item.first_name}</option>
                            ))}</select></p>
                        
                           
                        <p><span className='bold-words' >Lecturer email :&emsp;</span>{lname.map((item) => {
                            if(item.first_name === chosenLecturer) {
                                setEmail(item.email);
                                return(<span>{item.email}</span>)
                            }
                        })}</p>
                        <p><span className='bold-words' > Course Code :&emsp;</span><input onChange={e=>setCC(e.target.value)} required ></input></p>
                    </p>
                    <div className='confirm-header'>
                    <h3>Request Information</h3>
                    </div>
                    <ul>
                        {cartItems.map( (item) => (
                            <li>{item.name} x {item.quantity}</li>
                        ))}
                    </ul>
                    <div className='request-info'>                    
                        <p><span className='bold-words' >Select pickup date&emsp;</span><input type="date" onChange={e=>setPickupdate(e.target.value)} required ></input>
                        <span className='bold-words' >&emsp; Select return date&emsp;</span><input type="date" onChange={e=>setReturndate(e.target.value)} required ></input></p>
                        <p><span className='bold-words' >Note :&emsp;</span></p>
                        <input onChange={e=>setCC(e.target.value)} className='input-box'></input>
                    </div>
                    <div>
                        result
                        {pickupdate}
                        {returndate}
                        {cartItems}
                        {email}
                        {cc}
                    </div>        

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} variant='danger'>Cancel</Button>
                    <Button onClick={request()} variant='success'>Send</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Confirmation