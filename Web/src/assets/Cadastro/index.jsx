import React, { useState } from 'react';
import './cadastro_module.css'

function Cadastro() {
    const [formDados, setFormDados] = useState({
        nome_usuario: '',
        cpf_usuario: '',
        idade_usuario: '',
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
            const response = await fetch('http://localhost:3000/usuario', {
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
            console.log(response);
            console.log(json);
            setMensagem('Cadastro realizado com sucesso!');
        } catch (err) {
            console.error('Erro ao enviar', err);
            setMensagem('Erro ao enviar os dados. Por favor, tente novamente.');
        }
    };

    return (
        <div className="cadastro_container">
            <div className="cadastro_wrapper">
                <div className="form"> 
                    <form onSubmit={handleSubmit}>
                        <div className="form-header">
                            <div className="title">
                                <h1>CADASTRO</h1>
                            </div>
                        </div>

                        <div className="input-group">
                            <div className="input-box">
                                <label htmlFor="nome_usuario">Nome</label>
                                <input type="text" name="nome_usuario" value={formDados.nome_usuario} onChange={handleChange} maxLength='250' required/>
                            </div>

                            <div className="input-box">
                                <label htmlFor="cpf_usuario">CPF</label>
                                <input type="text" name="cpf_usuario" value={formDados.cpf_usuario} onChange={handleChange} maxLength='14' required/>
                            </div>

                            <div className="input-box">
                                <label htmlFor="idade_usuario">Idade</label>
                                <input type="text" name="idade_usuario" value={formDados.idade_usuario} onChange={handleChange} maxLength='3' required/>
                            </div>

                            <div className="input-box">
                                <label htmlFor="email_usuario">E-mail</label>
                                <input type="text" name="email_usuario" value={formDados.email_usuario} onChange={handleChange} maxLength='200' required/>
                            </div>

                            <div className="input-box">
                                <label htmlFor="senha_usuario">Senha</label>
                                <input type="text" name="senha_usuario" value={formDados.senha_usuario} onChange={handleChange} minLength='6' maxLength='200' required/>
                            </div>
                        </div>

                        <div className='confirm-button'>
                            <button type='submit'>Confirmar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Cadastro