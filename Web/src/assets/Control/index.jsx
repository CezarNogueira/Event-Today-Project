import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './control_module.css';
import Navbar from '../Navbar';

function Control() {
    const navigate = useNavigate();
    const [consultarDados, setConsultarDados] = useState([]);
    const [openItems, setOpenItems] = useState({});
    const [selecionarCard, setSelecionarCard] = useState();
    const [atualizar, setAtualizar] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/ingresso', {
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
        fetchData(); // Chama a função fetchData ao montar o componente
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
        toggleItem(id);
        console.log("Card clicado:", id);
        setSelecionarCard(selecionarCard === id ? null : id);
    };

    const handleDelete = async () => {
        if (selecionarCard) {
            try {
                const response = await fetch(`http://localhost:3000/ingresso/${selecionarCard}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const json = await response.json();
                console.log(response);
                console.log(json);
                setSelecionarCard(null);
                atualizarTela();
            } catch (err) {
                console.log('Erro ao excluir', err);
            }
        }
    };

    const handleEdit = () => {
        console.log("SelecionarCard:", selecionarCard); // Adicione um log para verificar o cardId selecionado
        if (selecionarCard) {
            navigate('/create', { state: { cardId: selecionarCard } });
        } else {
            console.log("Nenhum card selecionado para editar.");
        }
    };

    return (
        <div className='edit_container'>
            <Navbar />
            <div className='edit_wrapper'>
                <div className='edit-content'>
                    <ol className='data-table'>
                        {consultarDados.map((linha) => (
                            <li key={linha.idingresso}>
                                <div className='accordion' onClick={() => handleClick(linha.idingresso)}>
                                <span>Nome: {linha.nome_ingresso}</span>
                                </div>
                                {openItems[linha.idingresso] && (
                                    <div className='accordion-content'>
                                        <span>ID: {linha.idingresso}</span>
                                        <span>Tipo: {linha.tipo_ingresso}</span>
                                        <span>Preço: {linha.preco_ingresso}</span>
                                        <span>Quantidade: {linha.qtd_ingresso}</span>
                                        <span>Data: {linha.data_ingresso}</span>
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
