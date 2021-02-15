import React from 'react';
import '../styles/styles.css';
import {Link} from 'react-router-dom';
import {Card} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from '../axios/axios';
import swal from 'sweetalert2';
import {saveToLocal} from '../functions/LocalStorage';
import sha1 from "sha1";

const FormLogin=()=> {
    const { register, handleSubmit } = useForm();
    const onSubmit = data =>{
        axios.post('/login', {
            "correo":data['correo'],
            "contrasena":sha1(data['contrasena'])
        }).then(
            (res)=>{
                if(res.data[0]==undefined){
                    swal.fire({
                        title: "Información no registrada",
                        text: "Ingrese bien su información o registrese primero",
                        icon: "error",
                        confirmButtonText: "¡Entendido!",
                        confirmButtonColor: "#f96332",
                    });
                }else{
                    const id = res.data[0]["_id"];
                    const nombre = res.data[0]["nombre"];
                    saveToLocal("id", id);
                    saveToLocal("nombre", nombre);
                    window.location.href="/tasks";
                } 
            }
        )
    }
        

    return (
        <div>
            <div className="container d-flex my-5">
                <h4 className='letter_tittle mt-2 text-white mx-auto'>Login</h4>
            </div>
            <Card className='mx-auto my-5 p-5 text-white bg-secondary' style={{ width: '25rem' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3 pb-4">
                        <label htmlFor="exampleInputEmail1" className="letter form-label">Email</label>
                        <input required ref={register} type="email" className="text-white bg-secondary letter form-control" name="correo"/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="exampleInputPassword1" className="letter form-label">Password</label>
                        <input required ref={register} type="password" className="text-white bg-secondary letter form-control" name="contrasena"/>
                    </div>
                    <div className="letter pb-4">
                        <Link className="text-white" style={{fontSize:15}} to="/signup">Registrarse</Link>
                    </div>
                    <div className="text-center text-white letter pb-2">
                        <button type="submit" className="btn btn-secondary">Sign in</button>    
                    </div>
                </form> 
            </Card>
        </div>
        );
};

export default FormLogin;