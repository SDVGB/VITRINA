const connection = require('../models/db');

const obtenerNotificaciones = (req, res) => {
    const { userRut } = req.params;

    const query = `
        SELECT * FROM Notificaciones WHERE Usuario_ID_Rut = ? ORDER BY Fecha_Notificacion DESC
    `;

    connection.query(query, [userRut], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener las notificaciones.' });
        }
        res.status(200).json({ notificaciones: results });
    });
};

module.exports = {
    obtenerNotificaciones,
};

