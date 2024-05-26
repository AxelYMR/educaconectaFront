import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [nombre,setNombre]= useState("");
  const [paterno,setPaterno]= useState("");
  const [materno,setMaterno]= useState("");
  const [sueldo,setSueldo]= useState();
  const [tipo,setTipo] = useState("");
  const [manager,setManager] = useState("");
  const [departamento,setDepartamento] = useState("");
  const [puesto,setPuesto] = useState("");
  const [id,setId] = useState("");
  const [notas,setNotas] = useState("");

  const [editar,setEditar] = useState(false);

  const [empleadosList,setEmpleados] = useState([]);
  
  
  
  const getEmpleados = () =>{
    Axios.get("http://146.235.219.39:3000/empleados").then((response)=>{
      setEmpleados(response.data);
    }).catch(error => {
      console.error('Error en la solicitud:', error);
    });
  }
  getEmpleados();

  const insertar = () =>{
    Axios.post("http://146.235.219.39:3000/create",{
      manager:manager,
      departamento:departamento,
      puesto:puesto,
      nombre:nombre,
      paterno:paterno,
      materno:materno,
      sueldo:sueldo,
      tipo:tipo,
      notas:notas
    }).then(()=>{
      getEmpleados();
      alert("Empleado Registrado");
      limpiarCampos();
    });
  }

  const editarEmpleado =(val)=>{
    setEditar(true);

    setNombre(val.nombre);
    setPaterno(val.paterno);
    setMaterno(val.materno);
    setSueldo(val.sueldo);
    setTipo(val.tipoempleado);
    setManager(val.manager);
    setDepartamento(val.departamento);
    setPuesto(val.puesto);
    setId(val.id_empleado);
    setNotas(val.notas);
  }

  const update = () =>{
    Axios.put("http://146.235.219.39:3000/update",{
      id:id,
      manager:manager,
      departamento:departamento,
      puesto:puesto,
      nombre:nombre,
      paterno:paterno,
      materno:materno,
      sueldo:sueldo,
      tipo:tipo,
      notas:notas
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
    });
  }

  const deleteEmple = (val) =>{
    Axios.delete(`http://146.235.219.39:3000/delete/${val.id_empleado}`).then(()=>{
      getEmpleados();
      limpiarCampos();
    });
  }

  const limpiarCampos = () =>{
    setNombre("");
    setPaterno("");
    setMaterno("");
    setManager("");
    setId("");
    setTipo("");
    setDepartamento("");
    setPuesto("");
    setSueldo("");
    setNotas("");
    setEditar(false);
  }


  return (
    <div className="container">    
      <div className="card text-center">
        <div className="card-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-through-heart-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l3.103-3.104a.5.5 0 1 1 .708.708L4.5 12.207V14a.5.5 0 0 1-.146.354zM16 3.5a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182A24 24 0 0 1 5.8 12.323L8.31 9.81a1.5 1.5 0 0 0-2.122-2.122L3.657 10.22a9 9 0 0 1-1.039-1.57c-.798-1.576-.775-2.997-.213-4.093C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5z"/>
        </svg>
          Empleados
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-through-heart-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l3.103-3.104a.5.5 0 1 1 .708.708L4.5 12.207V14a.5.5 0 0 1-.146.354zM16 3.5a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182A24 24 0 0 1 5.8 12.323L8.31 9.81a1.5 1.5 0 0 0-2.122-2.122L3.657 10.22a9 9 0 0 1-1.039-1.57c-.798-1.576-.775-2.997-.213-4.093C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5z"/>
        </svg>
        </div>
        <div className="card-body">

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
          </svg>
          <input type="text" value={nombre}
            onChange={(event) => {
              setNombre(event.target.value);
            }}
          className="form-control" placeholder="Ingrese el Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Paterno:</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
          </svg>
          <input type="text" value={paterno}
            onChange={(event) => {
              setPaterno(event.target.value);
            }} 
          className="form-control" placeholder="Ingrese Apellido Paterno" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Materno:</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
          </svg>
          <input type="text" value={materno}
            onChange={(event) => {
              setMaterno(event.target.value);
            }} 
          className="form-control" placeholder="Ingrese Apellido Materno" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Sueldo:</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
          </svg>
          <input type="number" value={sueldo}
            onChange={(event) => {
              setSueldo(event.target.value);
            }}   
          className="form-control" placeholder="Ingrese Sueldo" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>  

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Tipo Empleado:</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
          </svg>
          <input type="text" value={tipo}
            onChange={(event) => {
              setTipo(event.target.value);
            }}    
          className="form-control" placeholder="Ingrese Tipo Empleado" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>        

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Manager:</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
          </svg>
          <input type="text" value={manager}
            onChange={(event) => {
              setManager(event.target.value);
            }}    
          className="form-control" placeholder="Ingrese El Manager" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>       

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Departamento:</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
          </svg>
          <input type="text" value={departamento}
            onChange={(event) => {
              setDepartamento(event.target.value);
            }}    
          className="form-control" placeholder="Ingrese El Departamento" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Puesto</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
          </svg>
          <input type="text" value={puesto}
            onChange={(event) => {
              setPuesto(event.target.value);
            }}     
          className="form-control" placeholder="Ingrese El Puesto" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>  

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Notas</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
          </svg>
          <input type="text" value={notas}
            onChange={(event) => {
              setNotas(event.target.value);
            }}     
          className="form-control" placeholder="Ingrese Notas" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>     
              
        </div>
        <div className="card-footer text-body-secondary">
          {
            editar? 
            <div>
              <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
              <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
            </div>
            :<button className='btn btn-success' onClick={insertar}>Registrar</button>
          }
        </div>
      </div>
      <table className="table table-striped-columns">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Paterno</th>
            <th scope="col">Materno</th>
            <th scope="col">Sueldo</th>
            <th scope="col">Tipo Empleado</th>
            <th scope="col">Manager</th>
            <th scope="col">Departamento</th>
            <th scope="col">Puesto</th>
            <th scope="col">Notas</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
            {
              empleadosList.map((val,key)=>{
                return <tr key={val.id_empleado}>
                        <th >{val.id_empleado}</th>
                        <td>{val.nombre}</td>
                        <td>{val.paterno}</td>
                        <td>{val.materno}</td>
                        <td>{val.sueldo}</td>
                        <td>{val.tipoempleado}</td>
                        <td>{val.manager}</td>
                        <td>{val.departamento}</td>
                        <td>{val.puesto}</td>
                        <td>{val.notas}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button"
                            onClick={()=>{
                              editarEmpleado(val);
                            }}
                          className="btn btn-info">Update</button>
                          <button type="button"
                            onClick={()=>{
                              deleteEmple(val);
                            }}
                          className="btn btn-danger">Delete</button>
                        </div>
                        </td>
                      </tr> 
              })
            }
        </tbody>
      </table>
    </div>
  );
}

export default App;
