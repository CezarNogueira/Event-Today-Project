import React from 'react';
import './menu_module.css';

function Menu({ setCurrentPage }) {
    return (
        <div className='menu_container'>
            <div className='menu-text-wrapper'>
                <h1>Menu</h1>
            </div>
            <div className="menu-wrapper">
                <div className='menu-buttons'>
                    <button className='create-button'>Criar Ingresso</button>
                    <button className='edit-button'>Editar Ingressos</button>
                    <button className='logoff-button' onClick={() => {
                    localStorage.removeItem('token');
                    setCurrentPage('home');
                    }}>Deslogar</button>
                </div>
            </div>
        </div>
    );
}

export default Menu;