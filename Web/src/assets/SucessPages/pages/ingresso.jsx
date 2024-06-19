import React from 'react';
import '../sucess_module.css';
import Navbar from '../../Navbar';

function SucessIngresso({ setCurrentPage }) {
    return (
        <div className="sucess_container">
            <Navbar setCurrentPage={setCurrentPage}/>
            <div className="sucess_wrapper">
                <div className="title">
                    <h1>Ingresso Criado com Sucesso!</h1>
                </div>
            </div>
        </div>
    );
}

export default SucessIngresso;