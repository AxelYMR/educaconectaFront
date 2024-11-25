import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from './GlobalState';
import Axios from "axios";
import './LoginU.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './commons/Footer';
import Navbar from './commons/Navbar';

function Home() { //En este componente se definen las variables.
  const { setUserData } = useContext(GlobalContext);
  const { userData } = useContext(GlobalContext);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [setUserData]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);


  return (
    <div className="background">
      <div className="Navegacion"> 
        <Navbar/>
      </div>
      <br/>
      <br/>
      <br/>
      <h1>Bienvenido, {userData ? userData[0].nombre : 'No disponible'}
                      {userData ? " " + userData[0].apellidos : 'No disponible'}
      </h1>
      <br/> 
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default Home;