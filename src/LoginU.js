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
  const navigate = useNavigate(); //variable para navegar entre las paginas.
  const [isValid, setIsValid] = useState(false); //variable para validar los campos del formulario.
  const [errors, setErrors] = useState({}); //variable para mostrar los errores en el formulario.

  const handleCorreoChange = (event) =>{ //Funcion para guardar el correo ingresado en el formulario.
    setCorreo(event.target.value);
  };

  const handleContrasenaChange = (event) =>{ //Funcion para guardar la contraseña ingresada en el formulario.
    setContrasena(event.target.value);
  };

  const validateForm = () => { //Funcion para validar los campos del formulario.
    let formErrors = {};
    if (contrasena.length < 8 || contrasena.length > 20) {
      formErrors.contrasena = "La Contraseña Debe Tener al Menos 8 Caracteres y Menos De 20";
    }
    
    if (correo.trim() === "") {
      formErrors.correo = "El Correo Es obligatorio";
    } else if (!correo.endsWith("@gmail.com") || correo.length > 50) {
      formErrors.correo = "El Formato de Correo es Invalido(ejemplo@gmail.com)";
    }else if (correo.length > 50 || correo.length < 11) {
        formErrors.correo = "El Correo debe contener mas de 11 y menos de 50 caracteres";
    }
    
    setErrors(formErrors);
    setIsValid(Object.keys(formErrors).length === 0);
  };

  useEffect(() => { //Funcion para validar los campos del formulario.
    validateForm(); 
  }, [contrasena, correo]);

  const buscar = () =>{ //Funcion para mandar a llamar al backend para buscar los datos en la base de datos.
    if(correo.trim() === "" || contrasena.trim() === ""){ //Verifica si los campos estan vacios.
      alert("Uno o mas Campos Vacios, por favor revise los campos");

    }else if(!isValid){
      alert("Datos incorrectos, por favor revise los campos");
    } 
    else{
      Axios.get("http://localhost:3001/seEncuentraA",{
        params:{
          correo:correo //Se mandan los datos ingresados en el formulario.
        }
        }).then(response =>{ //Se manda un mensaje de alerta.
          if (response.data.length === 0) { // Verifica si la respuesta está vacía.
            alert("Usuario No Encontrado");
          } else {
            Axios.get("http://localhost:3001/selectA",{
              params:{
                correo:correo, //Se mandan los datos ingresados en el formulario.
                contrasena:contrasena
              }
              }).then(response =>{ //Se manda un mensaje de alerta.
                if (response.data.length === 0 || response.data.length === 0) { // Verifica si la respuesta está vacía.
                  alert("La Contraseña es Incorrecta");
                } else {
                  goToHome();
                }
              }).catch(error => {
                console.error(error);
              });          
            }
        }).catch(error => {
          console.error(error);
        });
    }
  }

    const goToRegistrarU = () => { //Funcion para mandar a llamar a la pagina de registro de usuario.
      navigate('/registrarU');
    };
    
    const goToHome = () => { //Funcion para mandar a llamar a la pagina de inicio.
      navigate('/home');
    };

    const goToLoginD = () => { //Funcion para mandar a llamar a la pagina de login.
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
                <button className='btn btn-primary' onClick={buscar}>Iniciar Sesion</button>
            }
            {  
                <button className='btn btn-primary' onClick={goToRegistrarU}>Registrarse</button>
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