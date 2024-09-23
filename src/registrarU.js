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
  const [matricula,setMatricula]= useState("");
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedRole, setSelectedRole] = useState('alumno');

  const handleRadioChange = (event) => {
    setSelectedRole(event.target.id);
  };

  const handleNombreChange = (event) =>{
    setNombre(event.target.value);
  };

  const handleApellidoChange = (event) =>{
    setApellido(event.target.value);
  };

  const handleContraseniaChange = (event) =>{
    setContrasenia(event.target.value);
  };

  const handleCorreoChange = (event) =>{
    setCorreo(event.target.value);
  };

  const handleMatriculaChange = (event) =>{
    setMatricula(event.target.value);
  };


  const DocenteComponent = () => {
    return <div>
          
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Matricula de Docente:</span>
            <input 
              type="text" 
              placeholder="Ingrese su Matricula"
              className="form-control"
              aria-label="Username" 
              aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Especialidad:</span>
            <input 
              type="text" 
              placeholder="Ingrese su especialidad"
              className="form-control"
              aria-label="Username" 
              aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Materia:</span>
            <input 
              type="text" 
              placeholder="Ingrese la Materia"
              className="form-control"
              aria-label="Username" 
              aria-describedby="basic-addon1"/>
          </div>
    </div>;
  };

  const validateForm = () => {
    let formErrors = {};
    if (nombre.trim() === "") formErrors.nombre = "El nombre es obligatorio";
    if (apellido.trim() === "") formErrors.apellido = "El apellido es obligatorio";
    if (contrasenia.trim() === "") formErrors.contrasenia = "La contraseña es obligatoria";
    if (correo.trim() === "") formErrors.correo = "El correo es obligatorio";
    if (matricula.trim() === "") formErrors.correo = "la matricula es obligatoria";

    setErrors(formErrors);
    setIsValid(Object.keys(formErrors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [nombre, apellido, contrasenia, correo, matricula]);

  const insertar = () =>{ //Funcion para mandar a llamar al backend para insertar los datos en la base de datos.
    Axios.post("http://localhost:3001/createU",{
      nombre:nombre,
      correo:correo,
      apellido:apellido,
      contrasenia:contrasenia,
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
          {errors.nombre && <div className="alertas">*{errors.correo}</div>}
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Correo:</span>
          <input 
            type="text" 
            value={correo}
            onChange={handleCorreoChange}
            placeholder="Ingrese el Correo"
            className="form-control"
            aria-label="Username" 
            aria-describedby="basic-addon1"/>
        </div>
          {errors.nombre && <div className="alertas">*{errors.nombre}</div>}
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
          <input 
            type="text" 
            value={nombre}
            onChange={handleNombreChange}
            placeholder="Ingrese su Nombre"
            className="form-control"
            aria-label="Username" 
            aria-describedby="basic-addon1"/>
          </div>
          <div className="alertas">  
            {errors.apellido && <div className="alertas">*{errors.apellido}</div>}
          </div>
          <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Apellidos:</span>
          <input 
            type="text" 
            value={apellido}
            onChange={handleApellidoChange}
            placeholder="Ingrese su Apellido"
            className="form-control"
            aria-label="Username" 
            aria-describedby="basic-addon1"/>
          </div>
          <div className="alertas">  
            {errors.contrasenia && <div className="alertas">*{errors.contrasenia}</div>}
          </div>
          <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Contraseña:</span>
          <input 
            type="password" 
            value={contrasenia}
            onChange={handleContraseniaChange}
            placeholder="Ingrese su Contraseña"
            className="form-control"
            aria-label="Password" 
            aria-describedby="basic-addon1"/>
            
          </div>  
        </div>
      <div className="container">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="alumno" id="alumno" checked={selectedRole==="alumno" } 
           onChange={handleRadioChange}/>
          <label class="form-check-label" for="alumno">
            Alumno.
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="docente" id="docente" checked={selectedRole==="docente"}
           onChange={handleRadioChange}/>
          <label class="form-check-label" for="docente">
            Docente.
          </label>
        </div>
      </div>
      <br/>
      <div className="container">
        {selectedRole === 'docente' && <DocenteComponent />}
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