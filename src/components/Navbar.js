import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Diseño sin título.png";
import axios from "axios";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:3001/user/logout")
      .then((response) => {
        if (response.status === 204) {
          setIsAuthenticated(false);
        } else {
          console.error("Error al cerrar sesión");
        }
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src={logo} width="30" height="200" alt="logo" />
        </Link>

        <button
          onClick={toggleNavbar}
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={isActive ? "true" : "false"}
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item has-dropdown is-hoverable">
            <Link className="navbar-link" to="#">
              Bebidas
            </Link>

            <div className="navbar-dropdown">
              <Link className="navbar-item" to="#">
                Cafetería
              </Link>
              <Link className="navbar-item" to="#">
                Jugos
              </Link>
              <Link className="navbar-item" to="#">
                Licuados
              </Link>
              <hr className="navbar-divider" />
              <Link className="navbar-item" to="#">
                Todo
              </Link>
            </div>
          </div>

          <div className="navbar-item has-dropdown is-hoverable">
            <Link className="navbar-link" to="#">
              Dulces
            </Link>

            <div className="navbar-dropdown">
              <Link className="navbar-item" to="#">
                Tortas
              </Link>
              <Link className="navbar-item" to="#">
                Galletas
              </Link>
              <Link className="navbar-item" to="#">
                Panadería
              </Link>
              <hr className="navbar-divider" />
              <Link className="navbar-item" to="#">
                Todo
              </Link>
            </div>
          </div>

          <div className="navbar-item has-dropdown is-hoverable">
            <Link className="navbar-link" to="#">
              Salados
            </Link>

            <div className="navbar-dropdown">
              <Link className="navbar-item" to="#">
                Sandwiches
              </Link>
              <Link className="navbar-item" to="#">
                Tostones
              </Link>
              <Link className="navbar-item" to="#">
                Panificados
              </Link>
              <hr className="navbar-divider" />
              <Link className="navbar-item" to="#">
                Todo
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          {isAuthenticated ? (
            <div className="navbar-item">
              <div className="buttons">
                <button className="button is-danger" onClick={handleLogout}>
                  Salir
                </button>
                <Link className="button is-primary" to="/order">
                  Carrito
                </Link>
              </div>
            </div>
          ) : (
            <div className="navbar-item">
              <div className="buttons">
                <Link className="button is-primary" to="/user/register">
                  <strong>Registrarse</strong>
                </Link>
                <Link className="button is-light" to="/user/login">
                  Ingresar
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
