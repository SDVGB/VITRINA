const connection = require('../models/db');

module.exports.edades = (req, res) => {
    connection.query('SELECT ID_Edad, Nombre_Edad FROM Edad', (err, results) => {
        if (err) {
            console.error('Error obteniendo edades:', err);
            return res.status(500).json({ message: 'Error al obtener edades' });
        }
        res.status(200).json(results);
    });
};