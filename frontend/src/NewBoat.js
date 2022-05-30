import React, { useState } from 'react';
import './App.css';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle"

/*
New boat form. The opperator can add a new boat by adding in the name of the boat and setting the guide who is using it.
There is an option of N/A for the guide.
*/
function NewBoat({guides, showNewBoat, closeNewBoat}) {

 
  //Setup a default for the boatname to ensure that it is a valid output
  const [boatName, setBoatName] = useState('');
  const [guideName, setGuideName] = useState('');
  //Store the guides for the dropdown in the form.
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    const newBoat = {boatName, guideName};
    console.log(e.value)
    fetch('https://is27-comp-backend.azurewebsites.net/boatAPI', {
      method: 'POST',
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify(newBoat)
    }).then(() =>{
      console.log("New Boat Added");
      closeNewBoat();
    })
  }
  

  return (
    <div>
      <Modal show={showNewBoat.show}>
        <ModalHeader>
          <ModalTitle>New Boat</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor="boatName">Boat Name: </label>
              <input 
                id="boatName"
                type="text"
                value={boatName}
                onChange={(e) => setBoatName(e.target.value)}
                className="form-control"
                required
                />
              <label htmlFor="guideName" >Guide:</label>
              <select id="guideName" className="form-control" onChange={(e) => setGuideName(e.target.value)} defaultValue="default">
                <option value="default" disabled>Choose a Guide</option>
                {guides.map(guide =>(
                  <option key={guide.id} value={guide.guideName}>{guide.guideName}</option>
                ))}
              </select>
            </div>
            <button onClick={closeNewBoat}className="btn btn-outline-danger">Back</button> <button type="submit" className="btn btn-outline-primary">Submit</button>
          </form>
        </ModalBody>
      </Modal>
      
      
    </div>
  );
}

export default NewBoat;
