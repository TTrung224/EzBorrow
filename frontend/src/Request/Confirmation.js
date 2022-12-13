import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState} from 'react'
import axios from 'axios';


function Confirmation(props) {

    const authAxios = axios.create({
        baseURL: 'http://localhost:4500/',
        withCredentials: true
    })

    
    

    const sname = "Name"
    const sid = "s1234"
    const cc = "COSC2234"
    const cname = "BITS"
    const lname = "Name"
    const lemail = "aaa@example.com"
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
                        Student Name: {sname} <br></br>
                        Sid: {sid} <br></br>
                    </p>
                    <h4>Course Information</h4>
                    <p>
                        Course Code: {cc} <br></br>
                        Course Name: {cname} <br></br>
                        Lecturer Name: {lname} <br></br>
                        Lecturer Email: {lemail} <br></br>
                    </p>
                    <h4>Request Information</h4>
                    <p>
                        {comp} x{compNum}
                    </p>
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