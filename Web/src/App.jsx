import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './assets/pages/Home';
import Cadastro from './assets/pages/Cadastro/Cadastro.jsx';
import Login from './assets/pages/Login/Login.jsx';
import Menu from './assets/pages/Menu/Menu.jsx';
import Create from './assets/pages/Create/Create.jsx';
import SucessIngresso from './assets/pages/Resolver/pages/ingresso.jsx';
import Control from './assets/pages/Control/Control.jsx';
import PrivateRoute from './assets/routes/PrivateRoute.jsx';
import { AuthProvider } from './assets/routes/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/create" element={<PrivateRoute element={<Create />} />} />
              <Route path="/control" element={<PrivateRoute element={<Control />} />} />
              <Route path="/sucess" element={<PrivateRoute element={<SucessIngresso />} />} />
              <Route path="/menu" element={<PrivateRoute element={<Menu />} />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
