import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainContentDonaciones from '../components/Main-Donaciones/MainContentDonaciones.jsx';


// Componente principal de la aplicación
const Donaciones = ({ handleAddToCart }) => {
  return (
    <div className="donaciones">
      <div style={{ minHeight: 'calc(100vh - 120px)' }}>
        <MainContentDonaciones handleAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};

export default Donaciones;