const connection = require('../models/db');

module.exports.tallas = (req, res) => {
    connection.query('SELECT ID_Talla, Nombre_Talla FROM Talla', (err, results) => {
        if (err) {
            console.error('Error obteniendo tallas:', err);
            return res.status(500).json({ message: 'Error al obtener tallas' });
        }
        res.status(200).json(results);
    });
};