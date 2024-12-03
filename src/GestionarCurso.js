import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from './GlobalState';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './commons/Footer';
import Navbar from './commons/Navbar';
import { useNavigate } from 'react-router-dom';
import './GestionarCurso.css';

function GestionarCurso() { //En este componente se definen las variables.
  const { setUserData } = useContext(GlobalContext);
  const { userData } = useContext(GlobalContext);
  const [nombre,setNombre]= useState("");//variable donde se guardara el nombre ingresado en el formulario
  const [apellido,setApellido]= useState(""); //varaible donde se guarda ek apelido
  const [contrasena,setContrasena]= useState(""); //variable donde se guarda la contraseña
  const [correo,setCorreo]= useState("");//variable donde se guarda la correo
  const [matricula, setMatricula]= useState();
  const [especialidad,setEspecialidad]= useState("");
  const [cursos, setCursos] = useState([]);
  const [noICursos, setNoICursos] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [id_materia, setIdMateria] = useState(null);
  const navigate = useNavigate();
  
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

  const getMaterias = () =>{
    Axios.get("http://localhost:3001/materiasDisponibles",{
      params:{
        matricula:matricula
      }        
    }).then(response=>{
      setCursos(response.data);
    }).catch(error => {
      console.error('Error en la solicitud:', error);
    });
  }

  const getMateriasInscritas = () =>{
    Axios.get("http://localhost:3001/materiasInscritas",{
      params:{
        matricula:matricula
      }        
    }).then(response=>{
      setNoICursos(response.data);
    }).catch(error => {
      console.error('Error en la solicitud:', error);
    });
  }

  const handleCheckboxChange = (event, materias) => {
    setSelectedCheckbox(event.target.value);
    console.log(selectedCheckbox);
    console.log(matricula);
  };

  
  const goToHome = () => { //Funcion para mandar a llamar a la pagina de inicio.
    navigate('/home');
  };

  const verificar = () => {
    Axios.get("http://localhost:3001/cantidadDeCursos",{
      params:{
        matricula:matricula
      }        
    }).then(response=>{
      const count = response.data[0].count;
      
    if (count < 4) {
      alert("Porfavor Elige mas de 4 materias");
    } else {
      alert("Materias Agregadas con Éxito");
      goToHome();
    }
    }).catch(error => {
      console.error('Error en la solicitud:', error);
    });
  };

  const inscribir =() =>{
    const selectedMateria = cursos.find(cursos => cursos.id_materia === selectedCheckbox);
    if (!selectedMateria) {
      alert("Por favor, selecciona una materia válida.");
      return;
    }

    Axios.get("http://localhost:3001/verificarHora", {
      params: {
        matricula: matricula,
        hora: selectedMateria.hora
      }
    }).then(response => {
      if (response.data.length > 0) {
        alert("La hora de la materia seleccionada coincide con otra materia ya inscrita.");
      } else {
        Axios.get("http://localhost:3001/cantidadDeAlumnos", {
          params: {
            id_materia: selectedCheckbox
          }
        }).then(response => {
          const count = response.data[0].count;

          if (count >= 5) {
            alert("La materia está llena");
          } else {
            Axios.get("http://localhost:3001/cantidadDeCursos", {
              params: {
                matricula: matricula
              }
            }).then(response => {
              const count = response.data[0].count;

              if (count < 7) {
                Axios.get("http://localhost:3001/inscribirCurso", {
                  params: {
                    matricula: matricula,
                    id_materia: selectedCheckbox
                  }
                }).then(response => {
                  alert("Materia agregada");
                  getMateriasInscritas(); // Actualiza la lista de materias inscritas
                }).catch(error => {
                  console.error('Error en la solicitud:', error);
                });
              } else {
                alert("No puedes inscribir más de 7 materias.");
              }
            }).catch(error => {
              console.error('Error en la solicitud:', error);
            });
          }
        }).catch(error => {
          console.error('Error en la solicitud:', error);
        });
      }
    }).catch(error => {
      console.error('Error en la solicitud:', error);
    });
  }
  
  const darDeBaja = () => {
    Axios.get("http://localhost:3001/darDeBaja",{
      params:{
        matricula:matricula,
        id_materia:selectedCheckbox
      }        
    }).then(response=>{
      alert("Dada de Baja con éxito");
    }).catch(error => {
      console.error('Error en la solicitud:', error);
    });
  };

  useEffect(() => { //se utiliza para enviar los datos del formulario a validacion
    getMateriasInscritas();
  });

  useEffect(() => { //se utiliza para enviar los datos del formulario a validacion
    getMaterias();
  });

  return (
    <div className="background">
      <div className="Navegacion"> 
        <Navbar/>
      </div>
      <br/>
      <br/>
      <br/>
      <div className="gestionar card shadow-lg p-3 rounded">Gestion de Cursos</div>
      <div className=" card-group grupo_cursos shadow-lg p-3 mb-5 bg-body rounded">
      <div className="row align-items-start noInscrito ">
        <div className='col'>
        <div className="titulo">Cursos Disponibles</div>
      {cursos.map((materias, index) => (
        <div key={materias.id_materia} className="card">
          <div className="form-check seleccion">
            <input className="form-check-input checkeo " type="checkbox" value={materias.id_materia} id={`defaultCheck${index}`}  
            checked={selectedCheckbox === materias.id_materia}
            onChange={(event) => handleCheckboxChange(event, materias)} />
            <label className="form-check-label" htmlFor={`defaultCheck${index}`}>
            {materias.nombre} 
              -hora:-
              {materias.hora}
              <img className='form-check-label imagenCurso'  htmlFor={`defaultCheck${index}`} src={materias.image} alt=''/>
            </label> 
          </div>
        </div>
      ))}
       <button type="button" className="btn btn-primary" 
          onClick={inscribir} disabled={!selectedCheckbox || !cursos.some(materia => materia.id_materia === selectedCheckbox)}>
            Agregar</button>
      </div>
      <div className="col">
      <div className="titulo">Cursos Inscrito</div>
      {noICursos.map((materias, index) => (
        <div key={materias.id_materia} className="card">
          <div className="form-check seleccion">
            <input className="form-check-input checkeo " type="checkbox" value={materias.id_materia} id={`defaultCheck${index+7}`} 
            checked={selectedCheckbox === materias.id_materia}
            onChange={(event) => handleCheckboxChange(event, materias)}/>
            <label className="form-check-label" htmlFor={`defaultCheck${index+7}`}>
              {materias.nombre} 
              -hora:-
              {materias.hora}
              <img className='form-check-label imagenCurso'  htmlFor={`defaultCheck${index+7}`} src={materias.image} alt=''/>
            </label> 
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-primary" 
        onClick={darDeBaja} disabled={!selectedCheckbox || !noICursos.some(materia => materia.id_materia === selectedCheckbox)}>
          Eliminar</button>
      </div>
      <div className='centrar'>
      <button type="button" className="btn btn-primary" 
        onClick={verificar}>
          Guardar</button>
      </div>
      </div>
    </div>
      <br/>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default GestionarCurso;