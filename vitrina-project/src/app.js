import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/nav/navbar.jsx';
import Footer from './components/footer/footer.jsx';
import Blog from '../src/pages/blog/blog.js';
import Home from '../src/pages/home.js';
import Ventas from '../src/pages/ventas.js';
<<<<<<< Updated upstream
import AboutUs from './pages/about-us/aboutUs.jsx';
=======
import Donaciones from '../src/pages/donaciones.js'
>>>>>>> Stashed changes

// Componente principal de la aplicación
function App() {
  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/Ventas" element={<Ventas />} />
<<<<<<< Updated upstream
        <Route path="/quienes-somos" element={<AboutUs />} />
=======
        <Route path="/Donaciones" element={<Donaciones />} />
>>>>>>> Stashed changes
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

