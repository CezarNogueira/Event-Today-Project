import React from 'react';

function Dashboard({ setCurrentPage }) {
    return (
        <div>
            <h1>Bem-vindo ao Dashboard</h1>
            <button onClick={() => {
                localStorage.removeItem('token');
                setCurrentPage('home');
            }}>Deslogar</button>
        </div>
    );
}

export default Dashboard;