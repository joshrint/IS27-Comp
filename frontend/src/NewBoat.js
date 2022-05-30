import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';

/*
New boat form. The opperator can add a new boat by adding in the name of the boat and setting the guide who is using it.
There is an option of N/A for the guide.
*/
function NewBoat() {

  useEffect(() => {
    fetchItems();
  }, []);
 
  //Setup a default for the boatname to ensure that it is a valid output
  const [boatName, setBoatName] = useState('');
  const [guideName, setGuideName] = useState('');
  //Store the guides for the dropdown in the form.
  const [guides, setGuides] = useState([]);

  //Fetch the guides for the dropdown. In production environment these would be pulled from a database.
  const fetchItems = async ()=>{
    const guidesRaw = await fetch("https://is27-comp-backend.azurewebsites.net/guidesAPI");
    const guides = await guidesRaw.json();
    setGuides(guides);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const newBoat = {boatName, guideName};
    
    fetch('https://is27-comp-backend.azurewebsites.net/boatAPI', {
      method: 'POST',
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify(newBoat)
    }).then(() =>{
      console.log("New Boat Added");
    })
  }

  return (
    <div>
      <h1>New Boat:</h1>
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
        <Link to={'/'} className="btn btn-outline-danger">Back</Link> <button type="submit" className="btn btn-outline-primary">Submit</button>
      </form>
    </div>
  );
}

export default NewBoat;
