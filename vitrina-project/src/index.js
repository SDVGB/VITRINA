import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap aquí
import './index.css'; // Asegúrate de que este archivo exista
import App from './pages/home';
import { BrowserRouter } from 'react-router-dom';


// Renderiza el componente App en el elemento con el id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
