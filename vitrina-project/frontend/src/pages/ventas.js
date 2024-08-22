import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainContent from '../components/main-ecommerce/mainContent.jsx';

// Componente principal de la aplicación
const Ventas = ({ handleAddToCart }) => {
  return (
    <div className="Ventas">
      <div style={{ minHeight: 'calc(100vh - 120px)' }}>
        <MainContent handleAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};

export default Ventas;
