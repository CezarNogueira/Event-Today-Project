import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ticket_success.css';
import Navbar from '../../components/Navbar/Navbar.jsx';

function TicketSuccess() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/menu');
    };

    return (
        <div className="success_container">
            <Navbar />
            <div className="success_wrapper">
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

export default TicketSuccess;
