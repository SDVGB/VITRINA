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
    <div className="notificaciones-container3">
      <h2>Tus Notificaciones</h2>
      <div className="card-container3">
        {notificaciones.length > 0 ? (
          notificaciones.map((notificacion, index) => (
            <div key={index} className="card3">
              <img 
                src={notificacion.Imagen_Publicacion_Rutas} 
                alt={notificacion.Nombre_Publicacion} 
                className="card-img-top3" 
              />
              <div className="card-body3">
                <h5 className="card-title3">{notificacion.Nombre_Publicacion}</h5>
                <p className="card-text3">{notificacion.Mensaje_Notificacion}</p>
                <p className="card-text3">
                  <small className="text-muted3">
                    {new Date(notificacion.Fecha_Notificacion).toLocaleString()}
                  </small>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-notificaciones3">No tienes notificaciones.</div>
        )}
      </div>
    </div>
  );
};

export default Notificaciones;