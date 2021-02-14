import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {getFromLocal} from '../functions/LocalStorage';

const RegisterTasks = () => {
    const id=getFromLocal('id');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { register, handleSubmit } = useForm();
  const onSubmit = data =>{console.log(data)};
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
            <div class="mb-3">
                <label htmlFor="nombre" class="form-label">Task name</label>
                <input required ref={register} type="text" name="nombre_tarea" className="form-control" id="nombre" aria-describedby="emailHelp"/>
            </div>
            <div class="mb-3">
                <label htmlFor="prioridad" class="form-label">Priority</label>
                <input required ref={register} type="text" name="prioridad" className="form-control" id="prioridad"/>
            </div>
            <div class="mb-3">
                <label htmlFor="fecha" class="form-label">Expiration</label>
                <input required ref={register} type="date" name="fecha_vencimiento" className="form-control" id="fecha"/>
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