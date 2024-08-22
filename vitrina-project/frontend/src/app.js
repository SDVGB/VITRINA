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
import Carrito from '../src/components/Carrito/Carrito.jsx';
import ProtectedRoute from '../src/components/nav/protectedRoute.jsx';  // Importa el componente de ruta protegida
import Dashboard from './components/protected-Routes/Dashboard.jsx';  // Importa el nuevo componente seguro

// Componente principal de la aplicación
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);


  const [showModal, setShowModal] = useState(false);
  
  // Hook para manejar el carro
  const {
    cart,
    showConfirmation,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
    totalItemsInCart
  } = useCart(); 

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div id="root">
      

      {/* Mostrar mensaje de confirmación */}
      {showConfirmation && (
        <div className="alert alert-success text-center" role="alert">
          Producto agregado al carrito con éxito
        </div>
      )}
      

      <div className="main-content">
        {isAuthenticated && <Logeado setIsAuthenticated={setIsAuthenticated} />}
        {/* Se monta Logeado en todas las rutas si el usuario está autenticado */}
        <Navbar onLoginClick={handleLoginClick} isAuthenticated={isAuthenticated} cartItemCount={totalItemsInCart} />
        <LoginModal show={showModal} handleClose={handleCloseModal} setIsAuthenticated={setIsAuthenticated} />

        <Routes>
          
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/Blog" element={<Blog isAuthenticated={isAuthenticated} />} />
          <Route path="/Ventas" element={<Ventas isAuthenticated={isAuthenticated} handleAddToCart={handleAddToCart} />} />
          <Route path="/Quienes-somos" element={<AboutUs isAuthenticated={isAuthenticated} />} />
          <Route path="/Donaciones" element={<Donaciones isAuthenticated={isAuthenticated} />} />
          <Route path="/*" element={<Home isAuthenticated={isAuthenticated} />} />
          
          <Route path="/carrito" element={
            <Carrito
              cart={cart}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          } />
          {/* Ruta Protegida */}
          <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard /></ProtectedRoute>} 
        />
        </Routes>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
