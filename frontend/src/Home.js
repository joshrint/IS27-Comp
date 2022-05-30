import React, { useState, useEffect } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import Swimlanes from './Swimlanes';
import Popup from './Popup';

/*
Home page that renders the swimlanes for the Boats. It sorts the boats into their swimlanes and allows them to move easily via a dropdown menu in each card.
*/
function Home(){

  useEffect(() => {
    fetchItems();
  });

  const [boats, setBoats] = useState([]);
  
  //Load all of the boats into state.
  const fetchItems = async () =>{
    const boatsRaw = await fetch("https://is27-comp-backend.azurewebsites.net/boatAPI");
    const boats = await boatsRaw.json();
    setBoats(boats);
    
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

  const handleDelete = (id) =>{
    //console.log(id);
    setPopup({
      show:true,
      id,
    });
    console.log(popup.show);
  }
  //Delete Popup
  const [popup, setPopup] = useState({
    show: false,
    id: null
  })
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
  const handleDeleteFalse = () => {
    console.log('Cancel');
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
      <div className='row'><Link to="/new"className="btn btn-primary">New Boat</Link></div>
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