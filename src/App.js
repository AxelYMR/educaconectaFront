import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrarU from './RegistrarU.js';
import RegistrarUD from './RegistrarUD.js';
import LoginU from './LoginU.js';
import LoginD from './LoginD.js';
import Home from './Home.js';

function App() { //En este componente se definen las rutas de la aplicacion
  
  return (
    <Router>
      <div>
        <Routes>
          <Route path="" element={<LoginU />} />
          <Route path="/RegistrarU" element={<RegistrarU />} />
          <Route path="/RegistrarUD" element={<RegistrarUD />} /> 
          <Route path="/loginD" element={<LoginD />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;