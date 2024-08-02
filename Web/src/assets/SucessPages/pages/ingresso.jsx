import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../sucess_module.css';
import Navbar from '../../Navbar';

function SucessIngresso() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/menu');
    };

    return (
        <div className="sucess_container">
            <Navbar />
            <div className="sucess_wrapper">
                <div className="title">
                    <h1>Ingresso Criado com Sucesso!</h1>
                </div>
                <button onClick={handleBackClick} className="back-to-menu-button">
                    Voltar para o Menu
                </button>
            </div>
        </div>
    );
}

export default SucessIngresso;
