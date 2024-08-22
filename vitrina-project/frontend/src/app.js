import React, { useState } from 'react';
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
import { useCart } from '../src/components/Carrito/useCart.js';

// Componente principal de la aplicación
function App() {
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
      <Navbar onLoginClick={handleLoginClick} cartItemCount={totalItemsInCart} />
      <LoginModal show={showModal} handleClose={handleCloseModal} />

      {/* Alerta de confirmacion */}
      {showConfirmation && (
        <div className="alert alert-success text-center" role="alert">
          Producto agregado al carrito con éxito
        </div>
      )}

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Ventas" element={<Ventas handleAddToCart={handleAddToCart} />} />
          <Route path="/Quienes-somos" element={<AboutUs />} />
          <Route path="/Donaciones" element={<Donaciones />} />
          <Route path="/logeado" element={<Logeado />} />
          <Route path="/carrito" element={
            <Carrito
              cart={cart}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          } />
        </Routes>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
