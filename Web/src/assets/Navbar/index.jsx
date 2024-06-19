import React, { useState } from 'react';
import './navbar_module.css';
import { FaArrowLeft } from "react-icons/fa";

function Navbar ({ setCurrentPage }) {

    return ( 
        <header>
            <nav>
                <div onClick={() => setCurrentPage('menu')} className="back-arrow-box"><FaArrowLeft className="back-arrow" /></div>
                <div className='nav-text-wrapper'>
                    <h2 className='title'>EVENT TODAY</h2>
                </div>
                <div className='nav-space'></div>
            </nav>
        </header>
    );
}

export default Navbar;