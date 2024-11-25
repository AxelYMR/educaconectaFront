import React, { useContext } from 'react';
import { GlobalContext } from './GlobalState';
import './LoginU.css';
import { useState, useEffect } from "react";	
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './commons/Header';
import Footer from './commons/Footer';
import { useNavigate } from 'react-router-dom';


function LoginD() { //En este componente se definen las variables.
  const {setUserData} = useContext(GlobalContext);
  const [contrasena,setContrasena]= useState(""); //variable donde se guardara la contraseña ingresada en el formulario
  const [matricula,setMatricula]= useState(""); //variable donde se guardara el correo ingresado en el formulario
  const navigate = useNavigate(); //variable para navegar entre las paginas.
  const [isValid, setIsValid] = useState(false); //variable para validar los campos del formulario.
  const [errors, setErrors] = useState({}); //variable para mostrar los errores en el formulario.

  const handleMatriculaChange = (event) =>{ //Funcion para guardar el correo ingresado en el formulario.
    setMatricula(event.target.value);
  };

  const handleContrasenaChange = (event) =>{ //Funcion para guardar la contraseña ingresada en el formulario.
    setContrasena(event.target.value);
  };

  const validateForm = () => { //Funcion para validar los campos del formulario.
    let formErrors = {};
    const matriculaRegex = /^mat\d+$/;
    if (matricula.trim() === "") {
      formErrors.matricula = "La Matricula Es Obligatoria";
  }else if (matricula.length > 20 || matricula.length < 5) {
      formErrors.matricula = "La Matricula Debe Tener Entre 5 y 20 Caracteres";
  }else if(!matriculaRegex.test(matricula)){
      formErrors.matricula = "Formato Invalido ejemplo: mat123";
  }

  if (contrasena.length < 8 || contrasena.length > 20) {
      formErrors.contrasena = "La Contraseña Debe Tener al Menos 8 Caracteres y Menos De 20";
    }
    setErrors(formErrors);
    setIsValid(Object.keys(formErrors).length === 0);
  };

  useEffect(() => { //Funcion para validar los campos del formulario.
    validateForm();
  }, [contrasena, matricula]);

  const buscar = () =>{ //Funcion para mandar a llamar al backend para buscar los datos en la base de datos.
    if(matricula.trim() === "" || contrasena.trim() === ""){ //Verifica si los campos estan vacios.
      alert("Uno o mas Campos Vacios, por favor revise los campos");
    }else if(!isValid){
        alert("Datos incorrectos, por favor revise los campos");
      }else {
      Axios.get("http://localhost:3001/seEncuentraD",{
        params:{
          matricula:matricula //Se mandan los datos ingresados en el formulario.
        }
        }).then(response =>{ //Se manda un mensaje de alerta.
          if (response.data.length === 0) { // Verifica si la respuesta está vacía.
            alert("Usuario No Encontrado");
          } else {
            Axios.get("http://localhost:3001/selectD",{
              params:{
                matricula:matricula, //Se mandan los datos ingresados en el formulario.
                contrasena:contrasena
              }
              }).then(response =>{ //Se manda un mensaje de alerta.
                if (response.data.length === 0) { // Verifica si la respuesta está vacía.
                  alert("La contraseña es incorrecta");
                } else {
                  setUserData(response.data);
                  goToHome();
                }
              }).catch(error => {
                console.error(error);
              });          }
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

    const goToLoginU = () => { //Funcion para mandar a llamar a la pagina de login.
        navigate('/');  
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
              <button className='btn btn-primary' onClick={goToLoginU}>Alumno</button>    
            }
            {  
              <button className='btn btn-primary'>Docentes</button>
            }
        </div>
        <br/>
        <div className="card-body">
        {errors.matricula && <div className="alertas">*{errors.matricula}</div>}
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Matricula:</span>
          <input type="text" value={matricula}
            onChange={(event) => {
              handleMatriculaChange(event);
            }}
          className="form-control" placeholder="Ingrese su Matricula" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
          {errors.contrasena && <div className="alertas">*{errors.contrasena}</div>}
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Contraseña:</span>
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

export default LoginD;