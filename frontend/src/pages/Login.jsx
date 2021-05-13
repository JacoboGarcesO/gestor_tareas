import React from 'react';
import Fondo from '../images/fondo_1.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Form from '../components/FormLogin';

export default function Login() {
    return (
        <div className="LOGIN_PAGE fondo" style={{ backgroundImage: `url(${Fondo})` }}>
            <Header />
            <br />
            <br />
            <Form />
            <br />
            <br />
            <Footer />
        </div>
    )
}