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
function NewBoat({guides, showNewBoat, closeNewBoat, addNewBoat}) {

 
  //Setup a default for the boatname to ensure that it is a valid output
  const [boatName, setBoatName] = useState('');
  //Store the guides for the dropdown in the form.
  const [guideName, setGuideName] = useState('');
  
  //Submit the form to the backend to add to the list of boats.
  const handleSubmit = (e) =>{
    e.preventDefault();
    //Hold the new boat information to pass to the backend. ID and Swimlane not required since it is set by the backend.
    const newBoat = {boatName, guideName};
    fetch('https://is27-comp-backend.azurewebsites.net/boatAPI', {
      method: 'POST',
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify(newBoat)
    }).then(() =>{
      //Call the add new boat method from Home to add it to state for ease of loading.
      addNewBoat(newBoat);
      //Close the popup
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
                placeholder="Add boat name here..."
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
