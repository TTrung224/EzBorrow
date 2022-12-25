import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FaEdit} from 'react-icons/fa';
import './TechnicianComponents.css'
import axios from 'axios'

function TechnicianComponentEdit(props) {
    const [show, setShow] = useState(false);
    const id = props.id;
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([])

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
    };

    useEffect(() => {

        load();
    }, [])

    const edit = async () => {
        await authAxios.put('/component/' + id, {
            name: name,
            description: desc,
        }, {withCredentials: true}).catch((error) => {
            console.log(error.response)
        })
        load();
    }

  return (
    <div>
        <Button variant="primary" onClick={handleShow}>
            <FaEdit/>
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{data.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div>ID : {data._id}</div>
                    <div>Name: <input type="text" placeholder={data.name} onChange={(e) => {setName(e.target.value)}}></input></div>
                    <div>Description: <input type="text" placeholder={data.description} onChange={(e) => {setDesc(e.target.value)}}></input></div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={() => edit()}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default TechnicianComponentEdit