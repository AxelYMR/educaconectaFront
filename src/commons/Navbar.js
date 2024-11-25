import React from 'react';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    return (
    <div className="Navbarcontainer container-fluid fixed-top">
         <nav className="navbar navbar-expand-lg">
      <div className="container">
        
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active text-white" aria-current="page" href="http://localhost:3000/home">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white Seleccionado" href="http://localhost:3000/Perfil">Gestionar Perfil</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    </div>
    );
}

export default Navbar;