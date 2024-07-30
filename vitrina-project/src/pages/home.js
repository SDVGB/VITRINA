import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap aquí
import Footer from '../components/footer/footer.jsx';
/* import MainContent from '../components/main/mainContent.jsx';  */
import Navbar from '../components/nav/navbar.jsx';
import Blog from '../components/blog/blog.jsx';
 
// Componente principal de la aplicación
const App = () => {
  return (
    
    <div className="App">
      <Navbar/>
      <div style={{ minHeight: 'calc(100vh - 120px)' }}>
        <Blog />
      </div>
      <Footer />
    </div>
  );
};

export default App
