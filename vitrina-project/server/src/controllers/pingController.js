const connection = require('../models/db');

module.exports.ping = (req, res) => {
    const consult = 'SELECT * FROM Usuario ';

    try {
        connection.query(consult, (err, results) => {
            if (err) {
                throw err; // Maneja el error
            }
            console.log(results);
            res.json(results);
        });
    } catch (e) {
        // Maneja cualquier excepción que ocurra en el try
        console.error('Error executing query:', e);
        res.status(500).send('Error en la consulta');
    }
};
