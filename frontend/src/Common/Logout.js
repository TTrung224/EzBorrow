import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from 'axios';

function Logout(props) {
  const navigate = useNavigate();
  const authAxios = axios.create({
    baseURL: 'http://localhost:4500/account/',
    withCredentials: true
  })

  const logout = async () => {
    const response = await authAxios.post('/logout');
    navigate("/hero", { replace: true });
};

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
              <Button onClick={(e)  => {props.onHide(e); logout()}} variant = 'success'>Yes</Button>
          </Modal.Footer>
        </Modal>
    );    
}

export default Logout