import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/nav/navbar.jsx';
import Footer from '../components/footer/footer.jsx';
import MainContent from '../components/main/mainContent.jsx';
import Blog from './blog.js';

// Componente principal de la aplicación
function App() {
  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/blog" element={<Blog />} />
      </Routes>

    </div>
  );

};

export default App
