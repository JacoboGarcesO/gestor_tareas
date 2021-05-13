import React from 'react';
import Fondo from '../images/fondo_1.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Form from '../components/FormSignUp';

export default function SignUp() {
    return (
        <div className="SIGNUP_PAGE fondo" style={{ backgroundImage: `url(${Fondo})` }}>
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