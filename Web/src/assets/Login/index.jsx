import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import './login_module.css';

function Login({ setCurrentPage }) {
    const [formDados, setFormDados] = useState({
        email_usuario: '',
        senha_usuario: ''
    });

    const [mensagem, setMensagem] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDados(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Dados a serem enviados:", formDados);
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDados)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors ? errorData.errors.map(err => err.msg).join(', ') : 'Erro ao realizar login');
            }

            const json = await response.json();

            setMensagem('Login realizado com sucesso!');
            localStorage.setItem('token', json.token); // Salva o token no localStorage
            localStorage.setItem('nome_usuario', json.nome_usuario); // Salva o Nome de Usuario no localStorage
            localStorage.setItem('usuario_id', json.idusuario); // Salva o ID do usuário no localStorage
            setCurrentPage('menu');
        } catch (err) {
            console.error('Erro ao enviar', err);
            setMensagem(err.message);
        }
    };

    return (
        <div className="login_container">
            <div className="login_wrapper">
                <div className="form"> 
                    <form onSubmit={handleSubmit}>
                        <div className="form-header">
                            <div className="title">
                                <h1>LOGIN</h1>
                            </div>
                        </div>
                        <div className="input-group">
                            <div className="input-box">
                                <label htmlFor="email_usuario">E-mail</label>
                                <input type="text" name="email_usuario" value={formDados.email_usuario} onChange={handleChange} maxLength='200' required/>
                            </div>

                            <div className="input-box">
                                <label htmlFor="senha_usuario">Senha</label>
                                <input type="password" name="senha_usuario" value={formDados.senha_usuario} onChange={handleChange} minLength='6' maxLength='200' required/>
                            </div>
                        </div>

                        <div className='confirm-button'>
                            <button type='submit'>Confirmar</button>
                        </div>
                        {mensagem && <p>{mensagem}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
