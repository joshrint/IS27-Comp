import React from 'react'

export default function Swimlanes({boats, handleChange, handleDelete}) {
  //Component for displaying the cards in their respective swimlanes.
  return (
    <div>
        {boats.map(boat => (<div className="card" key={boat.id}>
            
                <ul className='list-group list-group-flush'>
                <li className='list-group-item'><h5>Boat {boat.id}: {boat.boatName}</h5></li>
                <li className='list-group-item'>Guide: {boat.guideName}</li>
                <li className='list-group-item'>
                    <select className='form-control' id='swimlaneID' onChange={(e) => handleChange(e, boat.id)} value={boat.swimlaneID}>
                        <option value="0" >Docked</option>
                        <option value="1">Outbound to Sea</option>
                        <option value="2">Inbound to Harbor</option>
                        <option value="3">Maintenance</option>
                    </select>
                </li>
                <li className='list-group-item' id='delete-button'>
                  <button className='btn btn-outline-danger btn-sm' onClick={() => handleDelete(boat.id)}>Delete</button>
                </li>
                </ul>
            </div>
        ))}
    </div>
  )
}
