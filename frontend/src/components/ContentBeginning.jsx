import React, {useEffect, useState} from 'react';
import '../styles/styles.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import EditTasks from './EditTasks';
import RegisterTasks from './RegisterTasks';
import {getFromLocal, removeFromLocal} from '../functions/LocalStorage';
import axios from '../axios/axios';

const ContentBeginning=()=>{
  const limpiarLocal=()=>{
    removeFromLocal('nombre');
    removeFromLocal('id');
  }
  const [task, setTask]=useState([]);
  const nombre=getFromLocal('nombre');
  const id=getFromLocal('id');
  const getTasks =()=>{
    axios.post('/get-tasks',{"user":id}).then(
      (res)=>{
        setTask(res.data);
      }
    )
  }
  useEffect(() => {
    getTasks();
  }, []);

  const transformer=(data)=>{
    const fecha=data.split("T");
    return fecha[0];
  }
    return(
        <div>
          <div className="container d-flex my-5">
                <h4 className='letter_tittle mt-2 text-white mx-auto'>Tasks for {nombre}</h4>
          </div>
          <Card className='mx-auto my-5 p-4 text-white bg-secondary letter_table' style={{ width: '50rem' }}>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Priority</th>
                <th scope="col">Expiration</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {task.map((item)=>(
                <tr key={item._id}>
                  <td>{item.nombre_tarea}</td>
                  <td>{item.prioridad}</td>
                  <td>{transformer(item.fecha_vencimiento)}</td>
                  <td><EditTasks data_tarea={
                    {
                      "id_tarea":item._id, 
                      "nombre_tarea":item.nombre_tarea,
                      "prioridad":item.prioridad,
                      "fecha_vencimiento":transformer(item.fecha_vencimiento)
                    }
                    } /></td>
                  <td><button className='btn btn_delete btn-danger'>Delete</button></td>
              </tr>
              ))}
              
            </tbody>
          </table>
          <Link onClick={limpiarLocal} className="mx-auto" to="/"><button className='btn btn_logout btn-danger'>Log out</button></Link>
          </Card>
          <div>
            <RegisterTasks/>
          </div>
        </div>
    );
};

export default ContentBeginning;