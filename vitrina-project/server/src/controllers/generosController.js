const connection = require('../models/db');

module.exports.generos = (req, res) => {
    connection.query('SELECT ID_Genero, Nombre_Genero FROM Genero', (err, results) => {
        if (err) {
            console.error('Error obteniendo géneros:', err);
            return res.status(500).json({ message: 'Error al obtener géneros' });
        }
        res.status(200).json(results);
    });
};
