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

  return (
    <div className="notificaciones-container">
      <h2>Tus Notificaciones</h2>
      {notificaciones.length > 0 ? (
        <ul>
          {notificaciones.map((notificacion, index) => (
            <li key={index}>
              <span>{notificacion.Mensaje_Notificacion}</span>
              <time>{new Date(notificacion.Fecha_Notificacion).toLocaleString()}</time>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-notificaciones">No tienes notificaciones.</div>
      )}
    </div>
  );
};

export default Notificaciones;
