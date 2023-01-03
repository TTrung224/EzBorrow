import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FaEdit} from 'react-icons/fa';
import './TechnicianComponentEdit.css'
import {axiosSetting} from '../Context/serverURLContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TechnicianComponentEdit = React.forwardRef((props, ref) => {
    const [show, setShow] = useState(false);
    const id = props.id;
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([])
    const [quantity, setQuantity] = useState(0);
    const [img, setImg] = useState('');
    const [permission,setPermission] = useState(true);

    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    
    const notify = () => {
        toast.success("Updated successfully!");
        setTimeout(()=>{
            (window.location.reload(false));
        }, 4000)
    }

    const notify1 = () => {
        toast.success("Deleted successfully!");
        setTimeout(()=>{
            (window.location.reload(false));
        }, 4000)
    }

    const reload = () =>{
        load();
        console.log("reloaded:", data);
        console.log(data.name)
        console.log(data.permission)
    }
    React.useImperativeHandle(ref, () => ({
       reload: reload
    }));

    const load = async () => {
        const response = await axiosSetting.get('/component/' + id);
        const data = await response.data;
        // console.log(data);
        console.log("load")
        setData(data);
        setName(data.name);
        setDesc(data.description);
        setQuantity(data.quantity);
        setPermission(data.permission);
        setImg(data.img_src);
    };

    useEffect(() => {

        load();
    }, [props.id])

    const edit = async () => {
        await axiosSetting.put('/component/' + id, {
            updateComponent: {
                name: name,
                description: desc,
                quantity: quantity,
                permission: permission,
                img_src: img,
            },
        }, {withCredentials: true}).catch((error) => {
            console.log(error.response)
            notify()
        })
        setTimeout(() => {
            handleClose();}, 3000);
    }

    const deleteComponent = async () => {
        await axiosSetting.delete('/component/' + id,
        {withCredentials: true}).catch((error) => {
        console.log(error.response)})
        console.log('delete')
        setTimeout(() => {
            handleClose2();}, 3000);  
    }
    

  return (
    <div>
        <Button className='edit-component-btn' variant="primary" onClick={handleShow}>
            <FaEdit/>
        </Button>

        <Modal className='form-modal' show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title className='edit-header' >
                <div className='bold-words-header'>{data.name}</div>               
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='Edit-info'>
                    <p><span className='bold-words' >Product ID :&emsp;</span>{data._id}</p>
                    <p><span className='bold-words' >Name :&emsp;</span><input type="text" value={name} onChange={(e) => {setName(e.target.value)}}></input></p>                
                    <p><span className='bold-words' >Description :&emsp;</span><input type="text" value={desc} onChange={(e) => {setDesc(e.target.value)}}></input></p>
                    <p><span className='bold-words' >Quantity :&emsp;</span><input type="number" value={quantity} onChange={(e) => {setQuantity(e.target.value)}}></input></p>
                    <p><span className='bold-words' >Image :&emsp;</span><input type="text" value={img} onChange={(e) => {setImg(e.target.value)}}></input></p>
                    <span className='bold-words' >Permission :&emsp;</span>
                    <select value={permission}
                        onChange={(e) => {setPermission(e.target.value)}}>                                
                        <option value={false}>No</option>
                        <option value= {true}>Yes</option>
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <Button id='update-btn' variant="primary" onClick={() =>{edit();notify()}  }>
                        Update
                    </Button>
                    <ToastContainer />
                </div>
                <div>
                    <Button onClick={()=>{handleShow2();handleClose()}} variant='danger'>Delete</Button>
                </div>
            </Modal.Footer>
        </Modal>

        
        <Modal show={show2} onHide={handleClose2} id='modal-popup'>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body id='modal-popup-body'>
                <p><span className='wordss'>Deleting will permanently remove this file from the system.</span><span className='bold-words'>This cannot be undone</span></p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose2}>
                    Cancel
                </Button>
                <div>
                <Button variant="primary" onClick={() => {deleteComponent();notify1();}}>
                    Confirm
                </Button>
                <ToastContainer/>
                </div>
            </Modal.Footer>
        </Modal>
        </div>
   
  )
})

export default TechnicianComponentEdit