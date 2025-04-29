import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './layout/Home';
import Cadastro from './layout/Cadastro/Cadastro.jsx';
import Login from './layout/Login/Login.jsx';
import Menu from './layout/Menu/Menu.jsx';
import Create from './layout/Create/Create.jsx';
import TicketSuccess from './layout/Success/ticket_success.jsx';
import Control from './layout/Control/Control.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import { AuthProvider } from './routes/AuthContext.jsx';

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
              <Route path="/success" element={<PrivateRoute element={<TicketSuccess />} />} />
              <Route path="/menu" element={<PrivateRoute element={<Menu />} />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
