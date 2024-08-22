import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/nav/navbar.jsx';
import Footer from './components/footer/footer.jsx';
import Blog from '../src/pages/blog/blog.js';
import Home from '../src/pages/home/home.js';
import Ventas from '../src/pages/ventas.js';
import AboutUs from './pages/about-us/aboutUs.jsx';
import Donaciones from '../src/pages/donaciones.js';
import Logeado from '../src/components/login/logeado.jsx';
import LoginModal from '../src/components/login/loginmodal.jsx';
import ProtectedRoute from '../src/components/nav/protectedRoute.jsx';  // Importa el componente de ruta protegida
import Dashboard from './components/protected-Routes/Dashboard.jsx';  // Importa el nuevo componente seguro

function App() {
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {isAuthenticated && <Logeado setIsAuthenticated={setIsAuthenticated} />}
      {/* Se monta Logeado en todas las rutas si el usuario está autenticado */}
      
      <Navbar onLoginClick={handleLoginClick} isAuthenticated={isAuthenticated} />
      <LoginModal show={showModal} handleClose={handleCloseModal} setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route path="/Blog" element={<Blog isAuthenticated={isAuthenticated} />} />
        <Route path="/Ventas" element={<Ventas isAuthenticated={isAuthenticated} />} />
        <Route path="/Quienes-somos" element={<AboutUs isAuthenticated={isAuthenticated} />} />
        <Route path="/Donaciones" element={<Donaciones isAuthenticated={isAuthenticated} />} />

        {/* Ruta Protegida */}
        <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard /></ProtectedRoute>} 
        />

        <Route path="/*" element={<Home isAuthenticated={isAuthenticated} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
