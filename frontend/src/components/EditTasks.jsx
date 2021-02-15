import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {getFromLocal} from '../functions/LocalStorage';

const EditTasks = () => {
  const id=getFromLocal('id');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { register, handleSubmit } = useForm();
  const onSubmit = data =>{console.log(data)};

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
                <input required ref={register} type="text" name="nombre_tarea" className="text-white bg-secondary form-control" id="nombre" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="fecha" className="form-label">Expiration</label>
                <input required ref={register} type="date" name="fecha_vencimiento" className="text-white bg-secondary form-control" id="fecha"/>
            </div>
            <div className="mb-3">
              <select ref={register} required className="bg-secondary text-white form-select" name="prioridad" aria-label="Default select example">
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