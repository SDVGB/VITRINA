import React from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faInstagram, faSquareXTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {  // defino footer  con una funcion de flecha  y un return para que devuelva un jsx con la estructura
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>VITRINA</h2>
          <p>contacto@vitrina.com</p>
        </div>
        <div className="footer-section">
          <h3>Subscribe</h3>
          <div className="subscribe-form">
            <input type="email" placeholder="Ingresa tu correo" />
            <button>Suscribirse</button>
          </div>
          <p className="policy-text">
            By subscribing you agree to with our <a href="/privacy-policy">Privacy Policy</a><br />
            Al suscribirte aceptas nuestra <a href="/privacy-policy">Política de privacidad</a>
          </p>
        </div>
        <div className="footer-section">
          <div className="social-icons">
            <a href="#">
              <FontAwesomeIcon icon={faSquareFacebook} className="social-icon" />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} className="social-icon" />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faSquareXTwitter} className="social-icon" />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/cookies-settings">Cookies Settings</a>
        </div>
        <div className="footer-copyright">
          <p>&copy; 2024 Vitrina. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;  // se exporta para poder usarlo y llamarlo con import
