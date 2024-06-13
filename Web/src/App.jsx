import React, { useState } from 'react';
import './App.css'
import Home from './assets/Home';
import Cadastro from './assets/Cadastro';

function App() {
  
  const [currentPage, setCurrentPage] = useState();

  const renderPage = () => {
    switch (currentPage) {
        case 'home':
            return <Home setCurrentPage={setCurrentPage}/>;
        case 'cadastro':
            return <Cadastro />;
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