import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './create_module.css';
import Navbar from '../Navbar';

function Create() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cardId } = location.state || {};

    const [formDados, setFormDados] = useState({
        event_name: '',
        event_date: '',
        event_location: '',
        event_description: ''
    });

    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        if (cardId) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/events/${cardId}`);
                    if (!response.ok) {
                        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
                    }
                    const data = await response.json();
                    setFormDados({
                        event_name: data.event_name,
                        event_date: data.event_date,
                        event_location: data.event_location,
                        event_description: data.event_description
                    });
                } catch (err) {
                    console.log('Erro ao buscar dados do evento', err);
                }
            };
            fetchData();
        }
    }, [cardId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDados(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = cardId ? 'PUT' : 'POST';
        const url = cardId ? `http://localhost:3000/events/${cardId}` : 'http://localhost:3000/events/create';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDados)
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.status} - ${response.statusText}`);
            }

            const json = await response.json();
            console.log(json);
            setMensagem(cardId ? 'Evento atualizado com sucesso!' : 'Evento criado com sucesso!');
            navigate('/menu');
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
                                <h1>{cardId ? `Editar Ingresso - ID: ${cardId}` : 'Criar Ingresso'}</h1>
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
