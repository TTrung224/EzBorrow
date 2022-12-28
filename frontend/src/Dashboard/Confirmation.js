import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import {useState, useContext} from 'react'
import {AuthContext} from '../Context/loginSessionContext'
import {axiosSetting} from '../Context/serverURLContext'
import './Confirmation.css'
// import { PromiseProvider } from 'mongoose';

function Confirmation(props) {

    const {authState: {user}, lecturer} = useContext(AuthContext)
    
    const cartItems = props.cartItems;
    const sname = user.first_name + ' ' + user.last_name;
    const email = user.email;
    const [newItem, setItem] = useState('')
    const [chosenLecturerEmail, setChosenLecturerEmail] = useState('')
    const [chosenLecturer, setChosenLecturer] = useState('')
    const [cc, setCC] = useState('')
    const [pickupdate,setPickupdate] = useState()
    const [returndate, setReturndate] = useState()
    const lname = lecturer.length > 0 ? lecturer : ['error'];



    console.log("cart:", cartItems)

    const request = async (e) => {
        e.preventDefault();
        console.log("lname jeheskfsjkdfskfjd", lname)
        const transformedList = [];
        for(let  i = 0; i < cartItems.length; i++) {
            const item = {
                id: cartItems[i]._id,
                name: cartItems[i].name,
                amount: cartItems[i].quantity,
            }
            console.log("item:", item)
            transformedList.push(item)
        }

        setChosenLecturerEmail(document.querySelector(".lecturer-email").innerHTML);

        console.log("chosenLecturerEmail: " + chosenLecturerEmail);
        await axiosSetting.post('/request/', {
            pickup_date: pickupdate,
            expected_return_date: returndate,
            component_list: transformedList,
            lecturer_email: chosenLecturerEmail,
            course: cc,
        }, {withCredentials: true}).catch((error) => {
            console.log(error.response)
        })
        alert("Request sent successfully")
        return (props.onHide)
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
                <Modal.Body className='request-form-modal-body'>
                    <div className='Student-info'>
                    <div className='confirm-header'>
                    <h2>Student Information</h2>
                    </div>
                        <p><span className='bold-words' >Name :&emsp;</span>{sname}</p>
                        <p><span className='bold-words'>Student email :&emsp;</span>{email}</p>
                    </div>
                    <div className='confirm-header'>
                        <h3>Course Information</h3>
                    </div>
                        <p><span className='bold-words' >Lecturer :&emsp;</span><select id="lecturer" 
                        onChange={(e) => setChosenLecturer(e.target.value)} required > 
                        <option selected="true" disabled="disabled">-choose lecturer-</option>
                        {lname.map((item) => {return (<option>{item.first_name}</option>)})}</select></p>
                        
                           
                        <p><span className='bold-words' >Lecturer email :&emsp;</span>{lname.map((item) => {
                            if(item.first_name === chosenLecturer) {
                                return(<span className='lecturer-email'>{item.email}</span>);
                            }
                        })}</p>
                        <p><span className='bold-words' > Course Code :&emsp;</span><input onChange={e=>setCC(e.target.value)} required ></input></p>
                    <div className='confirm-header'>
                    <h3>Request Information</h3>
                    </div>
                    <ul>
                        {cartItems.map( (item) => (
                            <li>{item.name} x {item.quantity}</li>
                        ))}
                    </ul>
                    <div className='request-info'>                    
                        <p><span className='bold-words' >Select pickup date&emsp;</span><input type="datetime-local" onChange={e=>setPickupdate(e.target.value)} required ></input></p>
                        <p><span className='bold-words' >Select return date&emsp;</span><input type="datetime-local" onChange={e=>setReturndate(e.target.value)} required ></input></p>
                        <p><span className='bold-words' >Note :&emsp;</span></p>
                        <textarea rows="4" onChange={e=>setCC(e.target.value)} className='input-box'></textarea>
                    </div>     
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} variant='danger'>Close</Button>
                    <Button disabled={!cc || !pickupdate || !returndate || chosenLecturer===''} onClick={(e) => request(e)} variant='success'>Send</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Confirmation