import React from 'react';

const Login = () => {
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
                  <input className="input" type="email" placeholder="correo@example.com" />
                </div>
              </div>
              <div className="field">
                <label className="label">Contraseña</label>
                <div className="control">
                  <input className="input" type="password" placeholder="Contraseña" />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-primary">Iniciar sesión</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;