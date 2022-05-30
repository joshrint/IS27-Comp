import React, { useState, useEffect } from 'react';
import './stylesheets/App.css';
import Swimlanes from './Swimlanes';
import Popup from './Popup';
import NewBoat from './NewBoat';
import Header from './Header';

/*
Home page that renders the swimlanes for the Boats. It sorts the boats into their swimlanes and allows them to move easily via a dropdown menu in each card.
*/
function Home(){
  //All state items
  const [boats, setBoats] = useState([]);
  const [guides, setGuides] = useState([]);
  //Delete Popup to confirm the press of the delete button.
  const [popup, setPopup] = useState({
    show: false,
    id: null
  });
  //New boat pop-up
  const [showNewBoat, setShowNewBoat] = useState({
    show: false
  });

  useEffect(() => {
    fetchItems();
  },[boats]);

  //Load all of the boats into state.
  const fetchItems = async () =>{
    const boatsRaw = await fetch('https://is27-comp-backend.azurewebsites.net/boatAPI');
    const boats = await boatsRaw.json();
    setBoats(boats);
    const guidesRaw = await fetch('https://is27-comp-backend.azurewebsites.net/guidesAPI');
    const guides = await guidesRaw.json();
    setGuides(guides);  
  };

  // Gets the change from the dropdown and updates the backend with the swimlane change.
  const handleChange = (event, id) =>{
    let swimlaneId = event.target.value;
    let tempBoats = boats;
    //Loop over temp state to make the change locally.
    for(let i = 0; i < tempBoats.length; i ++){
      if(tempBoats[i].id === id){
        tempBoats[i].swimlaneID = swimlaneId;
      }
    }
    setBoats(tempBoats);

    const reqOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({id: id, swimlaneID: swimlaneId})
    };
    fetch('https://is27-comp-backend.azurewebsites.net/boatAPI/' + id, reqOptions);
  };

 
  //Open the New Boat page when clicked
  const openNewBoat = () =>{
    setShowNewBoat({show:true});
  };
  const closeNewBoat = () =>{
    setShowNewBoat({show:false});
  };
  //Lazy Load to add a new boat to ease the fetch request.
  const addNewBoat = (newBoat) => {
    let tempBoats = [ 
      ...boats, {
        id: boats[boats.length -1 ].id + 1,
        swimlaneID: 0,
        boatName: newBoat.boatName,
        guideName: newBoat.guideName
      }
    ];
    setBoats(tempBoats);
  };

  //Cause a popup when delete is pressed to help prevent accidental deletions from the board.
  const handleDelete = (id) =>{
    setPopup({
      show:true,
      id,
    });
  };

  //If delete is true (confirmed in popup) send DELETE reqest
  const handleDeleteTrue = () =>{
    //Remove from state to ease the number of fetch calls on the API
    if (popup.show && popup.id) {
      let tempBoats = boats;
      for (let i = 0; i < tempBoats.length; i ++){
        if(parseInt(tempBoats[i].id) === parseInt(popup.id)){
          tempBoats.splice(i, 1);
        }
      } 
      setBoats(tempBoats);
      const reqOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      };
      //send the delete to the API
      fetch('https://is27-comp-backend.azurewebsites.net/boatAPI/' + popup.id, reqOptions);
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
    <> 
      <Header openNewBoat={openNewBoat} /> 
      <div className="container">
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
        
        {showNewBoat.show && (
          <NewBoat 
            showNewBoat={showNewBoat}
            closeNewBoat={closeNewBoat}
            addNewBoat={addNewBoat}
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
    </>
  );
}

export default Home;