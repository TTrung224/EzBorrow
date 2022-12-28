import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import {useContext} from 'react'
import {AuthContext} from '../Context/loginSessionContext'

function Logout(props) {
  const navigate = useNavigate();
  const {Logout} = useContext(AuthContext);

  const logout = async () => {
    try {
      const logoutresponse = await Logout();
      if (logoutresponse.success) {
        console.log("success")
        sessionStorage.clear();
        navigate("/hero", { replace: true });
      } else {
        console.log(logoutresponse)
      }
    } catch (error) {
      console.log(error)
    }

    
    
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