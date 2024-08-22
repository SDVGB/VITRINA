import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './navbar.css'; 

const Navbar = ({ onLoginClick, isAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">V I T R I N A</Link>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li><Link to="/Blog" onClick={toggleMenu}>Blog</Link></li>
            <li><Link to="/Ventas" onClick={toggleMenu}>Ventas</Link></li>
            <li><Link to="/Donaciones" onClick={toggleMenu}>Donaciones</Link></li>
            <li><Link to="/Quienes-somos" onClick={toggleMenu}>Quiénes Somos</Link></li>
            
            {/* Enlace al Dashboard solo si el usuario está autenticado */}
            {isAuthenticated && (
              <li><Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
            )}
          </ul>
          <div className="navbar-login">
            {!isAuthenticated && (
              <button className="login-button" onClick={onLoginClick}>
                Inicia sesión
              </button>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  ); 
}

export default Navbar;
