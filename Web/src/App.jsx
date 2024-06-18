import React, { useState } from 'react';
import './App.css'
import Home from './assets/Home';
import Cadastro from './assets/Cadastro';
import Login from './assets/Login';
import Menu from './assets/Menu';
import Create from './assets/Create';
import SucessIngresso from './assets/SucessPages/pages/ingresso.jsx';

function App() {
  
  const [currentPage, setCurrentPage] = useState();
  const [currentIngresso, setCurrentIngresso] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
        case 'home':
            return <Home setCurrentPage={setCurrentPage}/>;
        case 'cadastro':
            return <Cadastro setCurrentPage={setCurrentPage}/>;
        case 'login':
            return <Login setCurrentPage={setCurrentPage}/>;
        case 'menu':
            return <Menu setCurrentPage={setCurrentPage}/>;
        case 'create':
            return <Create setCurrentPage={setCurrentPage}/>;
        case 'sucessIngresso':
            return <SucessIngresso setCurrentPage={setCurrentPage} currentIngresso={currentIngresso}/>;
    default:
        return <Home setCurrentPage={setCurrentPage}/>;
    }
}

  return (
    <div className="App">
      <main>
        {renderPage()}
      </main>
    </div>
  )
}

export default App