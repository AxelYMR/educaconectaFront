import './App.css';
import React, {useState, useEffect} from 'react';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './commons/Header';
import Footer from './commons/Footer';

function RegistrarU() { //En este componente se definen las variables de nombre.
  const [nombre,setNombre]= useState("");//variable donde se guardara el nombre ingresado en el formulario
  const [apellido,setApellido]= useState(""); //varaible donde se guarda ek apelido
  const [contrasenia,setContrasenia]= useState(""); //variable donde se guarda la contraseña
  const [correo,setCorreo]= useState("");
  const [edad,setEdad]= useState("");
  const [nombreF,setNombreF]= useState("");//variable donde se guardara el nombre ingresado en el formulario
  const [apellidoF,setApellidoF]= useState(""); //varaible donde se guarda ek apelido
  const [contraseniaF,setContraseniaF]= useState(""); //variable donde se guarda la contraseña
  const [correoF,setCorreoF]= useState("");
  const [edadF,setEdadF]= useState("");
  const [isValid, setIsValid] = useState(false);

  const handleNombreFChange = (event) =>{
    setNombreF(event.target.value);
  };

  const handleApellidoFChange = (event) =>{
    setApellidoF(event.target.value);
  };

  const handleContraseniaFChange = (event) =>{
    setContraseniaF(event.target.value);
  };

  const handleCorreoFChange = (event) =>{
    setCorreoF(event.target.value);
  };

  const handleEdadFChange = (event) =>{
    setEdadF(event.target.value);
  };

  const validateForm = () => {
    if (nombreF.trim() === "" || apellidoF.trim() === "" || contraseniaF.trim() === "" || correoF.trim() === "" ) {
      setIsValid(false);
      
    } else{
      setIsValid(true);
    }
  };

  useEffect(() => {
    validateForm();
  }, [nombreF, apellidoF, contraseniaF, correoF]);

  const insertar = () =>{ //Funcion para mandar a llamar al backend para insertar los datos en la base de datos.
    Axios.post("http://localhost:3001/createU",{
      nombre:nombre,
      correo:correo,
      apellido:apellido,
      contrasenia:contrasenia,
      edad:edad
    }).then(()=>{
      alert("Usuario Registrado"); //Alerta de Nombre Registrado.
    });
  }

  const validateAndInsert = () => {
    if (!nombre || !apellido || !contrasenia || !correo) {
      alert("Todos los campos deben estar llenos");
      return;
    }
    insertar();
  }
  return (
    <div className="background">
      <div className='navbar navbar-light header-container'> 
        <Header/>
      </div> 
      <div className="container">
        <div className="container"> 
          <div className="card-header h3 text-muted text-center">
            Registrar Usuario:
          </div>
        </div>
        <br/>
        <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Correo:</span>
          <input 
            type="text" 
            value={correoF}
            onChange={handleCorreoFChange}
            placeholder="Ingrese el Correo"
            className="form-control"
            aria-label="Username" 
            aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
          <input 
            type="text" 
            value={nombreF}
            onChange={handleNombreFChange}
            placeholder="Ingrese su Nombre"
            className="form-control"
            aria-label="Username" 
            aria-describedby="basic-addon1"/>
          </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Apellidos:</span>
          <input 
            type="text" 
            value={apellidoF}
            onChange={handleApellidoFChange}
            placeholder="Ingrese su Apellido"
            className="form-control"
            aria-label="Username" 
            aria-describedby="basic-addon1"/>
          </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Contraseña:</span>
          <input 
            type="password" 
            value={contraseniaF}
            onChange={handleContraseniaFChange}
            placeholder="Ingrese su Contraseña"
            className="form-control"
            aria-label="Password" 
            aria-describedby="basic-addon1"/>
          </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Edad:</span>
          <input 
            type="number" 
            value={edadF}
            onChange={handleEdadFChange}
            placeholder="Ingrese su edad"
            className="form-control"
            aria-label="Age" 
            aria-describedby="basic-addon1"/>
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
        <div className="container text-center">
          {  
            <button className='btn btn-primary' onClick={validateAndInsert}>CREAR USUARIO</button>
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

export default RegistrarU;