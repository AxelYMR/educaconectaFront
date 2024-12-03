import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from './GlobalState';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import './LoginU.css';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './commons/Footer';
import Navbar from './commons/Navbar';
import { useNavigate } from 'react-router-dom';

function Home() { //En este componente se definen las variables.
  const { setUserData } = useContext(GlobalContext);
  const { userData } = useContext(GlobalContext);
  const [nombre,setNombre]= useState("");//variable donde se guardara el nombre ingresado en el formulario
  const [apellido,setApellido]= useState(""); //varaible donde se guarda ek apelido
  const [contrasena,setContrasena]= useState(""); //variable donde se guarda la contraseña
  const [correo,setCorreo]= useState("");//variable donde se guarda la correo
  const [matricula, setMatricula]= useState();
  const [especialidad,setEspecialidad]= useState("");
  const [isDocente, setIsDocente] = useState(false);
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);

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
    }
  }, [userData]);

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

  const getMaterias = () =>{
    Axios.get("http://localhost:3001/seEncuentraD",{ //verifica si el usuario es docente o alumno
      params:{
        matricula:matricula //Se mandan los datos ingresados en el formulario.
      }
      }).then(response =>{ //Se manda un mensaje de alerta.
        if (response.data.length === 0 || response.data.length === null) { // Verifica si la respuesta está vacía(es alumno).
         
          Axios.get("http://localhost:3001/buscarMateriasA",{
            params:{
              matricula:matricula
            }
          }).then(response=>{
            setCursos(response.data);
          }).catch(error => {
            console.error('Error en la solicitud:', error);
          });
        }else{
          Axios.get("http://localhost:3001/buscarMateriasD",{
            params:{
              matricula:matricula
            }        
          }).then(response=>{
            setCursos(response.data);
          }).catch(error => {
            console.error('Error en la solicitud:', error);
          });
      }
    });
}
  useEffect(() => { //se utiliza para enviar los datos del formulario a validacion
  getMaterias();
  checkIsDocente();
  });

  const goToGestionarContenido = (id) => {
    navigate(`/gestionarContenido/${id}`);
  };

  return (
    <div className="background">
      <div className="Navegacion"> 
        <Navbar/>
      </div>
      <br/>
      <br/>
      <br/>
      <p className="bienvenida">  Bienvenido, {userData ? userData[0].nombre : 'No disponible'}
                      {userData ? " " + userData[0].apellidos : 'No disponible'}
      </p>
      <div className="card-group grupo_cursos shadow-lg p-3 mb-5 bg-body rounded">
      {cursos.length === 0 ? (
          <div className="card cursos">
            <div className="card-body">
              <h5 className="card-title">No tienes materias inscritas</h5>
              <p className="card-text">Inscríbete a una materia para comenzar a aprender.</p>
            </div>
          </div>
        ) : (
          cursos.map(materias => (
            <div key={materias.id_materia} className="card cursos">
              <img src={materias.image} className="card-img-top cursos" alt={materias.nombre} />
              <div className="card-body ">
                <h5 className="card-title ">{materias.nombre}</h5>
                <p className="card-text">{materias.descripcion}</p>
              </div>
              <div className="card-footer">
                <small>
                  <button disabled={!isDocente} onClick={() => goToGestionarContenido(materias.id_materia)} className='btn btn-primary'>Gestionar Contenido</button>
                </small>
              </div>
            </div>
          ))
        )}
    </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default Home;