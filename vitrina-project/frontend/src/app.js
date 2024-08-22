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

function App() {
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para mostrar el mensaje de confirmación

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    setShowConfirmation(true); // Mostrar el mensaje de confirmación
    setTimeout(() => {
      setShowConfirmation(false); // Ocultar el mensaje después de 3 segundos
    }, 3000);
  };

  const handleIncrement = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // Contar la cantidad total de productos en el carrito
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div id="root">
      <Navbar onLoginClick={handleLoginClick} cartItemCount={totalItemsInCart} />
      <LoginModal show={showModal} handleClose={handleCloseModal} />

      {/* Mostrar mensaje de confirmación */}
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
