const connection = require('../models/db');

const enviarSolicitudContacto = (req, res) => {
    const { ID_Publicacion, Nombre_Solicitante, Apellido_Solicitante, Correo_Solicitante, Contactame, Descripcion_Solicitud } = req.body;

    // Insertar la solicitud de contacto en la base de datos
    const query = `
        INSERT INTO Solicitudes_de_Contacto 
        (ID_Publicacion, Nombre_Solicitante, Apellido_Solicitante, Correo_Solicitante, Contactame, Descripcion_Solicitud, Fecha_Solicitudes)
        VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    connection.query(query, [ID_Publicacion, Nombre_Solicitante, Apellido_Solicitante, Correo_Solicitante, Contactame, Descripcion_Solicitud], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al enviar la solicitud de contacto.' });
        }

        // Obtener el ID_Rut del propietario de la publicación
        const getOwnerQuery = 'SELECT ID_Rut FROM Publicacion WHERE ID_Publicacion = ?';
        connection.query(getOwnerQuery, [ID_Publicacion], (error, ownerResults) => {
            if (error || ownerResults.length === 0) {
                return res.status(500).json({ error: 'Error al obtener el propietario de la publicación.' });
            }

            const ID_Rut = ownerResults[0].ID_Rut;
            const mensaje = `El usuario ${Nombre_Solicitante} está interesado en tu publicación.`;

            // Crear la notificación para el propietario de la publicación
            const notificacionQuery = `
                INSERT INTO Notificaciones 
                (Usuario_ID_Rut, Mensaje_Notificacion, Fecha_Notificacion)
                VALUES (?, ?, NOW())
            `;

            connection.query(notificacionQuery, [ID_Rut, mensaje], (error, notificacionResults) => {
                if (error) {
                    return res.status(500).json({ error: 'Error al crear la notificación.' });
                }
                res.status(200).json({ message: 'Solicitud de contacto enviada y notificación creada correctamente.' });
            });
        });
    });
};

module.exports = {
    enviarSolicitudContacto,
};
