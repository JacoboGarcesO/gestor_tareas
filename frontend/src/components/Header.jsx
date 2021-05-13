import React from 'react';
import '../styles/styles.css';
import Logo from '../images/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-light bg-secondary">
                <div>
                    <Link to="/">
                        <img style={{ margin: 5 }} width="50px" src={Logo} alt="Logo" />
                    </Link>
                    <span style={{ margin: 5 }} className="text-light letter">Progressive Tasks</span>
                </div>
            </nav>
        </div>
    );
};

export default Header;