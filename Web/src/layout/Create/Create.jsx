import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Create.css';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { API_URL } from '../../config.js';

function Create() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cardId } = location.state || {};

    const [formDados, setFormDados] = useState({
        event_name: '',
        event_date: '',
        event_location: '',
        event_description: '',
        ticket_type: '',
        ticket_price: '',
        ticket_amount: '',
        ativo_ingresso: ''
    });

    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        if (cardId) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`${API_URL}/ingresso/${cardId}`);
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
        const url = cardId 
            ? `${API_URL}/ingresso/${cardId}` 
            : `${API_URL}/ingresso`;

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

    // formatador de moeda
    const currencyFormatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    // função de preço movida para dentro do componente
    const handlePriceChange = (e) => {
        let value = e.target.value;

        value = value.replace(/\D/g, "");

        if (value === "") {
            setFormDados((prev) => ({ ...prev, ticket_price: "" }));
            return;
        }

        const numericValue = Number(value) / 100;
        
        setFormDados((prev) => ({
            ...prev,
            ticket_price: currencyFormatter.format(numericValue),
        }));
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

                            <div className="input-box">
                                <label htmlFor="ticket_type">Tipo do Ingresso</label>
                                <input type="text" name="ticket_type" value={formDados.ticket_type} onChange={handleChange} maxLength='250' required/>
                            </div>

                            <div className="input-box">
                                <label htmlFor="ticket_price">Preço do Ingresso</label>
                                <input type="text" name="ticket_price" value={formDados.ticket_price} onChange={handlePriceChange} maxLength='250' required/>
                            </div>

                            <div className="input-box">
                                <label htmlFor="ticket_amount">Quantidade de Ingressos</label>
                                <input type="number" name="ticket_amount" value={formDados.ticket_amount} onChange={handleChange} maxLength='250' required/>
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
