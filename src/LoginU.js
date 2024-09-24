import React from 'react';
import './LoginU.css';
import { useState, useEffect } from "react";	
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './commons/Header';
import Footer from './commons/Footer';
import { useNavigate } from 'react-router-dom';


function LoginU() { //En este componente se definen las variables.
  const [contrasena,setContrasena]= useState(""); //variable donde se guardara la contraseña ingresada en el formulario
  const [correo,setCorreo]= useState(""); //variable donde se guardara el correo ingresado en el formulario
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCorreoChange = (event) =>{
    setCorreo(event.target.value);
  };

  const handleContrasenaChange = (event) =>{
    setContrasena(event.target.value);
  };

  const validateForm = () => {
    let formErrors = {};
    if (contrasena.length < 8 || contrasena.length > 20) {
      formErrors.contrasena = "La contraseña debe tener al menos 8 caracteres y menos de 20";
    }
    
    if (correo.trim() === "" || correo.length < 11 || correo.length > 50) {
      formErrors.correo = "El correo es obligatorio";
    } else if (!correo.endsWith("@gmail.com") || correo.length > 50) {
      formErrors.correo = "El correo es invalido";
    }
    setErrors(formErrors);
    setIsValid(Object.keys(formErrors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [contrasena, correo]);

  const buscar = () =>{ //Funcion para mandar a llamar al backend para buscar los datos en la base de datos.
    if (!isValid){
      alert("Datos incorrectos, por favor revise los campos");
    } 
    else{
      Axios.get("http://localhost:3001/selectU",{
        params:{
          correo:correo, //Se mandan los datos ingresados en el formulario.
          contrasena:contrasena
        }
        }).then(response =>{ //Se manda un mensaje de alerta.
        if (response.data.length === 0) { // Verifica si la respuesta está vacía.
          alert("las Credenciales no se encontraron");
        } else {
          goToHome();
        }
      }).catch(error => {
        console.error(error);
      });
    }
  }

    const goToRegistrarU = () => {
      navigate('/registrarU');
    };
    
    const goToHome = () => {
      navigate('/home');
    };

    const goToLoginD = () => {
      navigate('/loginD');
    };

  return (

    <div className="background">
      <div className='navbar navbar-light header-container'> 
        <Header/>
      </div>
      <br/> 
      <div className="container">
        <div className="container"> 
          <div className="card-header h4 text-muted text-center">
            Iniciar Sesion:
          </div>
        </div>
        <br/>
        <div className="container text-center">
            {  
              <button className='btn btn-primary'>Alumno</button>
              
            }
            {  
              <button className='btn btn-primary' onClick={goToLoginD}>Docentes</button>
            }
        </div>
        <br/>
        <div className="card-body">
        {errors.correo && <div className="alertas">*{errors.correo}</div>}
        <div className="input-group mb-3">
          <span className="input-group-text" id="correo">Correo:</span>
          <input type="text" value={correo}
            onChange={(event) => {
              handleCorreoChange(event);
            }}
          className="form-control" placeholder="Ingrese su Correo" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
          {errors.contrasena && <div className="alertas">*{errors.contrasena}</div>}
        <div className="input-group mb-3">
          <span className="input-group-text" id="contrasena">Contraseña:</span>
          <input type="password" value={contrasena}
            onChange={(event) => {
              handleContrasenaChange(event);
            }}
          className="form-control" placeholder="La contraseña debe incluir almenos 8 caracteres" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>                 
        </div>
        <div className="container text-center">
            {  
                <button className='btn btn-primary' onClick={buscar}>Log In</button>
            }
            {  
                <button className='btn btn-primary' onClick={goToRegistrarU}>Crear Usuario</button>
            }
        </div>
    </div>
      <br/>
      <br/>
      <br/>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default LoginU;