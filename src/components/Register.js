import React from "react";

const Register = () => {
  return (
    <form>
      <div className="form-group">
        <label for="name">Nombre: </label>
        <input type="text" id="name" name="nombre" required /> // required = no
        permite enviar el formulario si el campo esta vacio
      </div>

      <div className="form-group">
        <label for="email">Correo electrónico: </label>
        <input type="email" id="email" name="email" required />
      </div>

      <div className="form-group">
        <label for="password">Contraseña: </label>
        <input type="password" id="password" name="contrasena" required />
      </div>

      <div className="form-group">
        <label for="last_name">Apellido: </label>
        <input type="text" id="last_name" name="apellido" required />
      </div>

      <div className="form-group">
        <label for="adress">Dirección: </label>
        <input type="text" id="adress" name="direccion" required />
      </div>

      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;
