import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './assets/Home';
import Cadastro from './assets/Cadastro';
import Login from './assets/Login';
import Menu from './assets/Menu';
import Create from './assets/Create';
import SucessIngresso from './assets/Resolver/pages/ingresso.jsx';
import Control from './assets/Control/index.jsx';
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
