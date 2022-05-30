import React, { useState, useEffect } from 'react';
import './App.css';
import Swimlanes from './Swimlanes';
import Popup from './Popup';
import NewBoat from './NewBoat';

/*
Home page that renders the swimlanes for the Boats. It sorts the boats into their swimlanes and allows them to move easily via a dropdown menu in each card.
*/
function Home(){

  useEffect(() => {
    fetchItems();
  });

  const [boats, setBoats] = useState([]);
  const [guides, setGuides] = useState([]);

  //Load all of the boats into state.
  const fetchItems = async () =>{
    const boatsRaw = await fetch("https://is27-comp-backend.azurewebsites.net/boatAPI");
    const boats = await boatsRaw.json();
    setBoats(boats);
    const guidesRaw = await fetch("https://is27-comp-backend.azurewebsites.net/guidesAPI");
    const guides = await guidesRaw.json();
    setGuides(guides);
    
  }
  // Gets the change from the dropdown and updates the backend with the swimlane change.
  const handleChange = (event, id) =>{
    const reqOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({id: id, swimlaneID: event.target.value})
    };
    fetch('https://is27-comp-backend.azurewebsites.net/boatAPI/' + id, reqOptions)
  }

  //New boat pop-up
  const [showNewBoat, setShowNewBoat] = useState({
    show: false
  });
  //Open the New Boat page when clicked
  const openNewBoat = () =>{
    setShowNewBoat({show:true})
  }
  const closeNewBoat = () =>{
    setShowNewBoat({show:false});
  }

  //Cause a popup when delete is pressed to help prevent accidental deletions from the board.
  const handleDelete = (id) =>{
    //console.log(id);
    setPopup({
      show:true,
      id,
    });
    console.log(popup.show);
  }
  //Delete Popup to confirm the press of the delete button.
  const [popup, setPopup] = useState({
    show: false,
    id: null
  })

  //If delete is true (confirmed in popup) send DELETE reqest
  const handleDeleteTrue = () =>{
    if (popup.show && popup.id) {
      const reqOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      };
      fetch('https://is27-comp-backend.azurewebsites.net/boatAPI/' + popup.id, reqOptions)
      setPopup({
        show: false,
        id: null,
      });
    }
  };
  // If false just hide the popup
  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
    });
  };

return(
      
    <div className="container">
      {console.log()}
      <div className='row'>
        <div className='col-sm'>
          <h2>Docked</h2>
            <Swimlanes boats={boats.filter((boat) => parseInt(boat.swimlaneID) === 0) } handleChange={handleChange} handleDelete={handleDelete} />
        </div>
        <div className='col-sm'>
          <h2>Outbound to Sea</h2>
            <Swimlanes boats={boats.filter((boat) => parseInt(boat.swimlaneID) === 1)} handleChange={handleChange} handleDelete={handleDelete} />
        </div>
        <div className='col-sm'>
          <h2>Inbound to Harbor</h2>
            <Swimlanes boats={boats.filter((boat) => parseInt(boat.swimlaneID) === 2)} handleChange={handleChange} handleDelete={handleDelete} />
        </div>
        <div className='col-sm'>
          <h2>Maintenance</h2>
            <Swimlanes boats={boats.filter((boat) => parseInt(boat.swimlaneID) === 3)} handleChange={handleChange} handleDelete={handleDelete} />
        </div>
      </div>
      <div className='row'><button className="btn btn-primary" onClick={openNewBoat}>New Boat</button></div>
      {showNewBoat.show && (
        <NewBoat 
          showNewBoat={showNewBoat}
          closeNewBoat={closeNewBoat}
          guides={guides} 
        />
        )}
      {popup.show && (
        <Popup
          popup={popup}
          handleDeleteTrue={handleDeleteTrue}
          handleDeleteFalse={handleDeleteFalse}
        />
      )}
    </div>
  );
}

export default Home;