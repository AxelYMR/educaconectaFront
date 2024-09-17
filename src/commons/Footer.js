import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./Footer.css";

const Footer = () => {
    return (
        <div>
        <footer className="bg-dark text-white text-center py-3 mt-auto">
          <div className="container">
            <p>&copy;Educaconecta</p>
            <p>
              <p className="text-white mx-2">Online Training</p> 
            </p>
          </div>
      </footer>
      </div>
    );
}

export default Footer;