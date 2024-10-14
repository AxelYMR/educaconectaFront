import './App.css';
import React, {useState, useEffect} from 'react';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './commons/Header';
import Footer from './commons/Footer';
import { useNavigate } from 'react-router-dom';

function RegistrarUD() { //En este componente se definen las variables de nombre.
  const [nombre,setNombre]= useState("");//variable donde se guardara el nombre ingresado en el formulario
  const [apellido,setApellido]= useState(""); //varaible donde se guarda ek apelido
  const [contrasena,setContrasena]= useState(""); //variable donde se guarda la contraseña
  const [correo,setCorreo]= useState(""); // variable donde se guarda el correo
  const [especialidad,setEspecialidad]= useState(""); //variable donde se guarda la especialidad
  const [matricula,setMatricula]= useState(""); //variable donde se guarda la matricula
  const [materia,setMateria]= useState("");  //variable donde se guarda la materia
  const [isValid, setIsValid] = useState(false); //variable para validar los campos
  const [errors, setErrors] = useState({}); //variable para mostrar los errores
  const navigate = useNavigate(); //variable para navegar entre componentes
  const [selectedRole, setSelectedRole] = useState('docente'); //variable para seleccionar el rol del usuario

  const handleRadioChange = (event) => { //funcion para seleccionar el rol del usuario
    setSelectedRole(event.target.id);
  };

  const handleNombreChange = (event) =>{ //funcion para guardar el nombre ingresado en el formulario
    setNombre(event.target.value);
  };

  const handleApellidoChange = (event) =>{ //funcion para guardar el apellido ingresado en el formulario
    setApellido(event.target.value);
  };

  const handleContrasenaChange = (event) =>{ //funcion para guardar la contraseña ingresada en el formulario
    setContrasena(event.target.value);
  };

const handleCorreoChange = (event) =>{  //funcion para guardar el correo ingresado en el formulario
    setCorreo(event.target.value);
  };

  const handleEspecialidadChange = (event) =>{ //funcion para guardar la especialidad ingresada en el formulario
    setEspecialidad(event.target.value);
  };

  const handleMatriculaChange = (event) =>{ //funcion para guardar la matricula ingresada en el formulario
    setMatricula(event.target.value);
  };

  const handleMateriaChange = (event) =>{ //funcion para guardar la materia ingresada en el formulario
    setMateria(event.target.value);
  };

  const validateForm = () => { //funcion para validar los campos del formulario
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

    if (matricula.trim() === "") {
      formErrors.matricula = "La Matricula Es Obligatoria";
    }else if (matricula.length > 20 || matricula.length < 5) {
      formErrors.matricula = "La Matricula Debe Tener Entre 5 y 20 Caracteres";
    }else if(!matricula.startsWith("mat")){
      formErrors.matricula = "Formato Invalido ejemplo: mat123";
    }
    if (materia.trim() === "") {
      formErrors.materia = "La Materia a impartir es obligatoria";
    }else if (materia.length > 40 || materia.length < 5) {
      formErrors.materia = "La materia debe contener entre 5 y 40 caracteres";
    }

    setErrors(formErrors);
    setIsValid(Object.keys(formErrors).length === 0);
  };

  useEffect(() => { //funcion para mandar a validar los campos del formulario
      validateForm();
  }, [nombre, apellido, contrasena, correo,especialidad,materia,matricula,especialidad]);

  const insertarD = () =>{ //Funcion para mandar a llamar al backend para buscar los datos en la base de datos.
    Axios.get("http://localhost:3001/buscarD",{
      params:{
        correo:correo,
        matricula:matricula
      }
    }).then(response =>{ 
      if(response.data.length === null || response.data.length === 0) { // Verifica si la respuesta está vacía.
        Axios.post("http://localhost:3001/createD",{
          nombre:nombre,
          correo:correo,
          apellido:apellido,
          contrasena:contrasena,
          especialidad:especialidad,
          materia:materia,
          matricula:matricula
        }).then(()=>{
          alert("Usuario Registrado con Exito"); //Alerta de usuario Registrado.
          goToLoginD();
        });  
      }else{
        alert("El Usuario Ya Se Encuentra Registrado");
      }
    }).catch(error => {
      console.error(error);
    });
  };
  
  const goToLoginD = () => { //Funcion para navegar al login de docente
    navigate('/loginD');
  };

  const goToRegistrarU = () => { //Funcion para navegar al registro de usuario
    navigate('/registrarU');
  };
  
  const handleSubmit = () => { //Funcion para mandar a llamar a la funcion de insertar datos
    if(isValid) {
      insertarD();
    }else{
      if(correo.trim() === "" || nombre.trim() === ""|| apellido.trim() === "" || contrasena.trim() === "" || especialidad.trim() === "" || matricula.trim() === "" || materia.trim() === ""){
        alert("Uno O mas Campos Vacios");
      }else if(errors.contrasena){
        alert(errors.contrasena);
      }else{
        alert("Campos Incorrectos, verifique los campos");
      }
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
        <div>
          {errors.matricula && <div className="alertas">*{errors.matricula}</div>}
          <div className="input-group mb-3">
            <span className="input-group-text">Matricula de Docente:</span>
            <input 
              type="text" 
              value={matricula}
              onChange={handleMatriculaChange}
              placeholder="Ingrese su Matricula de Docente"
              className="form-control"
              aria-label="Username" 
              aria-describedby="basic-addon1"/>
          </div>
          {errors.materia && <div className="alertas">*{errors.materia}</div>}
          <div className="input-group mb-3">
            <span className="input-group-text">Materia:</span>
            <input 
              type="text" 
              value={materia}
              onChange={handleMateriaChange}
              placeholder="Ingrese su Materia a Impartir"
              className="form-control"
              aria-label="Username" 
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
        {selectedRole === 'alumno' && goToRegistrarU()}
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

export default RegistrarUD;