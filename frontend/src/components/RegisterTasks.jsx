import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {getFromLocal} from '../functions/LocalStorage';
import swal from 'sweetalert2';
import axios from '../axios/axios';

const RegisterTasks = () => {
  const id=getFromLocal('id');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { register, handleSubmit } = useForm();
  const onSubmit = data =>{
    if(data['prioridad']!=='Priority'){
      axios.post('/tasks', { 
        "nombre_tarea":data['nombre_tarea'], 
        "prioridad":parseInt(data['prioridad']),
        "fecha_vencimiento":data['fecha_vencimiento'], 
        "user":id
        }).then(
          (res)=>{
              if(res.data['message']=='Tarea registrada'){
                swal.fire({
                  title: "Added task",
                  icon: "success",
                  confirmButtonText: "¡Ok!",
                  confirmButtonColor: "#f96332",
                });
                handleClose();
              }else{
                swal.fire({
                  title: "The task could not be added",
                  icon: "error",
                  confirmButtonText: "¡Ok!",
                  confirmButtonColor: "#f96332",
                });
              }
          }
       )
    }else{
      swal.fire({
        title: "Select a valid priority",
        icon: "error",
        confirmButtonText: "¡Ok!",
        confirmButtonColor: "#f96332",
      });
    }
  };
  return (
    <>
      <Button className="btn_edit circulo_prueba" variant="success" onClick={handleShow}>
        +
      </Button>
      <Modal 
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show} onHide={handleClose}
      className="">
        <Modal.Header closeButton>
          <Modal.Title className="letter_tittle">Add task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="letter_table">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Task name</label>
                <input required ref={register} type="text" name="nombre_tarea" className="form-control" id="nombre" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="fecha" className="form-label">Expiration</label>
                <input required ref={register} type="date" name="fecha_vencimiento" className="form-control" id="fecha"/>
            </div>
            <div className="mb-3">
              <select ref={register} required className="form-select" name="prioridad" aria-label="Default select example">
                <option>Priority</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <Modal.Footer className="letter mx-auto">
                <Button type="submit" variant="primary">
                    Add
                </Button>
            </Modal.Footer>
        </form>
        </Modal.Body>
      </Modal>
    </>
    )
};

export default RegisterTasks;