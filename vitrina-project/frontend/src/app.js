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
import CrearArticulo from '../src/components/protected-Routes/Articulos.jsx';
import Notificaciones from './components/Notificaciones/Notificaciones.jsx';
import Perfil from './components/Perfil/Perfil.jsx'; 
import { useCart } from './components/Carrito/useCart.js';  

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || '';
  });

  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('profileImage') || '/assets/img/default_profile.png';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);


  useEffect(() => {
    if (profileImage) {
      localStorage.setItem('profileImage', profileImage);
    }
  }, [profileImage]);

  const [showModal, setShowModal] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(() => {
    return localStorage.getItem('usuarioActual') || ''; 
  });
  

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('usuarioActual', usuarioActual);
  }, [usuarioActual]);


  const handleLoginSuccess = (role, userId) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUsuarioActual(userId); // Actualiza el estado de usuario actual
  };

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Hook para manejar el carrito

  const {
    cart,
    showConfirmation,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
    totalItemsInCart
  } = useCart();



  return (
    <div id="root">
      {showConfirmation && (
        <div className="alert alert-success text-center" role="alert">
          Producto agregado al carrito con éxito
        </div>
      )}

      <div className="main-content">


        {isAuthenticated && <Logeado setIsAuthenticated={setIsAuthenticated} setProfileImage={setProfileImage} userRole={userRole}  />}

        
        <Navbar 
          onLoginClick={handleLoginClick} 
          isAuthenticated={isAuthenticated} 
          userRole={userRole}  // Asegúrate de pasar userRole aquí
          cartItemCount={totalItemsInCart} 
          setIsAuthenticated={setIsAuthenticated} 
          profileImage={profileImage} 
          setProfileImage={setProfileImage}  // Pass setProfileImage to Navbar
        />
        


     
          

        <LoginModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        setIsAuthenticated={setIsAuthenticated}
        setUserRole={setUserRole} 
        setUsuarioActual={setUsuarioActual} // Pasar función para actualizar usuarioActual /
        />

        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} userRole={userRole} />} />
          <Route path="/Blog" element={<Blog isAuthenticated={isAuthenticated} userRole={userRole} />} />

          <Route path="/Ventas" element={<Ventas isAuthenticated={isAuthenticated} handleAddToCart={handleAddToCart} />} />
          <Route path="/Quienes-somos" element={<AboutUs isAuthenticated={isAuthenticated} />} />
          <Route path="/Donaciones" element={<Donaciones isAuthenticated={isAuthenticated} handleAddToCart={handleAddToCart} />} />
          <Route path="/notificaciones" element={<Notificaciones usuarioActual={usuarioActual} />} />


          <Route path="/perfil" element={<Perfil setProfileImage={setProfileImage} />} />
          <Route path="/*" element={<Home isAuthenticated={isAuthenticated} />} />

          <Route path="/carrito" element={<Carrito
              cart={cart}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          } />
          
          <Route path="/Publicaciones" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Publicaciones />
            </ProtectedRoute>
          } />
          
          
          <Route path="/Articulos" element={
            <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} requiredRole="Admin">
              <CrearArticulo />
            </ProtectedRoute>
          } />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;