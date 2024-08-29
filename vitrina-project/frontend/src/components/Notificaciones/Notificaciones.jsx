import React, { useEffect, useState } from 'react';
import './Notificaciones.css'; 

const Notificaciones = ({ usuarioActual }) => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:5000/notificaciones/${usuarioActual}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => setNotificaciones(data.notificaciones))
    .catch(err => console.error('Error fetching notifications:', err));
  }, [usuarioActual]);

  const extractImageUrl = (mensaje) => {
    const regex = /(http[s]?:\/\/[^\s,]+)/g; // Modifica la expresión regular para evitar capturar comas
    const matches = mensaje.match(regex);
    return matches ? matches[0] : null; // Retorna la primera URL encontrada
  };

  const extractText = (mensaje) => {
    return mensaje.replace(/(http[s]?:\/\/[^\s]+)/g, '').trim(); // Elimina la URL del mensaje y deja solo el texto
  };

  return (
    <div className="notificaciones-container">
      <h2>Tus Notificaciones</h2>
      {notificaciones.length > 0 ? (
        <ul>
          {notificaciones.map((notificacion, index) => {
            const imageUrl = extractImageUrl(notificacion.Mensaje_Notificacion);
            const text = extractText(notificacion.Mensaje_Notificacion);
            
            return (
              <li key={index}>
                <div className="notificacion-content">
                  <span>{text}</span>
                  {imageUrl && <img src={imageUrl} alt="Imagen de la publicación" className="notificacion-imagen" />}
                </div>
                <time>{new Date(notificacion.Fecha_Notificacion).toLocaleString()}</time>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="no-notificaciones">No tienes notificaciones.</div>
      )}
    </div>
  );
};

export default Notificaciones;
