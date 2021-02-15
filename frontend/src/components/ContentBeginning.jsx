import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditTasks from './EditTasks';
import RegisterTasks from './RegisterTasks';
import { getFromLocal, removeFromLocal } from '../functions/LocalStorage';
import axios from '../axios/axios';
import swal from 'sweetalert2';

const ContentBeginning = () => {
  const vencimiento=(dias)=>{
    if(dias<=0){
      return 'Expired';
    }else{
      return 'Is not expired';
    }
  }
  const validator_days=fecha=>{
    //Tomar milisegundos de la fecha ingresada
    let fecha_fin=new Date(fecha).getTime();
    //definir la fecha actual y sus milisegundos
    const now=new Date;
    const day=now.getDate();
    const month=(now.getMonth()+1);
    const year=now.getFullYear();
    let fecha_actual=`${year}-${month}-${day}`;
    fecha_actual=new Date(fecha_actual).getTime();
    //operación para calcular los días que faltan
    let diff=fecha_fin-fecha_actual;
    return Math.round(diff/(1000*60*60*24));
  }
  const limpiarLocal = () => {
    removeFromLocal('nombre');
    removeFromLocal('id');
  }
  const [task, setTask] = useState([]);
  const nombre = getFromLocal('nombre');
  const id = getFromLocal('id');
  const getTasks = () => {
    axios.post('/get-tasks', { "user": id }).then(
      (res) => {
        setTask(res.data);
      }
    )
  }
  useEffect(() => {
    getTasks();
  }, []);

  const transformer = (data) => {
    const fecha = data.split("T");
    return fecha[0];
  }
  return (
    <div>
      <div className="container d-flex my-5">
        <h4 className='letter_tittle mt-2 text-white mx-auto'>Tasks for {nombre}</h4>
      </div>
      <Card className='mx-auto my-5 p-4 text-white bg-secondary letter_table' style={{ width: '65rem' }}>
        <table className="table table-dark table-striped my-4">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Priority</th>
              <th scope="col">Expiration date</th>
              <th scope="col">Expired?</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {task.map((item) => (
              <tr key={item._id}>
                <td>{item.nombre_tarea}</td>
                <td>{item.prioridad}</td>
                <td>{transformer(item.fecha_vencimiento)}</td>
                <td>{vencimiento(validator_days(transformer(item.fecha_vencimiento)))}</td>
                <td><EditTasks data_tarea={
                  {
                    "id_tarea": item._id,
                    "nombre_tarea": item.nombre_tarea,
                    "prioridad": item.prioridad,
                    "fecha_vencimiento": transformer(item.fecha_vencimiento)
                  }
                } /></td>
                <td><button onClick={() => {
                    swal.fire({
                      title: "Now you’ll delete the task",
                      text:" You sure?",
                      icon: "info",
                      showCancelButton: true,
                      cancelButtonText:"Cancel",
                      confirmButtonText: "¡Ok!",
                      confirmButtonColor: "#7FFF00",
                      cancelButtonColor: "#FF0000",
                    }).then((result)=>{
                      if(result.isConfirmed){
                        axios.delete(`/delete-tasks/${item._id}`).then(
                          (res) => {
                            if(res.data['message']=='Tarea eliminada'){
                              swal.fire({
                                title: "Deleted task",
                                icon: "success",
                                confirmButtonText: "¡Ok!",
                                confirmButtonColor: "#7FFF00",
                              }).then((result)=>{
                                if (result.isConfirmed) {
                                  window.location.reload();
                                }
                              })
                            }else{
                              swal.fire({
                                title: "The task could not be deleted",
                                icon: "error",
                                confirmButtonText: "¡Ok!",
                                confirmButtonColor: "#7FFF00",
                              });
                            window.location.reload();
                          }
                        })
                      }
                    })
              }} className='btn btn_delete btn-danger'>Delete</button></td>
              </tr>
            ))}

          </tbody>
        </table>
        <Link onClick={limpiarLocal} className="mx-auto" to="/"><button className='btn btn_logout btn-danger'>Log out</button></Link>
      </Card>
      <div>
        <RegisterTasks />
      </div>
    </div>
  );
};

export default ContentBeginning;