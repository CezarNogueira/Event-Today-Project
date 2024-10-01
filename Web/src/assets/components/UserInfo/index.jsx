import React, { useState, useEffect } from 'react';

const UserInfo = () => {
    const [nomeUsuario, setNomeUsuario] = useState('');

    useEffect(() => {
        const nome = localStorage.getItem('nome_usuario');
        console.log(`Nome do usuário recuperado do localStorage: ${nome}`);
        if (nome) {
            setNomeUsuario(nome);
        }
    }, []);

    return (
        <div>
            <p>Logado como: {nomeUsuario || 'Usuario'}</p>
        </div>
    );
};

export default UserInfo;
