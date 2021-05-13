import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Fondo from '../images/fondo_1.jpg';
import '../styles/styles.css';
import ContentBeginning from '../components/ContentBeginning';

const Beginning = () => {
    return (
        <div className="BEGINNING_PAGE fondo" style={{ backgroundImage: `url(${Fondo})` }}>
            <Header />
            <ContentBeginning />
            <Footer />
        </div>
    );
};

export default Beginning;