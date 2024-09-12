import React from 'react';
import './loginU.css';
import { useState } from "react";	
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../commons/Header';
import Footer from '../commons/Footer';
import { useNavigate } from 'react-router-dom';


function LoginU() { //En este componente se definen las variables.
  const [contrasenia,setContrasenia]= useState(""); //variable donde se guardara la contraseña ingresada en el formulario
  const [correo,setCorreo]= useState(""); //variable donde se guardara el correo ingresado en el formulario
  const navigate = useNavigate();

  const buscar = () =>{ //Funcion para mandar a llamar al backend para buscar los datos en la base de datos.
    Axios.post("http://localhost:3001/selectU",{
      correo:correo, //Se mandan los datos ingresados en el formulario.
      contrasenia:contrasenia
    }).then(()=>{ //Se manda un mensaje de alerta.
      alert("Usuario Registrado"); //Alerta de Usuario Registrado.
    });
  }

    const goToRegistrarU = () => {
      navigate('/registrarU');
    };
  
  return (

    <div className="background">
      <div className='navbar navbar-light header-container'> 
        <Header/>
      </div> 
      <div className="container">
        <div className="container"> 
          <div className="card-header h4 text-muted text-center">
            Iniciar Sesion:
          </div>
        </div>
        <br/>
        <div className="container btn">
            {  
              <button className='btn btn-success'>Alumno</button>
              
            }
            {  
              <button className='btn btn-success'>Docentes</button>
            }
        </div>
        <br/>
        <br/>
        <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Correo:</span>
          <input type="text" value={correo}
            onChange={(event) => {
              setCorreo(event.target.value);
            }}
          className="form-control" placeholder="Ingrese su Correo" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Contraseña:</span>
          <input type="password" value={contrasenia}
            onChange={(event) => {
              setContrasenia(event.target.value);
            }} 
          className="form-control" placeholder="La contraseña debe incluir almenos 8 caracteres" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>                 
        </div>
        <div className="container btn">
            {  
                <button className='btn btn-success' onClick={buscar}>Log In</button>
            }
            {  
                <button className='btn btn-success' onClick={goToRegistrarU}>Crear Usuario</button>
            }
        </div>
    </div>
      <br/>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default LoginU;