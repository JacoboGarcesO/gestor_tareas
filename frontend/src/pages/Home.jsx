import React from 'react';
import Fondo from '../images/fondo_1.jpg';
import '../styles/styles.css';
import ContentHome from '../components/ContentHome';

const Home = () => {
    return (
        <div className="HOME_PAGE fondo" style={{ backgroundImage: `url(${Fondo})` }}>
            <ContentHome />
        </div>
    );
};

export default Home;