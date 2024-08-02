import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Atualize a importação
import './create_module.css';
import Navbar from '../Navbar';

function Create() {
    const navigate = useNavigate(); // Atualize para useNavigate
    const [formDados, setFormDados] = useState({
        event_name: '',
        event_date: '',
        event_location: '',
        event_description: ''
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
            const response = await fetch('http://localhost:3000/events/create', {
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
            setMensagem('Evento criado com sucesso!');
            navigate('/menu'); // Atualize para usar navigate
        } catch (err) {
            console.error('Erro ao enviar', err);
            setMensagem('Erro ao enviar os dados. Por favor, tente novamente.');
        }
    };

    return (
        <div className="create_container">
            <Navbar />
            <div className="create_wrapper">
                <div className="form"> 
                    <form onSubmit={handleSubmit}>
                        <div className="form-header">
                            <div className="title">
                                <h1>CRIAR EVENTO</h1>
                            </div>
                        </div>

                        <div className="input-group">
                            <div className="input-box">
                                <label htmlFor="event_name">Nome do Evento</label>
                                <input type="text" name="event_name" value={formDados.event_name} onChange={handleChange} maxLength='250' required/>
                            </div>

                            <div className="input-box">
                                <label htmlFor="event_date">Data do Evento</label>
                                <input type="date" name="event_date" value={formDados.event_date} onChange={handleChange} required/>
                            </div>

                            <div className="input-box">
                                <label htmlFor="event_location">Local do Evento</label>
                                <input type="text" name="event_location" value={formDados.event_location} onChange={handleChange} maxLength='250' required/>
                            </div>

                            <div className="input-box">
                                <label htmlFor="event_description">Descrição do Evento</label>
                                <input name="event_description" value={formDados.event_description} onChange={handleChange} maxLength='500' required/>
                            </div>
                        </div>

                        <div className='confirm-button'>
                            <button type='submit'>Confirmar</button>
                        </div>

                        {mensagem && <p className="mensagem">{mensagem}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Create;
