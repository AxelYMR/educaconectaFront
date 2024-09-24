import './App.css';
import React, {useState, useEffect} from 'react';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './commons/Header';
import Footer from './commons/Footer';
import { useNavigate } from 'react-router-dom';


function RegistrarU() { //En este componente se definen las variables de nombre.
  const [nombre,setNombre]= useState("");//variable donde se guardara el nombre ingresado en el formulario
  const [apellido,setApellido]= useState(""); //varaible donde se guarda ek apelido
  const [contrasena,setContrasena]= useState(""); //variable donde se guarda la contraseña
  const [correo,setCorreo]= useState("");
  const [especialidad,setEspecialidad]= useState("");
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
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

  const handleContrasenaChange = (event) =>{
    setContrasena(event.target.value);
  };

  const handleCorreoChange = (event) =>{
    setCorreo(event.target.value);
  };

  const handleEspecialidadChange = (event) =>{
    setEspecialidad(event.target.value);
  };

  const validateForm = () => {
    let formErrors = {};
    if (nombre.trim() === "") {
      formErrors.nombre = "El nombre es obligatorio";
    } else if (nombre.length > 40) {
      formErrors.nombre= "El nombre es invalido";
    }

    if (apellido.trim() === "") {
      formErrors.apellido = "El Apellido es obligatorio";
    } else if (apellido.length > 50) {
      formErrors.nombre= "El Apellido es invalido";
    }
   
    if (contrasena.length < 8 || contrasena.length > 20) {
      formErrors.contrasena = "La contraseña debe tener al menos 8 caracteres y menos de 20";
    }
    
    if (correo.trim() === "" || correo.length < 11 || correo.length > 50) {
      formErrors.correo = "El correo es obligatorio";
    } else if (!correo.endsWith("@gmail.com") || correo.length > 50) {
      formErrors.correo = "El formato de correo es invalido(ejemplo@gmail.com)";
    }else if (correo.length > 50) {
        formErrors.correo = "El formato de correo es invalido";
    }
    
    if (especialidad.trim() === "") {
        formErrors.especialidad = "la especialidad es obligatoria";
    }else if (correo.length > 50) {
          formErrors.correo = "El formato de especialidad es invalido";
    }
  
    setErrors(formErrors);
    setIsValid(Object.keys(formErrors).length === 0);
  };

  useEffect(() => {
      validateForm();
  }, [nombre, apellido, contrasena, correo,especialidad,especialidad]);

  
  const insertar = () =>{ //Funcion para mandar a llamar al backend para insertar los datos en la base de datos.
    Axios.post("http://localhost:3001/createU",{
      nombre:nombre,
      correo:correo,
      apellido:apellido,
      contrasena:contrasena,
      especialidad:especialidad
    }).then(()=>{
      alert("Registrado con Exito"); //Alerta de usuario Registrado.
      goToLoginU();
    });
  }

  const goToLoginU = () => {
      navigate('/');
  };

  const goToRegistrarUD = () => {
    navigate('/registrarUD');
  };
  
  const handleSubmit = () => {
    if(isValid) {
        insertar();
    }else{
      alert("Datos Incorrectos, Por Favor Revise los Campos");
    }
  };
  
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
          {errors.correo && <div className="alertas">*{errors.correo}</div>}
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
            {errors.contrasena && <div className="alertas">*{errors.contrasena}</div>}
          </div>
          <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Contraseña:</span>
          <input 
            type="password" 
            value={contrasena}
            onChange={handleContrasenaChange}
            placeholder="Ingrese su Contraseña"
            className="form-control"
            aria-label="Password" 
            aria-describedby="basic-addon1"/>
            
          </div>
          {errors.especialidad && <div className="alertas">*{errors.especialidad}</div>}
          <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Especialidad:</span>
          <input 
            type="text" 
            value={especialidad}
            onChange={handleEspecialidadChange}
            placeholder="Ingrese su Contraseña"
            className="form-control"
            aria-label="Especilaidad" 
            aria-describedby="basic-addon1"/>         
          </div>  
        </div>
      <div className="container">
        <div class="form-check">
          <input class="form-check-input" type="radio" name='alumno' id='alumno' checked={selectedRole==='alumno' } 
           onChange={handleRadioChange}/>
          <label class="form-check-label" for='alumno'>
            Alumno.
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name='docente' id='docente' checked={selectedRole==='docente'}
           onChange={handleRadioChange}/>
          <label class="form-check-label" for='docente'>
            Docente.
          </label>
        </div>
      </div>
      <br/>
      <div className="container">
        {selectedRole === 'docente' && 
        goToRegistrarUD()
        }
      </div>
        <div className="container text-center">
          {  
            <button className='btn btn-primary' onClick={handleSubmit}>CREAR USUARIO</button>
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