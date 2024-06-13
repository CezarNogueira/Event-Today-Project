import './home_module.css';

function Home ({ setCurrentPage }) {
    return (
      <div className="home-wrapper">
        <div className="reception-text">
          <div className="text-wrapper">Bem-vindo</div>
          <p className="p">Vá para qualquer evento que desejar com a Event Today</p>
        </div>
        <div className="home-buttons">
            <button className="login-button">Login</button>
            <button className="registration-button">Cadastro</button>
        </div>
      </div>
  );
}

export default Home;