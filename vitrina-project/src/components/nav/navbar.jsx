import React from 'react';
import './navbar.css'; // Asegúrate de crear un archivo CSS para estilizar el Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">V I T R I N A</a>
      </div>
      <div className="navbar-menu">
        <ul className="navbar-links">
          <li><a href="/blog">Blog</a></li>
          <li><a href="/ventas">Ventas</a></li>
          <li><a href="/donaciones">Donaciones</a></li>
          <li><a href="/quienes-somos">Quiénes Somos</a></li>
        </ul>
        <div className="navbar-login">
          <button className="login-button">Inicia sesión</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
