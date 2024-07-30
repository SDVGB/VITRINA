import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainContent from '../components/main-ecommerce/mainContent.jsx';


// Componente principal de la aplicación
const Home = () => {
  return (
    
    <div className="Home">
      <div style={{ minHeight: 'calc(100vh - 120px)' }}>
        <MainContent />
      </div>
    </div>
  );
};

export default Home