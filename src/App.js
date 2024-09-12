import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegistrarU from './registrarU';
import LoginU from './screens/loginU';

function App() { //En este componente se definen las variables.
  
  return (
    <Router>
      <div>
        <Routes>
          <Route path="" element={<LoginU />} />
          <Route path="/registrarU" element={<RegistrarU />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;