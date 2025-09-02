import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Control.css';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { API_URL } from '../../config.js';

function Control() {
    const navigate = useNavigate();
    const [consultarDados, setConsultarDados] = useState([]);
    const [openItems, setOpenItems] = useState({});
    const [selecionarCard, setSelecionarCard] = useState();
    const [atualizar, setAtualizar] = useState(true);

    const fetchData = async () => {
        try {
            // Usa a constante API_URL para buscar os dados
            const response = await fetch(`${API_URL}/ingresso`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Dados recebidos:', data);
            setConsultarDados(data);
        } catch (err) {
            console.log('Erro ao Buscar dados do Banco', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [atualizar]);

    const atualizarTela = () => {
        setAtualizar(!atualizar);
    }

    const toggleItem = (index) => {
        setOpenItems(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const handleClick = (id) => {
        setSelecionarCard(id);
        toggleItem(id);
    };

    const handleEdit = () => {
        if (selecionarCard) {
            navigate('/create', { state: { cardId: selecionarCard } });
        } else {
            console.log('Nenhum card selecionado para edição.');
        }
    };
    
    const handleDelete = async () => {
        if (selecionarCard) {
            try {
                const response = await fetch(`${API_URL}/ingresso/${selecionarCard}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`Erro: ${response.status} - ${response.statusText}`);
                }

                console.log('Ingresso deletado com sucesso!');
                setSelecionarCard(null);
                atualizarTela();
            } catch (err) {
                console.log('Erro ao deletar ingresso', err);
            }
        } else {
            console.log('Nenhum card selecionado para exclusão.');
        }
    };

    return (
        <div className='edit_container'>
            <Navbar />
            <div className='edit_wrapper'>
                <div className='edit-content'>
                    <h2 className='title'>Gerenciamento</h2>
                    <ol className='data-table'>
                        {consultarDados.map((linha) => (
                            <li key={linha.idingresso} className={selecionarCard === linha.idingresso ? 'selected' : ''}>
                                <div className='accordion' data-cardName='accordion' onClick={() => handleClick(linha.idingresso)}>
                                <span>Nome: {linha.nome_ingresso}</span>
                                </div>
                                {openItems[linha.idingresso] && (
                                    <div className='accordion-content'>
                                        <span>ID: {linha.idingresso}</span>
                                        <span>Tipo: {linha.tipo_ingresso}</span>
                                        <span>Preço: {linha.preco_ingresso}</span>
                                        <span>Quantidade: {linha.qtd_ingresso}</span>
                                        <span>Data: {linha.data_ingresso}</span>
                                        <span>Local: {linha.local_ingresso}</span>
                                        <span>Descrição: {linha.desc_ingresso}</span>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
                <form className='edit_form'>
                    <div className='edit-buttons'>
                        <button className='show-button' type='button'>Exibir</button>

                        <button className='update-button' state={{ cardId: selecionarCard }} type='button' onClick={handleEdit}>Editar</button>

                        <button className='delete-button' type='button' onClick={handleDelete}>Excluir</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Control;