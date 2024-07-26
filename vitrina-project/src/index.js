import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap aquí
import './index.css'; // Asegúrate de que este archivo exista
import Footer from './components/footer/footer'; // No cambiar este import
import MainContent from './components/main/mainContent';

// Componente principal de la aplicación
const App = () => {
  return (
    <div className="App">
      {/* No incluir NavigationBar aquí */}
      <div style={{ minHeight: 'calc(100vh - 120px)' }}>
        <MainContent />
      </div>
      <Footer />
    </div>
  );
};

// Renderiza el componente App en el elemento con el id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
