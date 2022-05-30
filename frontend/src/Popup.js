import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import './stylesheets/popup.css';

/* 
  Modal pop up to confirm delete. It has 2 buttons: Delete and Cancel.
  Delete calls the handleDeleteTrue function that sends the DELETE request to the backend and removes it from the boats state list.
*/
export default function Popup({popup, handleDeleteTrue, handleDeleteFalse}) {
  return (
    <div>
      <Modal show={popup.show}>
        <ModalHeader>
          <ModalTitle>Are you sure you want to delete?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <button id="deletebtn" onClick={handleDeleteTrue} className='btn btn-outline-danger'>Delete</button> 
          <button id="deletebtn" onClick={handleDeleteFalse} className='btn btn-outline-danger'>Cancel</button>
        </ModalBody>
      </Modal>
            
    </div>
  );
}
        