import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet} from 'react-router-dom';
import './navbar.css'; // Asegúrate de crear un archivo CSS para estilizar el Navbar

const Navbar = ({ onLoginClick }) => {
  return (
      <div>
        <nav className="navbar">
          <div className="navbar-logo">
            <Link to="/">V I T R I N A</Link>
          </div>
          <div className="navbar-menu">
            <ul className="navbar-links">
              <li><Link to="/Blog">Blog</Link></li>
              <li><Link to="/Ventas">Ventas</Link></li>
              <li><Link to="/Donaciones">Donaciones</Link></li>
              <li><Link to="/Quienes-somos">Quiénes Somos</Link></li>
            </ul>
            <div className="navbar-login">
              <button className="login-button" onClick={onLoginClick}>Inicia sesión</button>
            </div>
          </div>
        </nav>
        <Outlet/>
      </div> 
  ); 
}

export default Navbar;
