import React from 'react';
import '../styles/styles.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from '../axios/axios';
import swal from 'sweetalert2';
import sha1 from "sha1";

const FormSignUp = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        axios.post('/send-email', {
            "nombre": data['nombre'],
            "correo": data['correo'],
            "contrasena": data['contrasena']
        }).then(
            (res) => {
                if (res.state === 0) {
                    swal.fire({
                        title: "Invalid mail",
                        text: "Make sure you enter your mail or create a new one",
                        icon: "error",
                        confirmButtonText: "¡Ok!",
                        confirmButtonColor: "#f96332",
                    });
                } else {
                    axios.post('/signup', {
                        "nombre": data['nombre'],
                        "apellidos": data['apellidos'],
                        "correo": data['correo'],
                        "contrasena": sha1(data['contrasena'])
                    }).then(
                        (res) => {
                            if (res.data['message'] == "Usuario registrado") {
                                swal.fire({
                                    title: "Successfully completed registration",
                                    text: "You can now log in",
                                    icon: "success",
                                    confirmButtonText: "<a href='/login'>¡Ok!</a>",
                                    confirmButtonColor: "#f96332",
                                });
                            }
                        }
                    )
                }
            }
        )
    }

    return (
        <div>
            <div className="container d-flex my-5">
                <h4 className='letter_tittle mt-2 text-white mx-auto'>Sign up</h4>
            </div>
            <Card className='mx-auto my-5 p-5 text-white bg-secondary' style={{ width: '25rem' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3 pb-3">
                        <label htmlFor="exampleInputEmail1" className="letter form-label">Name</label>
                        <input required ref={register} type="text" className="text-white bg-secondary letter form-control" name="nombre" />
                    </div>
                    <div className="mb-3 pb-3">
                        <label htmlFor="exampleInputEmail1" className="letter form-label">Last names</label>
                        <input required ref={register} type="text" className="text-white bg-secondary letter form-control" name="apellidos" />
                    </div>
                    <div className="mb-3 pb-3">
                        <label htmlFor="exampleInputEmail1" className="letter form-label">Email</label>
                        <input required ref={register} type="email" className="text-white bg-secondary letter form-control" name="correo" />
                    </div>
                    <div className="mb-1 pb-4">
                        <label htmlFor="exampleInputPassword1" className="letter form-label">Password</label>
                        <input required ref={register} type="password" className="text-white bg-secondary letter form-control" name="contrasena" />
                    </div>
                    <div className="text-center text-white letter pb-2">
                        <button type="submit" className="btn btn-secondary">Sign up</button>
                    </div>
                    <div className="text-center text-white letter pb-2">
                        <Link to="/"><button className="btn btn_delete btn-danger">Cancel</button></Link>
                    </div>

                </form>
            </Card>
        </div>
    );
};

export default FormSignUp;