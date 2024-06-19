import React, { useState } from 'react';
import './create_module.css';
import Navbar from '../Navbar';

function Create({ setCurrentPage }) {
    const [formDados, setFormDados] = useState({
        nome_ingresso: '',
        tipo_ingresso: '',
        preco_ingresso: '',
        qtd_ingresso: '',
        data_ingresso: ''
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
            const response = await fetch('http://localhost:3000/ingresso', {
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

            setMensagem('Ingresso criado com sucesso!');
            setCurrentPage('sucessIngresso');
        } catch (err) {
            console.error('Erro ao enviar', err);
            setMensagem('Erro ao enviar os dados. Por favor, tente novamente.');
        }
    };

    return (
        <div className="create_container">
            <Navbar setCurrentPage={setCurrentPage}/>
            <div className="create_wrapper">
                <div className="form"> 
                    <form onSubmit={handleSubmit}>
                        <div className="form-header">
                            <div className="title">
                                <h1>CRIAÇÃO DE INGRESSO</h1>
                            </div>
                        </div>

                        <div className="input-group">
                            <div className="input-box">
                                <label htmlFor="nome_ingresso">Nome</label>
                                <input type="text" name="nome_ingresso" placeholder='Ex. Show da Cantora X' value={formDados.nome_ingresso} onChange={handleChange} maxLength='250' required/>
                            </div>

                            <div className="input-box">
                                <label htmlFor="tipo_ingresso">Tipo</label>
                                <input type="text" name="tipo_ingresso" placeholder='Ex. Inteira, Meia, Vip' value={formDados.tipo_ingresso} onChange={handleChange} maxLength='100' required/>
                            </div>

                            <div className="input-box">
                                <label htmlFor="preco_ingresso">Preço</label>
                                <input type="text" name="preco_ingresso" placeholder='Ex. 19,99' value={formDados.preco_ingresso} onChange={handleChange} maxLength='20' required/>
                            </div>

                            <div className="input-box">
                                <label htmlFor="qtd_ingresso">Quantidade</label>
                                <input type="number" name="qtd_ingresso" value={formDados.qtd_ingresso} onChange={handleChange} maxLength='20' required/>
                            </div>

                            <div className="input-box">
                                <label htmlFor="data_ingresso">Data do Evento</label>
                                <input type="text" name="data_ingresso" placeholder='Ex. 12/08/2024' value={formDados.data_ingresso} onChange={handleChange} maxLength='10' required/>
                            </div>
                        </div>
                        <div className='confirm-button'>
                            <button type='submit'>Criar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create