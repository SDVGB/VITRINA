import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainContentDonaciones from '../components/Main-Donaciones/MainContentDonaciones.jsx';


// Componente principal de la aplicación
const donaciones = () => {
  return (
    
    <div className="donaciones">
      <div style={{ minHeight: 'calc(100vh - 120px)' }}>
        <MainContentDonaciones />
      </div>
    </div>
  );
};

export default donaciones