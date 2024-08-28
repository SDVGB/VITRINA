import React, { useState, useEffect  } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import nuevapublicacion from '../../assets/icons/nuevapublicacion.png';
import defaultProfile from '../../assets/img/default_profile.png';
import notification from '../../assets/icons/notification.png';
import './navbar.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const Navbar = ({ onLoginClick, cartItemCount, isAuthenticated, setIsAuthenticated, profileImage, setProfileImage, userRole }) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  useEffect(() => {
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
      setProfileImage(savedProfileImage); 
    } else {
      setProfileImage(defaultProfile); 
    }
  }, [setProfileImage]);

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
            {isAuthenticated && (
              <>
                <div className="navbar-icons">
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-primary2 dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <img src={notification} alt="icono-notificaciones" className='logoNotificaciones' />
                    </button>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/notificaciones">Ver Notificaciones</Link></li>
                    </ul>
                  </div>
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-primary2 dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <img src={nuevapublicacion} alt="logo-publicaciones" className='logoPublicaciones' />
                    </button>
                    <ul className="dropdown-menu">
                      {/* Esta opción es visible solo para los administradores */}
                      {userRole === 'Admin' && (
                        <li><Link className="dropdown-item" to="/Articulos">Subir Artículo</Link></li>
                      )}
                      {/* Esta opción es visible para todos los usuarios autenticados */}
                      <li><Link className="dropdown-item" to="/Publicaciones">Crear Publicación</Link></li>
                    </ul>
                  </div>
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-primary2 dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <img src={profileImage || defaultProfile} alt="logo-usuario" className='logoUsuario' />
                    </button>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/perfil">Mi perfil</Link></li>
                      <li><Link className="dropdown-item" to="/mensajeria">Buzón</Link></li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}>
                          Cerrar sesión
                        </button>
                      </li>
                    </ul>
                  </div>
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