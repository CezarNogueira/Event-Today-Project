import React from 'react';
import { useNavigate } from 'react-router-dom'; // Atualize a importação
import './Menu.css';
import UserInfo from '../../components/UserInfo/UserInfo.jsx';

function Menu() {
    const navigate = useNavigate(); // Para useNavigate

    const handleCreateClick = () => {
        navigate('/create'); // Para usar navigate
    };

    const handleControlClick = () => {
        navigate('/control'); // Para usar navigate
    };

    const handleLogoffClick = () => {
        localStorage.removeItem('nome_usuario');
        localStorage.removeItem('token');
        navigate('/'); // Para usar navigate e redirecionar para a página inicial
    };

    return (
        <div className='menu_container'>
            <div className='menu-text-wrapper'>
                <h1>Menu</h1>
                <UserInfo/>
            </div>
            <div className="menu-wrapper">
                <div className='menu-buttons'>
                    <button className='create-button' onClick={handleCreateClick}>Criar Ingresso</button>
                    <button className='edit-button' onClick={handleControlClick}>Vizualizar Ingressos</button>
                    <button className='logoff-button' onClick={handleLogoffClick}>Deslogar</button>
                </div>
            </div>
        </div>
    );
}

export default Menu;
