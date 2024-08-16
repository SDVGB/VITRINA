import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/nav/navbar.jsx';
import Footer from './components/footer/footer.jsx';
import Blog from '../src/pages/blog/blog.js';
import Home from '../src/pages/home/home.js';
import Ventas from '../src/pages/ventas.js';
import AboutUs from './pages/about-us/aboutUs.jsx';
import Donaciones from '../src/pages/donaciones.js';
import LoginModal from './components/login/loginmodal.jsx'; // Importa el LoginModal

// Componente principal de la aplicación
function App() {
  // Estado para controlar la visibilidad del modal de inicio de sesión
  const [showModal, setShowModal] = useState(false);

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navbar onLoginClick={handleLoginClick} />
      <LoginModal show={showModal} handleClose={handleCloseModal} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Ventas" element={<Ventas />} />
        <Route path="/Quienes-somos" element={<AboutUs />} />
        <Route path="/Donaciones" element={<Donaciones />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
