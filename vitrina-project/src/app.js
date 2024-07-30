import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/nav/navbar.jsx';
import Footer from './components/footer/footer.jsx';
import Blog from '../src/pages/blog.js';
import Home from '../src/pages/home.js';

// Componente principal de la aplicación
function App() {
  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

