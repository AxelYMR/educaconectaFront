import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

const Footer = () => {
    return (
        <div>
        <footer className="bg-dark text-white text-center py-3 mt-auto">
          <div className="container">
            <p>&copy;Educaconecta</p>
            <p>
              <a href="/privacy" className="text-white mx-2">Política de Privacidad</a> | 
              <a href="/terms" className="text-white mx-2">Términos y Condiciones</a>
            </p>
          </div>
      </footer>
      </div>
    );
}

export default Footer;