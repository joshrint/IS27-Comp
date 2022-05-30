import React from 'react';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";

export default function Popup({popup, handleDeleteTrue, handleDeleteFalse}) {
  return (
    <div>
        <Modal show={popup.show}>
            <ModalHeader>
                <ModalTitle>Are you sure you want to delete?</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <button onClick={handleDeleteTrue} className='btn btn-outline-danger'>Delete</button> 
                <button onClick={handleDeleteFalse} className='btn btn-outline-danger'>Cancel</button>
            </ModalBody>
        </Modal>
            
    </div>
  )
}
        