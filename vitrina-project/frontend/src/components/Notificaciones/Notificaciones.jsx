import React, { useEffect, useState } from 'react';
import './Notificaciones.css'; 

const Notificaciones = ({ usuarioActual }) => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    console.log("Usuario actual:", usuarioActual); // Verifica el valor de usuarioActual
    const token = localStorage.getItem('token'); // Obtiene el token del localStorage

    fetch(`http://localhost:5000/notificaciones/${usuarioActual}`, {
      headers: {
        'Authorization': `Bearer ${token}` // Envía el token en el encabezado Authorization
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Error en la solicitud, status: ' + res.status);
      }
      return res.json();
    })
    .then(data => {
      console.log('Notificaciones recibidas:', data); // Verifica que los datos son correctos
      setNotificaciones(data.notificaciones); // Asegúrate de que data.notificaciones es correcto
    })
    .catch(err => console.error('Error fetching notifications:', err));
  }, [usuarioActual]);

  return (
    <div className="notificaciones-container">
      <h2>Tus Notificaciones</h2>
      <ul>
        {notificaciones.length > 0 ? (
          notificaciones.map((notificacion, index) => (
            <li key={index}>
              <span>{notificacion.Mensaje_Notificacion}</span>
              <time>{new Date(notificacion.Fecha_Notificacion).toLocaleString()}</time>
            </li>
          ))
        ) : (
          <li className="no-notificaciones">No tienes notificaciones.</li>
        )}
      </ul>
    </div>
  );
};

export default Notificaciones;
