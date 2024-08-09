import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/nav/navbar.jsx';
import Footer from './components/footer/footer.jsx';
import Blog from '../src/pages/blog/blog.js';
import Home from '../src/pages/home/home.js';
import Ventas from '../src/pages/ventas.js';
import AboutUs from './pages/about-us/aboutUs.jsx';
import Donaciones from '../src/pages/donaciones.js'

// Componente principal de la aplicación
function App() {
  return (
    <div>
      <Navbar />
      
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

