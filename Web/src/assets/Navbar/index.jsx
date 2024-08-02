import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar_module.css';
import { FaArrowLeft } from "react-icons/fa";

function Navbar() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/menu');
    };

    return (
        <header>
            <nav>
                <div onClick={handleBackClick} className="back-arrow-box">
                    <FaArrowLeft className="back-arrow" />
                </div>
                <div className='nav-text-wrapper'>
                    <h2 className='title'>EVENT TODAY</h2>
                </div>
                <div className='nav-space'></div>
            </nav>
        </header>
    );
}

export default Navbar;
