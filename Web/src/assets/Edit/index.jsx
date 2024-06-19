import React, { useState, useEffect } from 'react';
import './edit_module.css'
import Navbar from '../Navbar';

function Edit({ setCurrentPage }) {

    //READ
    const [consultarDados, setConsultarDados] = useState([]);
    const [openItems, setOpenItems] = useState({});
    const [selecionarCard, setSelecionarCard] = useState();
    const [atualizar, setAtualizar] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/ingresso', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            console.log(data)
            setConsultarDados(data);
        } catch (err) {
            console.log('Erro ao Buscar dados do Banco', err);
        }
    };

    const [formDados, setFormDados] = useState({
        id: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDados(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleClick = (id) => {
        setSelecionarCard(selecionarCard === id ? null : id);
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        if (selecionarCard) {
            try {
                const response = await fetch(`http://localhost:3000/ingresso/${selecionarCard}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
                const json = await response.json();
                console.log(response);
                console.log(json);
                setSelecionarCard(null);
                atualizarTela();
            } catch (err) {
                console.log(err);
            }
        }
    };

    const toggleItem = (index) => {
        setOpenItems(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    useEffect(() => {
        handleSubmit(); //Busca do BD para carregar o componente
    }, []); //enviar array vazio para garantir execução unica

    return (
        <div className='edit_container'>
            <Navbar setCurrentPage={setCurrentPage}/>
            <div className='edit_wrapper'>
                <div className='edit-content'>
                    <ol className='data-table'>
                        {consultarDados.map((linha, index) => (
                            <li key={index}>
                                <div className='accordion' onClick={() => toggleItem(index)}>
                                    <span>Nome: {linha.nome_ingresso}</span>
                                </div>
                                {openItems[index] && (
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
                <form className='edit_form' onSubmit={handleSubmit}>
                    <div className='edit-buttons'>
                        <button className='show-button' type='submit'>Exibir</button>
                        <button className='update-button' state={selecionarCard}>Editar</button>
                        <button className='delete-button' onClick={handleDelete}>Excluir</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Edit;