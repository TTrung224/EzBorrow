import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './TechnicianComponentCreate.css'
import axios from 'axios'
import {FaPlus} from 'react-icons/fa';

function TechnicianComponentAdd(props) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [data, setData] = useState([])
    const [quantity, setQuantity] = useState(0);

    const authAxios = axios.create({
        baseURL: 'http://localhost:4500/',
        withCredentials: true
    })

    // const load = async () => {
    //     const response = await authAxios.get('/component/' + id);
    //     const data = await response.data;
    //     console.log(data);
    //     console.log("load")
    //     setData(data);
    //     setName(data.name);
    //     setDesc(data.description);
    //     setQuantity(data.quantity);
    // };

    // useEffect(() => {

    //     load();
    // }, [])

    const create = async () => {
        await authAxios.post('/component/', {
            
                name: name,
                description: desc,
                quantity: quantity,
            
        }, {withCredentials: true}).catch((error) => {
            console.log(error.response)
        })
        alert("Component updated successfully")
        return(handleClose())
    }

  return (
                <div className='compo-item'>
                    <button className='full-width-button' onClick={handleShow}>
                        <FaPlus size={70} />
                    </button>
                    <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title className='edit-header' >
                            <div className='bold-words-header'>NEW COMPONENT</div>               
                                </Modal.Title>
                            </Modal.Header>
                        <Modal.Body>
                            <div className='Edit-info'>
                                <p><span className='bold-words' >Product ID :&emsp;</span></p>
                                <p><span className='bold-words' >Name :&emsp;</span><input type="text" placeholder='Enter name' onChange={(e) => {setName(e.target.value)}}></input></p>                
                                <p><span className='bold-words' >Description :&emsp;</span><input type="text" placeholder='Enter Description' onChange={(e) => {setDesc(e.target.value)}}></input></p>
                                <p><span className='bold-words' >Quantity :&emsp;</span><input type="text" placeholder='Enter Quantity' onChange={(e) => {setQuantity(e.target.value)}}></input></p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button id='close-btn' variant="danger" onClick={handleClose}>
                                Close
                            </Button>
                            <Button id='update-btn' onClick={() => create()}>
                                Update
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
)
}

export default TechnicianComponentAdd