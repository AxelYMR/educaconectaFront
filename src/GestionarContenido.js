import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from './GlobalState';
import Axios from "axios";
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './commons/Footer';
import Navbar from './commons/Navbar';
import './GestionarContenido.css';
import AgregarMultimedia from './AgregarMultimedia';
import AgregarArchivosTexto from './AgregarArchivosTexto';
import AgregarExamenes from './AgregarExamenes';
import AgregarNotificacion from './AgregarNotificacion';
import SidebarNotificaciones from './SidebarNotificaciones';

function GestionarContenido() {
  const { id } = useParams();
  const { userData } = useContext(GlobalContext);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [correo, setCorreo] = useState("");
  const [matricula, setMatricula] = useState();
  const [especialidad, setEspecialidad] = useState("");
  const [materia, setMateria] = useState(null);
  const { setUserData } = useContext(GlobalContext);
  const [isDocente, setIsDocente] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalTexto, setShowModalTexto] = useState(false);
  const [showModalExamenes, setShowModalExamenes] = useState(false);
  const [showModalNotificacion, setShowModalNotificacion] = useState(false);
  const [actividades, setActividades] = useState([]);
  const [examenes, setExamenes] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);

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
    checkIsDocente(matricula);
  });

  const checkIsDocente = () => {
    Axios.get("http://localhost:3001/seEncuentraD", {
      params: {
        matricula: matricula
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

  useEffect(() => {
    Axios.get(`http://localhost:3001/materia/${id}`)
      .then(response => {
        setMateria(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los detalles de la materia:', error);
      });
    getActividades();
    getExamenes();
    getNotificaciones();
  }, [id]);

  const getActividades = () => {
    Axios.get("http://localhost:3001/actividades", {
      params: {
        id
      }
    }).then(response => {
      setActividades(response.data);
    }).catch(error => {
      console.error('Error en la solicitud:', error);
    });
  }

  const getExamenes = () => {
    Axios.get("http://localhost:3001/examenes", {
      params: {
        id
      }
    }).then(response => {
      setExamenes(response.data);
    }).catch(error => {
      console.error('Error en la solicitud:', error);
    });
  }

  const getNotificaciones = () => {
    Axios.get("http://localhost:3001/notificaciones", {
      params: {
        id_materia: id
      }
    }).then(response => {
      setNotificaciones(response.data);
    }).catch(error => {
      console.error('Error en la solicitud:', error);
    });
  }

  const eliminarActividad = (id) => {
    Axios.delete(`http://localhost:3001/eliminarActividad/${id}`)
      .then(() => {
        alert("Actividad Eliminada");
        getActividades();
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar la actividad:", error);
      });
  }

  const renderMedia = (actividad) => {
    const fileExtension = actividad.upload.split('.').pop().toLowerCase();
    const filePath = `http://localhost:3001/${actividad.upload}`;
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      console.log('renderMedia', actividad.upload);
      return <img src={filePath} alt={actividad.nombre} className="img-fluid imagenActividad" />;
    } else if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
      return (
        <video controls className="img-fluid">
          <source src={filePath} type={`video/${fileExtension}`} />
          Your browser does not support the video tag.
        </video>
      );
    } else if (fileExtension === 'txt') {
      return (
        <div className="text-file">
          <a href={filePath} target="_blank" rel="noopener noreferrer">Archivo de Texto <img src="/img/file.jpeg" alt="Archivo de Texto" /></a>
        </div>
      );
    } else if (fileExtension === 'pdf') {
      return (
        <div className="pdf-file">
          <iframe src={filePath} width="100%" height="500px">
            <p>Tu navegador no soporta iframes.</p>
          </iframe>
        </div>
      );
    } else {
      return <p>Archivo no soportado</p>;
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    getActividades();
  }

  const handleShowModalTexto = () => setShowModalTexto(true);
  const handleCloseModalTexto = () => {
    setShowModalTexto(false);
    getActividades();
  }

  const handleShowModalExamenes = () => setShowModalExamenes(true);
  const handleCloseModalExamenes = () => {
    setShowModalExamenes(false);
    getExamenes();
  }

  const handleShowModalNotificacion = () => setShowModalNotificacion(true);
  const handleCloseModalNotificacion = () => {
    setShowModalNotificacion(false);
    getNotificaciones();
  }

  return (
    <div className="background">
      <div className="Navegacion">
        <Navbar />
      </div>
      <div className="contenido-con-sidebar">
        <SidebarNotificaciones notificaciones={notificaciones} />
        <div className="contenido-principal">
          <br /><br />
          <div>
            {materia ? (
              <div>
                <div className="nombre">{materia.nombre}</div>
                <div className="imagen-container">
                  <img className="imagen" src={materia.image} alt={materia.nombre} />
                </div>
                <div className="descripcion">{materia.descripcion}</div>
                {isDocente && (
                  <div className="botonesDocente">
                    <button className="btn btn-primary" onClick={handleShowModal}>Agregar Contenido Multimedia</button>
                    <button className="btn btn-primary" onClick={handleShowModalExamenes}>Agregar Examenes</button>
                    <button className="btn btn-primary" onClick={handleShowModalTexto}>Agregar Archivos de Texto</button>
                    <button className="btn btn-primary" onClick={handleShowModalNotificacion}>Agregar Notificación</button>
                  </div>
                )}
              </div>
            ) : (
              <p>Cargando...</p>
            )}
          </div>
          <div>
            <div className="tituloContenido">
              Contenido
            </div>
            {actividades.map(actividad => (
              <div key={actividad.id_actividad} className="card cursos contenedor-act shadow-lg p-3 mb-5 rounded">
                <div className="card-body todaActividad ">
                  <div className="datosActividad">
                    <div className="tituloActividad ">{actividad.nombre}</div>
                    <div className="tipoArchivo">{actividad.tipo}</div>
                  </div>
                  <div className="containerMedia">
                    {renderMedia(actividad)}
                  </div>
                  <button className='btn btn-danger btneliminar' onClick={() => {
                    eliminarActividad(actividad.id_actividad);
                  }}>eliminar</button>
                </div>
              </div>
            ))}
            <div className="tituloContenido">
              Examenes
            </div>
            {examenes.map(examen => (
              <div key={examen.id_examen} className="card cursos contenedor-act shadow-lg p-3 mb-5 rounded">
                <div className="card-body todaActividad ">
                  <div className="datosActividad">
                    <div className="tituloActividad ">Examen {materia.nombre} </div>
                    <div className="tipoArchivo">Examen</div>
                  </div>
                  <div className="containerMedia">
                    {examen.preguntas.map((pregunta, index) => (
                      <div key={index}>
                        <p><strong>Pregunta {index + 1}:</strong> {pregunta.pregunta}</p>
                        <p><strong>Respuesta:</strong> {pregunta.respuesta}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br />
      <div>
        <Footer />
      </div>
      <AgregarMultimedia show={showModal} handleClose={handleCloseModal} materiaId={id} />
      <AgregarArchivosTexto show={showModalTexto} handleClose={handleCloseModalTexto} materiaId={id} />
      <AgregarExamenes show={showModalExamenes} handleClose={handleCloseModalExamenes} materiaId={id} />
      <AgregarNotificacion show={showModalNotificacion} handleClose={handleCloseModalNotificacion} materiaId={id} />
    </div>
  );
}

export default GestionarContenido;