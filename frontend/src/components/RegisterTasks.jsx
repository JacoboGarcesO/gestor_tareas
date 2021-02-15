import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { getFromLocal } from '../functions/LocalStorage';
import swal from 'sweetalert2';
import axios from '../axios/axios';

const RegisterTasks = () => {
  const id = getFromLocal('id');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    if (data['prioridad'] !== 'Priority') {
      swal.fire({
        title: "Now you’ll add the task",
        text: " You sure?",
        icon: "info",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "¡Ok!",
        confirmButtonColor: "#7FFF00",
        cancelButtonColor: "#FF0000",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post('/tasks', {
            "nombre_tarea": data['nombre_tarea'],
            "prioridad": parseInt(data['prioridad']),
            "fecha_vencimiento": data['fecha_vencimiento'],
            "user": id
          }).then(
            (res) => {
              if (res.data['message'] == 'Tarea registrada') {
                swal.fire({
                  title: "Added task",
                  icon: "success",
                  confirmButtonText: "¡Ok!",
                  confirmButtonColor: "#7FFF00",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                })
              } else {
                swal.fire({
                  title: "The task could not be added",
                  icon: "error",
                  confirmButtonText: "¡Ok!",
                  confirmButtonColor: "#7FFF00",
                });
              }
            })
        }
      }
      )
    } else {
      swal.fire({
        title: "Select a valid priority",
        icon: "error",
        confirmButtonText: "¡Ok!",
        confirmButtonColor: "#7FFF00",
      });
    }
  };
  return (
    <>
      <Button className="circulo_prueba" variant="success" onClick={handleShow}>
        +
      </Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show} onHide={handleClose}
        className="modal">
        <Modal.Header closeButton className="bg-secondary text-white">
          <Modal.Title className="letter_tittle">Add task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="letter_table bg-secondary text-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Task name</label>
              <input required ref={register} type="text" name="nombre_tarea" className="text-white bg-secondary form-control" id="nombre" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="fecha" className="form-label">Expiration</label>
              <input required ref={register} type="date" name="fecha_vencimiento" className="text-white bg-secondary form-control" id="fecha" />
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