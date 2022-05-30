import React from 'react';
import './stylesheets/header.css';

export default function Header({openNewBoat}) {
  return (
    <>
      <nav className='navbar navbar-light bg-light'>
        <h1>Fishfry Tours</h1>
        <button className="btn btn-outline-primary" onClick={openNewBoat}>New Boat</button> 
      </nav>
    </>
  );
}
