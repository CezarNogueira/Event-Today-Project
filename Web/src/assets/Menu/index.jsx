import React from 'react';
import './menu_module.css';
import UserInfo from '../UserInfo';

function Menu({ setCurrentPage }) {
    return (
        <div className='menu_container'>
            <div className='menu-text-wrapper'>
                <h1>Menu</h1>
                <UserInfo/>
            </div>
            <div className="menu-wrapper">
                <div className='menu-buttons'>
                    <button className='create-button' onClick={() => setCurrentPage('create')}>Criar Ingresso</button>
                    <button className='edit-button' onClick={() => setCurrentPage('edit')}>Editar Ingressos</button>
                    <button className='logoff-button' onClick={() => {
                        localStorage.removeItem('nome_usuario');
                        localStorage.removeItem('token');
                        setCurrentPage('home');
                    }}>Deslogar</button>
                </div>
            </div>
        </div>
    );
}

export default Menu;