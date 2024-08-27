import React, { useState, useEffect } from 'react';

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    // Aquí puedes hacer una llamada a la API para obtener las notificaciones
    // Por ahora, usaremos un ejemplo estático
    const exampleNotificaciones = [
      { id: 1, mensaje: 'Nueva oferta en tu publicación', fecha: '2024-08-22' },
      { id: 2, mensaje: 'Tu artículo ha sido vendido', fecha: '2024-08-21' },
    ];
    setNotificaciones(exampleNotificaciones);
  }, []);

  return (
    <div>
      <h2>Tus Notificaciones</h2>
      <ul>
        {notificaciones.map((notificacion) => (
          <li key={notificacion.id}>
            <p>{notificacion.mensaje}</p>
            <small>{notificacion.fecha}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notificaciones;
