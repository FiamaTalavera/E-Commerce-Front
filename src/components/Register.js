import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    last_name: "",
    address: "",
    snippet: "",
  });

  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_URLBACK}/user/register`, data)
      .then((response) => {
        toast.success('Registro exitoso!')
        setIsRegistered(true);
        navigate("/user/login");
      })
      .catch((error) => {
        toast.error('Error de registro')
        console.error(error);
      });
  };

  if (isRegistered) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label for="name">Nombre: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label for="email">Correo electrónico: </label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label for="password">Contraseña: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label for="last_name">Apellido: </label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={data.last_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label for="adress">Dirección: </label>
        <input
          type="text"
          id="address"
          name="address"
          value={data.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label for="snippet">Admin: </label>
        <input
          type="text"
          id="snippet"
          name="snippet"
          value={data.snippet}
          onChange={handleChange}
        />
      </div>

      <button className="button is primary" type="submit">
        Registrarse
      </button>
    </form>
  );
};

export default Register;
