import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './ticket_success.css';

function TicketSuccess({ onClose }) {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/menu');
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h1>✅ Ingresso Criado com Sucesso!</h1>
                    <Button type='submit' onClick={handleBackClick} className="btn-primary">
                        Ir para o Menu
                    </Button>
            </div>
        </div>
    );
}

export default TicketSuccess;
