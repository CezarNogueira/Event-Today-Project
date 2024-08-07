import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Atualize para useNavigate
import './login_module.css';

function Login() {
    const navigate = useNavigate(); // Atualize para useNavigate
    const [formDados, setFormDados] = useState({
        email_usuario: '',
        senha_usuario: ''
    });

    const [mensagem, setMensagem] = useState('');

    const handleBackClick = () => {
        navigate('/');
    };

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
                throw new Error(`Erro: ${response.status} - ${response.statusText}`);
            }

            const json = await response.json();
            localStorage.setItem('token', json.token); // Salva o token
            localStorage.setItem('nome_usuario', json.nome_usuario); // Salva o nome do usuário
            console.log("Token salvo:", localStorage.getItem('token'));
            console.log(response);
            console.log(json);
            setMensagem('Login realizado com sucesso!');
            
            // Redireciona para a página de menu após login bem-sucedido
            navigate('/menu'); // Atualize para usar navigate
        } catch (err) {
            console.error('Erro ao enviar', err);
            setMensagem('Erro ao enviar os dados. Por favor, tente novamente.');
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
                                <input 
                                    type="text" 
                                    name="email_usuario" 
                                    value={formDados.email_usuario} 
                                    onChange={handleChange} 
                                    maxLength='200' 
                                    required 
                                />
                            </div>

                            <div className="input-box">
                                <label htmlFor="senha_usuario">Senha</label>
                                <input 
                                    type="password" 
                                    name="senha_usuario" 
                                    value={formDados.senha_usuario} 
                                    onChange={handleChange} 
                                    minLength='6' 
                                    maxLength='200' 
                                    required 
                                />
                            </div>
                        </div>

                        <div className='confirm-button-login'>
                            <button type='submit'>Confirmar</button>
                        </div>

                        {mensagem && <p className="mensagem">{mensagem}</p>}
                    </form>
                    <div className='back-button-login'>
                        <button onClick={handleBackClick}>Voltar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
