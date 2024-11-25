import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrarU from './RegistrarU.js';
import RegistrarUD from './RegistrarUD.js';
import { GlobalProvider } from './GlobalState';
import LoginU from './LoginU.js';
import LoginD from './LoginD.js';
import Home from './Home.js';
import Perfil from './Perfil.js';

function App() { //En este componente se definen las rutas de la aplicacion
  
  return (
      <Router>
        <div>
          <Routes>
            <Route path="" element={<LoginU />} />
            <Route path="/RegistrarU" element={<RegistrarU />} />
            <Route path="/RegistrarUD" element={<RegistrarUD />} /> 
            <Route path="/LoginD" element={<LoginD />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Perfil" element={<Perfil />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;