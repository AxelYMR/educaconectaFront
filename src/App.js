import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegistrarU from './RegistrarU.js';
import LoginU from './LoginU.js';

function App() { //En este componente se definen las variables.
  
  return (
    <Router>
      <div>
        <Routes>
          <Route path="" element={<LoginU />} />
          <Route path="/RegistrarU" element={<RegistrarU />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;