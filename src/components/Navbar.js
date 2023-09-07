import React from "react";
import logo from "../assets/logo.png"

const Navbar = () => {
  return (
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
    <img src={logo} width="112" height="28" alt="logo"></img>
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
    <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          Bebidas
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            Cafetería
          </a>
          <a class="navbar-item">
            Jugos
          </a>
          <a class="navbar-item">
            Licuados
          </a>
          <hr class="navbar-divider"></hr>
          <a class="navbar-item">
            Todo
          </a>
        </div>
      </div>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          Dulces
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            Tortas
          </a>
          <a class="navbar-item">
            Galletas
          </a>
          <a class="navbar-item">
            Panadería
          </a>
          <hr class="navbar-divider"></hr>
          <a class="navbar-item">
            Todo
          </a>
        </div>
      </div>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          Salados
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            Sandwiches
          </a>
          <a class="navbar-item">
            Tostones
          </a>
          <a class="navbar-item">
            Panificados
          </a>
          <hr class="navbar-divider"></hr>
          <a class="navbar-item">
            Todo
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
  )
}

export default Navbar