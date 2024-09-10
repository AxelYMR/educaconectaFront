import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './commons/Header';
import Footer from './commons/Footer';

function App() { //En este componente se definen las variables.
  const [nombre,setNombre]= useState("");//variable donde se guardara el nombre ingresado en el formulario
  const [apellido,setApellido]= useState(""); //variable donde se guardara el apellido ingresado en el formulario
  const [contrasenia,setContrasenia]= useState(""); //variable donde se guardara la contraseña ingresada en el formulario
  const [correo,setCorreo]= useState(); //variable donde se guardara el correo ingresado en el formulario

  const insertar = () =>{ //Funcion para mandar a llamar al backend para insertar los datos en la base de datos.
    Axios.post("http://localhost:3001/createU",{
      correo:correo, //Se mandan los datos ingresados en el formulario.
      nombre:nombre,  
      apellido:apellido,
      contrasenia:contrasenia
    }).then(()=>{ //Se manda un mensaje de alerta.
      alert("Usuario Registrado"); //Alerta de Usuario Registrado.
    });
  }
  
  return (
    <div className="background">
      <div className='navbar navbar-light header-container'> 
        <Header/>
      </div> 
      <div className="container">
        <div className="container"> 
          <div className="card-header h4 text-muted text-center">
            Registrar Usuario:
          </div>
        </div>
        <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Correo:</span>
          <input type="text" value={nombre}
            onChange={(event) => {
              setNombre(event.target.value);
            }}
          className="form-control" placeholder="Ingrese su Correo" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
          <input type="text" value={correo}
            onChange={(event) => {
              setCorreo(event.target.value);
            }} 
          className="form-control" placeholder="Ingrese Su Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Apellidos:</span>
          <input type="text" value={apellido}
            onChange={(event) => {
              setApellido(event.target.value);
            }} 
          className="form-control" placeholder="Ingrese Su apellido" aria-label="Username" aria-describedby="basic-addon1"/>
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
        <div className="container">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked/>
        <label class="form-check-label" for="flexRadioDefault1">
          Alumno.
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
        <label class="form-check-label" for="flexRadioDefault2">
          Docente.
        </label>
      </div>
      </div>
          <div className="container btn">
            {  
              <button className='btn btn-success' onClick={insertar}>CREAR USUARIO</button>
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

export default App;