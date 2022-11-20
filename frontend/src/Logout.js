import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Logout(props) {
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