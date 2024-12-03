import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from './GlobalState';
import Axios from "axios";
import './LoginU.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './commons/Footer';
import Navbar from './commons/Navbar';
import "./Perfil.css";  
import { useNavigate } from 'react-router-dom';

function Perfil() { //En este componente se definen las variables.
  const [nombre,setNombre]= useState("");//variable donde se guardara el nombre ingresado en el formulario
  const [apellido,setApellido]= useState(""); //varaible donde se guarda ek apelido
  const [contrasena,setContrasena]= useState(""); //variable donde se guarda la contraseña
  const [correo,setCorreo]= useState("");//variable donde se guarda la correo
  const [isValid, setIsValid] = useState(false); //esta variable determinara si el formulario es valido o no.
  const [errors, setErrors] = useState({}); //Aqui se guardan los errores en los formularios 
  const { setUserData } = useContext(GlobalContext);
  const { userData } = useContext(GlobalContext);
  const [matricula, setMatricula]= useState();
  const { globalState, updateGlobalState } = useContext(GlobalContext);
  const [especialidad,setEspecialidad]= useState("");
  const navigate = useNavigate(); //variable para navegar entre las paginas.
  const [isDocente, setIsDocente] = useState(false);

  const [materiasList,setMaterias] = useState([]);

  
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [setUserData]);
  
  useEffect(() => {
    if (userData) {
      setNombre(userData[0].nombre);
      setApellido(userData[0].apellidos);
      setCorreo(userData[0].correo);
      setMatricula(userData[0].matricula);
      setEspecialidad(userData[0].especialidad);
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);
  
  const goToHome = () => { //Funcion para mandar a llamar a la pagina de inicio.
    navigate('/home');
  };
  
  const goToGestionarCurso = () => { //Funcion para mandar a llamar a la pagina de inicio.
    navigate('/GestionarCurso');
  };

  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleApellidoChange = (e) => setApellido(e.target.value);
  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
  }
  const handleContrasenaChange = (e) => setContrasena(e.target.value);

  const handleEspecialidadChange = (e) => setEspecialidad(e.target.value);
  
  

  const validateForm = () => {//validar el formulario y crear los errores de cada campo
    let formErrors = {};
    if (nombre.trim() === "") { //validar que el nombre no este vacio
      formErrors.nombre = "El nombre es obligatorio";
    } else if (nombre.length > 40 || nombre.length < 4) { //validar que el nombre no sea mayor a 40 caracteres
      formErrors.nombre= "El nombre no puede tener mas de 40 Caracteres y menos de 10";
    }else if (/\d/.test(nombre)) { // validar que el nombre no contenga números
      formErrors.nombre = "El nombre no puede contener números";
    }

    if (apellido.trim() === "") { //validar que el apellido no este vacio
      formErrors.apellido = "El Apellido Es Obligatorio";
    } else if (apellido.length > 50 || apellido.length < 4) { //validar que el apellido no sea mayor a 50 caracteres
      formErrors.apellido= "El Apellido no puede tener mas de 50 caracteres y menos de 4";
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

    setErrors(formErrors);
    setIsValid(Object.keys(formErrors).length === 0);
  };

  const getMaterias = () =>{
      Axios.get("http://localhost:3001/seEncuentraD",{ //verifica si el usuario es docente o alumno
        params:{
          matricula:matricula //Se mandan los datos ingresados en el formulario.
        }
        }).then(response =>{ //Se manda un mensaje de alerta.
          if (response.data.length === 0 || response.data.length === null) { // Verifica si la respuesta está vacía(es alumno).
           
            Axios.get("http://localhost:3001/selectMaterias",{
              params:{
                matricula:matricula
              }
            }).then(response=>{
              setMaterias(response.data);
            }).catch(error => {
              console.error('Error en la solicitud:', error);
            });
          }else{
            Axios.get("http://localhost:3001/selectMateriasD",{
              params:{
                matricula:matricula
              }        
            }).then(response=>{
              setMaterias(response.data);
            }).catch(error => {
              console.error('Error en la solicitud:', error);
            });
        }
      });
  }

  const checkIsDocente = () => {
    Axios.get("http://localhost:3001/seEncuentraD", {
      params: {
        matricula:matricula
      }
    }).then(response => {
      if (response.data.length === 0 || response.data.length === null) {
        setIsDocente(false);
      } else {
        setIsDocente(true);
      }
    }).catch(error => {
      console.error('Error en la solicitud:', error);
    });
  };
  
  useEffect(() => { //se utiliza para enviar los datos del formulario a validacion
    getMaterias();
    checkIsDocente();
  });
 
  useEffect(() => { //se utiliza para enviar los datos del formulario a validacion
    validateForm();
  },[nombre, apellido, contrasena, correo]);

  const actualizarDatos = () =>{
    if(isValid){
      Axios.get("http://localhost:3001/seEncuentraD",{
        params:{
          matricula:matricula //Se mandan los datos ingresados en el formulario.
        }
        }).then(response =>{ //Se manda un mensaje de alerta.
          if (response.data.length === 0) { // Verifica si la respuesta está vacía.
            if(correo !== userData[0].correo){
              Axios.get("http://localhost:3001/seEncuentraA",{
                params:{
                  correo:correo
                }
              }).then(response => {
                if(response.data.length !== 0){
                  alert("Correo ya registrado");
                }else{
                  Axios.put("http://localhost:3001/actualizarAlumno",{
                    matricula:matricula,        
                    correo:correo,
                    contrasena:contrasena,
                    nombre:nombre,
                    apellido:apellido
                  }).then(()=>{
                    alert("Datos Actualizados");
                    actualizarContexto();

                  });
                }
              }).catch(error => {
                console.error('Error en la solicitud:', error);
              });
            }else{
              Axios.put("http://localhost:3001/actualizarAlumno",{
                matricula:matricula,        
                correo:correo,
                contrasena:contrasena,
                nombre:nombre,
                apellido:apellido
              }).then(()=>{
                alert("Datos Actualizados");
                actualizarContexto();
                setContrasena("");
              });
            }
          }else{
            Axios.put("http://localhost:3001/actualizarDocente",{
              matricula:matricula,        
              correo:correo,
              contrasena:contrasena,
              nombre:nombre,
              apellido:apellido
            }).then(()=>{
              alert("Datos Actualizados"); 
              actualizarContexto();
              setContrasena("");
            });
        }
        });
    }else{
      if(errors.correo !== undefined){
        if(correo.trim() === ""){
          alert("El campo correo no puede estar vacio ");
        }else{
          alert("Correo Electronico Invalido");
        }
      }else if(errors.nombre !== undefined){
        if(nombre.trim() === ""){
          alert("El campo nombre no puede estar vacio");
        }else{
          alert("Nombre Invalido");
        }
      }else if(errors.contrasena !== undefined){
       if(contrasena.trim() === ""){
          alert("El campo contraseña no puede estar vacio");
        }else{
          alert("Contraseña No Valida");
        }
      }else if(errors.apellido !== undefined){
        if(apellido.trim() === ""){
          alert("El campo apellido no puede estar vacio");
        }else{
          alert("Apellido No Valido");
        }
      }
    }
  }

  const actualizarContexto = () =>{ //Funcion para mandar a llamar al backend para buscar los datos en la base de datos.
      Axios.get("http://localhost:3001/seEncuentraD",{
        params:{
          matricula:matricula //Se mandan los datos ingresados en el formulario.
        }
        }).then(response =>{ 
          if (response.data.length === 0) { // Verifica si la respuesta está vacía.
            Axios.get("http://localhost:3001/contextoA",{
              params:{
                correo:correo
              }
              }).then(response =>{ 
                setUserData(response.data); 
                setContrasena("");// Guardar datos del usuario en el contexto
              }).catch(error => {
                console.error(error);
              });
          }else{
            Axios.get("http://localhost:3001/selectD",{
              params:{
                matricula:matricula
              }
              }).then(response =>{ 
                setUserData(response.data);
                setContrasena(""); // Guardar datos del usuario en el contexto
              }).catch(error => {
                console.error(error);
              });
          }
      });
  }
 

  const deleteMateria = (val,matricula) => {
      Axios.get("http://localhost:3001/seEncuentraD",{ //verifica si el usuario es docente o alumno
        params:{
          matricula:matricula //Se mandan los datos ingresados en el formulario.
        }
        }).then(response =>{ //Se manda un mensaje de alerta.
          if (response.data.length === 0 || response.data.length === null) { // Verifica si la respuesta está vacía(es alumno).
            Axios.delete(`http://localhost:3001/deleteMateria/${val.id_materia}/${matricula}`)
              .then(() => {
              alert("Dada de baja Correctamente");
            })
            .catch((error) => {
              console.error("Hubo un error al eliminar la materia:", error);
            });
          }else{
            Axios.put("http://localhost:3001/deleteMateriaD",{
                matricula:matricula  
            }).then(response=>{
              getMaterias();
              alert("Dada de baja Correctamente");
            }).catch(error => {
              getMaterias();
              console.error('Error en la solicitud:', error);
            });
        }
      });
  }

  return (
    <div className="background">
      <nav class="Navegacion">
        <Navbar/>
      </nav>
      <br/>
      <br/>
      <br/>
      <h1>Bienvenido, {userData ? userData[0].nombre : 'No disponible'}
                      {userData ? " " + userData[0].apellidos : 'No disponible'}
      </h1>
      <div className="contenido">
        <div className="card-body formulario">
            {errors.correo && <div className="alertas">*{errors.correo}</div>}
          <div className="input-group mb-1">
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
          <div className="input-group mb-1">
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
            <div className="input-group mb-1">
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
            <div className="input-group mb-1">
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
        </div>
        <div className="tabla">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th scope="col">Nombre Materia</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {materiasList.map((val,key)=>{
                const isDisabled = !val.nombre && !val.materia;
                return (
                  <tr key={key}>
                    <td>{val.nombre || val.materia || "No Hay Materias" }</td>
                    <td>
                      <button className="btn btn-danger"  onClick={()=>{
                              deleteMateria(val,matricula);
                              getMaterias();
                            }} disabled={isDisabled}>Dar de Baja</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="botones">
          <button className="btn btn-primary" onClick={goToHome}>Cancelar</button>
          <button className="btn btn-primary" onClick={actualizarDatos}>Guardar Cambios</button>
          
        </div>
        <div className="botonGestionar">
          <button className="btn btn-primary" disabled={isDocente} onClick={goToGestionarCurso}>Agregar Materias</button>
        </div>
      </div>
      <br/>
      <br/>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default Perfil;