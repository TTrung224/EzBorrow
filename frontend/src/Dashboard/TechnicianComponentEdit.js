import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FaEdit} from 'react-icons/fa';
import './TechnicianComponentEdit.css'
import axios from 'axios'

function TechnicianComponentEdit(props) {
    const [show, setShow] = useState(false);
    const id = props.id;
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([])
    const [quantity, setQuantity] = useState(0);

    const authAxios = axios.create({
        baseURL: 'http://localhost:4500/',
        withCredentials: true
    })

    const load = async () => {
        const response = await authAxios.get('/component/' + id);
        const data = await response.data;
        console.log(data);
        console.log("load")
        setData(data);
        setName(data.name);
        setDesc(data.description);
        setQuantity(data.quantity);
    };

    useEffect(() => {

        load();
    }, [])

    const edit = async () => {
        await authAxios.put('/component/' + id, {
            updateComponent: {
                name: name,
                description: desc,
                quantity: quantity,
            }
        }, {withCredentials: true}).catch((error) => {
            console.log(error.response)
        })
    }

  return (
    <div>
        <Button variant="primary" onClick={handleShow}>
            <FaEdit/>
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title className='edit-header' >
                <div className='bold-words-header'>{data.name}</div>               
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='Edit-info'>
                    <p><span className='bold-words' >Product ID :&emsp;</span>{data._id}</p>
                    <p><span className='bold-words' >Name :&emsp;</span><input type="text" placeholder={data.name} onChange={(e) => {setName(e.target.value)}}></input></p>                
                    <p><span className='bold-words' >Description :&emsp;</span><input type="text" placeholder={data.description} onChange={(e) => {setDesc(e.target.value)}}></input></p>
                    <p><span className='bold-words' >Quantity :&emsp;</span><input type="text" placeholder={data.quantity} onChange={(e) => {setQuantity(e.target.value)}}></input></p>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button id='close-btn' variant="danger" onClick={handleClose}>
                Close
            </Button>
            <Button id='update-btn' variant="primary" onClick={() => edit()}>
                Update
            </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default TechnicianComponentEdit