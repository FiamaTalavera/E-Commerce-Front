import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ updateUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError('El correo electrónico es obligatorio.');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('El correo electrónico no es válido.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('La contraseña es obligatoria.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateEmail();
    validatePassword();

    if (!emailError && !passwordError) {
      axios
        .post(`${process.env.REACT_APP_URLBACK}/user/login`, {
          email,
          password,
        }, {withCredentials:true})
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("user", JSON.stringify(res.data));
            updateUser(res.data);
            navigate("/");
            toast.success('Bienvenid@!')
          } else {
            toast.error("Contraseña incorrecta o error de inicio de sesión");
          }
        })
        .catch((error) => {
          if (error.response) {
            const errorMessage = error.response.data.message || "Error de inicio de sesión";
            toast.error(errorMessage);
          } else {
            console.error("Error de inicio de sesión:", error);
            toast.error('Error de inicio de sesión');
          }
        });
    }
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
                    className={`input ${emailError ? 'is-danger' : ''}`}
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={validateEmail}
                    required
                  />
                </div>
                {emailError && <p className="help is-danger">{emailError}</p>}
              </div>
              <div className="field">
                <label className="label">Contraseña</label>
                <div className="control">
                  <input
                    className={`input ${passwordError ? 'is-danger' : ''}`}
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={validatePassword}
                    required
                  />
                </div>
                {passwordError && <p className="help is-danger">{passwordError}</p>}
              </div>
              <div className="field">
                <div className="control">
                  <button
                    className="button is-primary"
                    onClick={handleSubmit}
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