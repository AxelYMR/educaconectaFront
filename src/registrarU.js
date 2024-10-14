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
  const [correo,setCorreo]= useState("");//variable donde se guarda la correo
  const [especialidad,setEspecialidad]= useState(""); //variable donde se guarda la especialidad
  const [isValid, setIsValid] = useState(false); //esta variable determinara si el formulario es valido o no.
  const [errors, setErrors] = useState({}); //Aqui se guardan los errores en los formularios 
  const navigate = useNavigate(); // se usa para navegar a diferentes paginas
  const [selectedRole, setSelectedRole] = useState('alumno'); // el rol seleccionado, si es alumno o docente.

  const handleRadioChange = (event) => { // cambios en el valor del rol elegido entre alumno y docente.
    setSelectedRole(event.target.id);
  };

  const handleNombreChange = (event) =>{  //actualiza el valor del nombre
    setNombre(event.target.value);
  };

  const handleApellidoChange = (event) =>{ //actualiza el valor del apellido
    setApellido(event.target.value);
  };

  const handleContrasenaChange = (event) =>{ //actaliza el valor de la contraseña
    setContrasena(event.target.value);
  };

  const handleCorreoChange = (event) =>{ //actualiza el valor del correo
    setCorreo(event.target.value);
  };

  const handleEspecialidadChange = (event) =>{ //actualiza el valor de la Especialidad
    setEspecialidad(event.target.value);
  };

  const validateForm = () => {//validar el formulario y crear los errores de cada campo
    let formErrors = {};
    if (nombre.trim() === "") { //validar que el nombre no este vacio
      formErrors.nombre = "El nombre es obligatorio";
    } else if (nombre.length > 40) { //validar que el nombre no sea mayor a 40 caracteres
      formErrors.nombre= "El nombre no puede tener mas de 40 Caracteres";
    }else if (/\d/.test(nombre)) { // validar que el nombre no contenga números
      formErrors.nombre = "El nombre no puede contener números";
    }

    if (apellido.trim() === "") { //validar que el apellido no este vacio
      formErrors.apellido = "El Apellido Es Obligatorio";
    } else if (apellido.length > 50) { //validar que el apellido no sea mayor a 50 caracteres
      formErrors.apellido= "El Apellido no puede tener mas de 50 caracteres";
    }else if (/\d/.test(apellido)) { // validar que el nombre no contenga números
      formErrors.apellido = "El Apellido No Puede Contener Números";
    }

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
    
    if (especialidad.trim() === "") {
        formErrors.especialidad = "Selecciona Tu Especialidad";
    }

    setErrors(formErrors);
    setIsValid(Object.keys(formErrors).length === 0);
  };
  
  useEffect(() => { //se utiliza para enviar los datos del formulario a validacion
    validateForm();
  },[nombre, apellido, contrasena, correo,especialidad,especialidad]);

  const insertar = () =>{ //Funcion para mandar a llamar al backend para buscar los datos en la base de datos.
    Axios.get("http://localhost:3001/buscarU",{
      params:{
        nombre:nombre,
        correo:correo,
        apellido:apellido,
        contrasena:contrasena,
        especialidad:especialidad
      }
      }).then(response =>{ 
        if (response.data.length === 0 || response.data.length === null) { // Verifica si la respuesta está vacía.
          Axios.post("http://localhost:3001/createU",{
            nombre:nombre,
            correo:correo,
            apellido:apellido,
            contrasena:contrasena,
            especialidad:especialidad
          }).then(()=>{
            alert("Usuario Registrado con Exito"); //Alerta de usuario Registrado.
            goToLoginU();
          });  
        }else{
          alert("El Usuario Ya Se Encuentra Registrado");
        }
      }).catch(error => {
        console.error(error);
      });
  }

  const goToLoginU = () => { //ir a LoginU
      navigate('/');
  };

  const goToRegistrarUD = () => { //ir a RegistrarUD
    navigate('/registrarUD');
  };
  
  const handleSubmit = () => { //Validar si el formulario es valido y mandar a llamar a la funcion insertar
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
        <span className="input-group-text">Especialidad:</span>
        <select 
          value={especialidad} 
          onChange={handleEspecialidadChange} 
          className="form-control"
          aria-label="Especialidad"
          aria-describedby="basic-addon1"
        >
          <option value="">Seleccionar</option>
          <option value="especialidad1">especialidad1</option>
          <option value="especialidad2">especialidad2</option>
        </select>
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