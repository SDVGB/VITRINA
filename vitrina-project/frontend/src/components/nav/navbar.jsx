import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import nuevapublicacion from '../../assets/icons/nuevapublicacion.png'
import profile from '../../assets/icons/profile.jpg'
import './navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



const Navbar = ({ onLoginClick, cartItemCount, isAuthenticated }) => {

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
              <>
                <li><Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
                <button className='BlogoUsuario' ><Link to="/Usuario" onClick={toggleMenu}><img src={profile} alt="logo-usuario" className='logoUsuario' /></Link></button>
                {/* Botón que abre el submenú bajo 'Publicaciones' */}
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <img src={nuevapublicacion} alt="logo-publicaciones" className='logoPublicaciones' />
                  </button>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/Publicaciones">Subir video</Link></li>
                    <li><Link className="dropdown-item" to="/Publicaciones">Transmitir en vivo</Link></li>
                    <li><Link className="dropdown-item" to="/Publicaciones">Crear publicación</Link></li>
                  </ul>
                </div>

              </>


            )}
          </ul>
          <div className="navbar-login">
            {!isAuthenticated && (
              <button className="login-button" onClick={onLoginClick}>
                Inicia sesión
              </button>
            )}
          </div>
          <ul className="navbar-links">
            <li>
              <Link to="/carrito" onClick={toggleMenu} className="cart-link">
                <span className="icon-carrito">🛒</span> Mi Carrito ({cartItemCount})
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
