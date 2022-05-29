import React, { useState, useEffect } from 'react';
import './App.css';
import {Link} from 'react-router-dom';


function Home(){

  useEffect(() => {
    fetchItems();
  }, []);

  const [boats, setBoats] = useState([]);
  const [guides, setGuides] = useState([]);
  const [swimlanes, setSwimlanes] = useState([]);

  const fetchItems = async () =>{
    const boatsRaw = await fetch("https://is27-comp-backend.azurewebsites.net/boatAPI");
    const boats = await boatsRaw.json();
    console.log(boats);
    setBoats(boats);
    const guidesRaw = await fetch("https://is27-comp-backend.azurewebsites.net/boatAPI");
    const guides = await guidesRaw.json();
    setGuides(guides);
    const swimlanesRaw = await fetch("https://is27-comp-backend.azurewebsites.net/boatAPI");
    const swimlanes = await swimlanesRaw.json();
    setSwimlanes(swimlanes);
  }

return(
      
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <h2>Docked</h2>
            {boats.map(boat => (
              boat.swimlaneID === 0
              ?(<div className="card" key={boat.id}>
                  <ul className='list-group list-group-flush'>
                    <li className='list-group-item'><h5>{boat.boatName}</h5></li>
                    <li className='list-group-item'>Guide: {boat.guideName}</li>
                    <li className='list-group-item'><Link className='btn btn-primary' to={`/edit/${boat.boatName}`}>Edit</Link></li>
                  </ul>
                </div>
              )
              : null
            ))}
        </div>
        <div className="col-sm">
          <h2>Outbound to Sea</h2>
          {boats.map(boat => (
              boat.swimlaneID === 1
              ?(<div className="card" key={boat.id}>
                  <ul className='list-group list-group-flush'>
                    <li className='list-group-item'><h5>{boat.boatName}</h5></li>
                    <li className='list-group-item'>Guide: {boat.guideName}</li>
                    <li className='list-group-item'><Link className='btn btn-primary' to={`/edit/${boat.boatName}`}>Edit</Link></li>
                  </ul>
                </div>
              )
              : null
            ))}
        </div>
        <div className="col-sm">
          <h2>Inbound to Harbor</h2>
          {boats.map(boat => (
              boat.swimlaneID === 2
              ?(<div className="card" key={boat.id}>
                  <ul className='list-group list-group-flush'>
                    <li className='list-group-item'><h5>{boat.boatName}</h5></li>
                    <li className='list-group-item'>Guide: {boat.guideName}</li>
                    <li className='list-group-item'><Link className='btn btn-primary' to={`/edit/${boat.boatName}`}>Edit</Link></li>
                  </ul>
                </div>
              )
              : null
            ))}
        </div>
        <div className="col-sm">
          <h2>Maintenance</h2>
          {boats.map(boat => (
              boat.swimlaneID === 3
              ?(<div className="card" key={boat.id}>
                  <ul className='list-group list-group-flush'>
                    <li className='list-group-item'><h5>{boat.boatName}</h5></li>
                    <li className='list-group-item'>Guide: {boat.guideName}</li>
                    <li className='list-group-item'><Link className='btn btn-primary' to={`/edit/${boat.boatName}`}>Edit</Link></li>
                  </ul>
                </div>
              )
              : null
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;