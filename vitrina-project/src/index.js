import React from 'react';
import ReactDOM from 'react-dom/client';
import index from './index.css'
import Footer from './components/footer/footer';

// Componente principal de la aplicación
const App = () => {
  return (
    <div className="App">
      {/* Aquí se agregarán otros componentes o contenido de la aplicación */}
      <div style={{ minHeight: 'calc(100vh - 120px)' }}>
        {/* El contenido principal de la aplicación debe ir aquí */}
      </div>
      {/* El componente Footer se agrega aquí para que aparezca en la parte inferior */}
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
