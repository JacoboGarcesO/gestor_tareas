import React from 'react';
import '../styles/styles.css';
import {Card} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from '../axios/axios';
import swal from 'sweetalert2';

const FormSignUp=()=> {
    const { register, handleSubmit } = useForm();
    const onSubmit = data =>{    
        axios.post('/send-email', data).then(
            (res)=>{
                if(res.state===0){
                    swal.fire({
                        title: "Su correo no es válido",
                        text: "Asegurese de ingresar bien su correo o crear uno nuevo",
                        icon: "error",
                        confirmButtonText: "¡Entendido!",
                        confirmButtonColor: "#f96332",
                    });
                }else{
                    axios.post('/signup', data).then(
                        (res)=>{
                            if(res.data['message']=="Usuario registrado"){
                                swal.fire({
                                    title: "Registro completado con éxito",
                                    text: "Ahora podrá iniciar sesión",
                                    icon: "success",
                                    confirmButtonText: "<a href='/login'>¡Entendido!</a>",
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
                        <input required ref={register} type="text" className="text-white bg-secondary letter form-control" name="nombre"/>
                    </div>
                    <div className="mb-3 pb-3">
                        <label htmlFor="exampleInputEmail1" className="letter form-label">Last names</label>
                        <input required ref={register} type="text" className="text-white bg-secondary letter form-control" name="apellidos"/>
                    </div>
                    <div className="mb-3 pb-3">
                        <label htmlFor="exampleInputEmail1" className="letter form-label">Email</label>
                        <input required ref={register} type="email" className="text-white bg-secondary letter form-control" name="correo"/>
                    </div>
                    <div className="mb-1 pb-4">
                        <label htmlFor="exampleInputPassword1" className="letter form-label">Password</label>
                        <input required ref={register} type="password" className="text-white bg-secondary letter form-control" name="contrasena"/>
                    </div>
                    <div className="text-center text-white letter pb-2">
                        <button type="submit" className="btn btn-secondary">Sign up</button>    
                    </div>
                </form> 
            </Card>
        </div>
        );
};

export default FormSignUp;