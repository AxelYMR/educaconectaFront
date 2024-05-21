import './App.css';
import { useState, useEffect } from "react";
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

  const [editar,setEditar] = useState(false);

  const [empleadosList,setEmpleados] = useState([]);
  
  
  
  const getEmpleados = () =>{
    Axios.get("http://129.159.33.229:3000/empleados").then((response)=>{
      setEmpleados(response.data);
    }).catch(error => {
      console.error('Error en la solicitud:', error);
    });
  }
  getEmpleados();

  const insertar = () =>{
    Axios.post("http://129.159.33.229:3000/create",{
      manager:manager,
      departamento:departamento,
      puesto:puesto,
      nombre:nombre,
      paterno:paterno,
      materno:materno,
      sueldo:sueldo,
      tipo:tipo
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
  }

  const update = () =>{
    Axios.put("http://129.159.33.229:3000/update",{
      id:id,
      manager:manager,
      departamento:departamento,
      puesto:puesto,
      nombre:nombre,
      paterno:paterno,
      materno:materno,
      sueldo:sueldo,
      tipo:tipo
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
    });
  }

  const deleteEmple = (val) =>{
    Axios.delete(`http://129.159.33.229:3000/delete/${val.id_empleado}`).then(()=>{
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
    setEditar(false);
  }


  return (
    <div className="container">    
      <div className="card text-center">
        <div className="card-header">
          Empleados
        </div>
        <div className="card-body">

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
          <input type="text" value={nombre}
            onChange={(event) => {
              setNombre(event.target.value);
            }}
          className="form-control" placeholder="Ingrese el Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Paterno:</span>
          <input type="text" value={paterno}
            onChange={(event) => {
              setPaterno(event.target.value);
            }} 
          className="form-control" placeholder="Ingrese Apellido Paterno" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Materno:</span>
          <input type="text" value={materno}
            onChange={(event) => {
              setMaterno(event.target.value);
            }} 
          className="form-control" placeholder="Ingrese Apellido Materno" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Sueldo:</span>
          <input type="number" value={sueldo}
            onChange={(event) => {
              setSueldo(event.target.value);
            }}   
          className="form-control" placeholder="Ingrese Sueldo" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>  

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Tipo Empleado:</span>
          <input type="text" value={tipo}
            onChange={(event) => {
              setTipo(event.target.value);
            }}    
          className="form-control" placeholder="Ingrese Tipo Empleado" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>        

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Manager:</span>
          <input type="text" value={manager}
            onChange={(event) => {
              setManager(event.target.value);
            }}    
          className="form-control" placeholder="Ingrese El Manager" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>       

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Departamento:</span>
          <input type="text" value={departamento}
            onChange={(event) => {
              setDepartamento(event.target.value);
            }}    
          className="form-control" placeholder="Ingrese El Departamento" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Puesto</span>
          <input type="text" value={puesto}
            onChange={(event) => {
              setPuesto(event.target.value);
            }}     
          className="form-control" placeholder="Ingrese El Puesto" aria-label="Username" aria-describedby="basic-addon1"/>
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
      <table className="table table-striped">
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
