import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post('/login', { email, password })
      .then((response) => {
        if (response.status === 200) {
          navigate('/');
        } else {
          console.error('Error de inicio de sesión');
        }
      })
      .catch((error) => {
        console.error('Error de red o del servidor:', error);
      });
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-one-third">
            <h1 className="title is-3">Iniciar sesión</h1>
            <form>
              <div className="field">
                <label className="label">Correo electrónico</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Contraseña</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button
                    className="button is-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                  >
                    Iniciar sesión
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;