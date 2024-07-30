import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/footer/footer.jsx';
import MainContent from '../components/main-ecommerce/mainContent.jsx';
import Navbar from '../components/nav/navbar.jsx';

// Componente principal de la aplicación
const App = () => {
  return (
    
    <div className="App">
      <Navbar/>
      <div style={{ minHeight: 'calc(100vh - 120px)' }}>
        <MainContent />
      </div>
      <Footer />
    </div>
  );
};

export default App
