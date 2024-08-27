const connection = require('../models/db');

module.exports.tiposPublicacion = (req, res) => {
    connection.query('SELECT ID_Tipo_Publicacion, Nombre_Tipo_Publicacion FROM Tipo_de_Publicacion', (err, results) => {
        if (err) {
            console.error('Error obteniendo tipos de publicación:', err);
            return res.status(500).json({ message: 'Error al obtener tipos de publicación' });
        }
        res.status(200).json(results);
    });
};