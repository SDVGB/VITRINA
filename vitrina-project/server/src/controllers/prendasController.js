const connection = require('../models/db');

// Controlador para obtener las prendas
module.exports.prendas = (req, res) => {
    connection.query('SELECT ID_Prenda, Nombre_Prenda FROM Tipo_Prendas', (err, results) => {
        if (err) {
            console.error('Error obteniendo prendas:', err);
            return res.status(500).json({ message: 'Error al obtener prendas' });
        }
        res.status(200).json(results);
    });
};