import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import swal from 'sweetalert2';
import axios from '../axios/axios';

const EditTasks = (data_tarea) => {
    const nombre_tarea=data_tarea['data_tarea']['nombre_tarea'];
    const fecha_vencimiento=data_tarea['data_tarea']['fecha_vencimiento'];
    const prioridad=data_tarea['data_tarea']['prioridad'];
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { register, handleSubmit } = useForm();
    const onSubmit = data =>{
    if(data['prioridad']!=='Priority'){
      axios.post(`/update-tasks/${data_tarea['data_tarea']['id_tarea']}`, data).then(
          (res)=>{
              if(res.data['message']=='Tarea actualizada'){
                swal.fire({
                  title: "Edited task",
                  icon: "success",
                  confirmButtonText: "¡Ok!",
                  confirmButtonColor: "#f96332",
                });
                handleClose();
              }else{
                swal.fire({
                  title: "The task could not be edited",
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
      <Button className="btn_edit" variant="primary" onClick={handleShow}>
        Edit
      </Button>
      <Modal 
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show} onHide={handleClose}
      className="modal">
        <Modal.Header closeButton className="bg-secondary text-white">
          <Modal.Title className="letter_tittle">Edit task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="letter_table bg-secondary text-white">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Task name</label>
                <input ref={register} type="text" name="nombre_tarea" className="text-white bg-secondary form-control" id="nombre" defaultValue={nombre_tarea} aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="fecha" className="form-label">Expiration</label>
                <input ref={register} type="date" name="fecha_vencimiento" defaultValue={fecha_vencimiento} className="text-white bg-secondary form-control" id="fecha"/>
            </div>
            <div className="mb-3">
              <select ref={register} className="bg-secondary text-white form-select" name="prioridad" defaultValue={prioridad} aria-label="Default select example">
                <option>Priority</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <Modal.Footer className="letter mx-auto">
                <Button onClick={handleClose} type="submit" className="btn_logout" variant="danger">
                    Cancel
                </Button>
                <Button type="submit" className="btn_save" variant="success">
                    Save changes
                </Button>
            </Modal.Footer>
        </form>
        </Modal.Body>
      </Modal>
    </>
    )
};

export default EditTasks;