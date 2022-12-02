import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';

function Logout(props) {
  const [auth, setAuth] = useState()
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
     setAuth(auth);
    }
    
    if(!auth) {
      navigate("/login", { replace: true });
    }
  }, []);

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Logging out...
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Do you wish to log out from your account?
            </p>
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={props.onHide} variant = 'success'>Yes</Button>
          </Modal.Footer>
        </Modal>
    );    
}

export default Logout