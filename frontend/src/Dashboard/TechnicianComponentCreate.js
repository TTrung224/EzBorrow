import React, { useState, useEffect, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './TechnicianComponentCreate.css'
import {FaPlus} from 'react-icons/fa';
import {axiosSetting} from '../Context/serverURLContext'
import { AuthContext } from '../Context/loginSessionContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TechnicianComponentAdd(props) {
    const {loadUser, loadLecturer} = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [img, setImg] = useState('');
    const [permission,setPermission] = useState(true);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [data, setData] = useState([])
    const [quantity, setQuantity] = useState(0);


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

    //     loadUser();
    //     loadLecturer();
    // }, [])

    const notify = () => {
        toast.success("Created successfully!");
        setTimeout(()=>{
            (window.location.reload(false));
        }, 4000)
    }

    const create = async () => {
        console.log('test')
        await axiosSetting.post('/component/', {
            name: name,
            description: desc,
            img_src: img,
            permission: permission,
            quantity: quantity,
        }, {withCredentials: true}).catch((error) => {
            console.log(error.response)
        })
        setTimeout(() => {
            handleClose();}, 3000);
    }

  return (
    <div className='compo-item'>
        <button className='full-width-button add-component-btn' onClick={handleShow}>
            <FaPlus size={70} />
        </button>
        <Modal className='form-modal' id="create-compo-form" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='edit-header' >
                <div className='bold-words-header'>NEW COMPONENT</div>               
                    </Modal.Title>
                </Modal.Header>
            <Modal.Body>
                <div className='Edit-info'>
                    <p><span className='bold-words' >Name :&emsp;</span><input type="text" placeholder='Enter name' onChange={(e) => {setName(e.target.value)}}></input></p>                
                    <p><span className='bold-words' >Description :&emsp;</span><input type="text" placeholder='Enter Description' onChange={(e) => {setDesc(e.target.value)}}></input></p>
                    <p><span className='bold-words' >Quantity :&emsp;</span><input type="number" placeholder='Enter Quantity' onChange={(e) => {setQuantity(e.target.value)}}></input></p>
                    <p><span className='bold-words' >Image :&emsp;</span><input type="text" placeholder='Enter image URL' onChange={(e) => {setImg(e.target.value)}}></input></p>
                    <span className='bold-words' >Required lecturer approval :&emsp;</span>
                    <select 
                        onChange={(e) => {setPermission(e.target.value)}}>
                        
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                    </select>
                    
                    
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button id='close-btn' variant="danger" onClick={handleClose}>
                    Close
                </Button>
                <div>
                <Button disabled={!name || !desc || !img || !permission} id='update-btn' onClick={() =>{create();notify()}} >
                    Create
                </Button>
                <ToastContainer />
                </div>
            </Modal.Footer>
        </Modal>
    </div>
)
}

export default TechnicianComponentAdd