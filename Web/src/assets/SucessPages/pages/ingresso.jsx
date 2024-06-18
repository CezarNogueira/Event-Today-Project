import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import '../styles/s_ingresso_module.css';

function SucessIngresso({ setCurrentPage, currentIngresso }) {
    return (
        <div className="sucesso_ingresso_container">
            <div className="sucesso_ingresso_wrapper">
                <div onClick={() => setCurrentPage('menu')} className="back-arrow-box"><FaArrowLeft className="back-arrow" /></div>
                <div className="success-message">
                    <h1>Ingresso Criado com Sucesso!</h1>
                    <p>Detalhes do Ingresso:</p>
                    {currentIngresso && (
                        <>
                            <p>Nome: {currentIngresso.nome_ingresso}</p>
                            <p>Tipo: {currentIngresso.tipo_ingresso}</p>
                            <p>Preço: {currentIngresso.preco_ingresso}</p>
                            <p>Quantidade: {currentIngresso.qtd_ingresso}</p>
                            <p>Data do Evento: {currentIngresso.data_ingresso}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SucessIngresso;