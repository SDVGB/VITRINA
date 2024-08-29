const path = require('path');
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
            console.log('Error al insertar la solicitud de contacto:', error);
            return res.status(500).json({ error: 'Error al enviar la solicitud de contacto.' });
        }

        // Obtener el ID_Rut, detalles y la imagen de la publicación
        const getPublicationDetailsQuery = 'SELECT ID_Rut, Nombre_Publicacion, Descripcion_Publicacion, Precio, Imagen_Publicacion_Rutas FROM Publicacion WHERE ID_Publicacion = ?';
        connection.query(getPublicationDetailsQuery, [ID_Publicacion], (error, publicationResults) => {
            if (error) {
                console.log('Error al obtener los detalles de la publicación:', error);
                return res.status(500).json({ error: 'Error al obtener los detalles de la publicación.' });
            }

            if (publicationResults.length === 0) {
                console.log('No se encontraron resultados para la publicación con ID:', ID_Publicacion);
                return res.status(500).json({ error: 'No se encontraron detalles de la publicación.' });
            }

            const { ID_Rut, Nombre_Publicacion, Descripcion_Publicacion, Precio, Imagen_Publicacion_Rutas } = publicationResults[0];
            
            const imagenUrl = `${req.protocol}://${req.get('host')}/controllers/assets/${path.basename(Imagen_Publicacion_Rutas)}`;
            
            const mensaje = `El usuario ${Nombre_Solicitante} está interesado en tu publicación: 
                             Título: ${Nombre_Publicacion}, 
                             Descripción: ${Descripcion_Publicacion}, 
                             Precio: ${Precio}, 
                             Imagen: ${imagenUrl}, 
                             Contacto: ${Contactame}`;

            // Crear la notificación para el propietario de la publicación
            const notificacionQuery = `
                INSERT INTO Notificaciones 
                (Usuario_ID_Rut, Mensaje_Notificacion, Fecha_Notificacion)
                VALUES (?, ?, NOW())
            `;

            connection.query(notificacionQuery, [ID_Rut, mensaje], (error, notificacionResults) => {
                if (error) {
                    console.log('Error al crear la notificación:', error);
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
