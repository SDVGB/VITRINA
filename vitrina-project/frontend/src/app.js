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
import ProtectedRoute from '../src/components/nav/protectedRoute.jsx';
import Publicaciones from '../src/components/protected-Routes/Publicaciones.jsx';
import Notificaciones from './components/Notificaciones/Notificaciones.jsx';
import Perfil from './components/Perfil/Perfil.jsx'; 
import { useCart } from './components/Carrito/useCart.js';  

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Obtener el estado de autenticación desde el localStorage al iniciar la aplicación
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    // Guardar el estado de autenticación en el localStorage cuando cambie
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const [showModal, setShowModal] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(() => {
    // Aquí puedes obtener el ID del usuario actual desde el localStorage o desde otra fuente
    // Si no existe, usa 'a' como valor predeterminado (deberías ajustar esto según tu lógica)
    return localStorage.getItem('usuarioActual') || ''; 
  });

  useEffect(() => {
    // Guardar el ID del usuario actual en el localStorage cuando cambie
    localStorage.setItem('usuarioActual', usuarioActual);
  }, [usuarioActual]);

  // Hook para manejar el carrito
  const {
    cart,
    showConfirmation,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
    totalItemsInCart
  } = useCart();

  const handleLoginClick = () => {
    // Mostrar el modal de inicio de sesión cuando se haga clic en "Iniciar sesión"
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Cerrar el modal de inicio de sesión
    setShowModal(false);
  };

  return (
    <div id="root">
      {/* Alerta de confirmación */}
      {showConfirmation && (
        <div className="alert alert-success text-center" role="alert">
          Producto agregado al carrito con éxito
        </div>
      )}

      <div className="main-content">
        {/* Mostrar un componente para usuarios logueados */}
        {isAuthenticated && <Logeado setIsAuthenticated={setIsAuthenticated} />}
        
        {/* Barra de navegación */}
        <Navbar 
          onLoginClick={handleLoginClick} 
          isAuthenticated={isAuthenticated} 
          cartItemCount={totalItemsInCart} 
          setIsAuthenticated={setIsAuthenticated} 
        />
        
        {/* Modal de inicio de sesión */}
        <LoginModal show={showModal} handleClose={handleCloseModal} setIsAuthenticated={setIsAuthenticated} />

        <Routes>
          {/* Rutas de la aplicación */}
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/Blog" element={<Blog isAuthenticated={isAuthenticated} />} />
          <Route path="/Ventas" element={<Ventas isAuthenticated={isAuthenticated} handleAddToCart={handleAddToCart} />} />
          <Route path="/Quienes-somos" element={<AboutUs isAuthenticated={isAuthenticated} />} />
          <Route path="/Donaciones" element={<Donaciones isAuthenticated={isAuthenticated} handleAddToCart={handleAddToCart} />} /> {/* Pasar handleAddToCart a Donaciones */}
          <Route path="/notificaciones" element={<Notificaciones usuarioActual={usuarioActual} />} /> {/* Pasar el usuario actual a Notificaciones */}
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/*" element={<Home isAuthenticated={isAuthenticated} />} />

          <Route path="/carrito" element={
            <Carrito
              cart={cart}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          } />
          <Route path="/Publicaciones" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Publicaciones /></ProtectedRoute>} />
        </Routes>
      </div>

      {/* Pie de página */}
      <Footer />
    </div>
  );
}

export default App;
