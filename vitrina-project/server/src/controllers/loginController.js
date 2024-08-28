const connection = require('../models/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.login = (req, res) => {
    const { username, password } = req.body;
    const consult = `
        SELECT Usuario.*, Roles.Nombre_Rol AS role 
        FROM Usuario 
        INNER JOIN Roles ON Usuario.Roles_ID_Rol = Roles.ID_Rol 
        WHERE Correo_Usuario = ?
    `;

    try {
        connection.query(consult, [username], (err, result) => {
            if (err) { 
                return res.status(500).send(err);
            }

            if (result.length > 0) {
                const storedPassword = result[0].Contraseña;
                const userRole = result[0].role; // Asegúrate de que el rol del usuario esté almacenado en la base de datos
                console.log(userRole)
                console.log(userRole)

                bcrypt.compare(password, storedPassword, (err, isMatch) => {
                    if (err) {
                        return res.status(500).send(err);
                    }

                    if (isMatch) {
                        const userId = result[0].ID_Rut;
                        const token = jwt.sign({ username, userId, role: userRole }, "Stack", { expiresIn: "60m" });

                        res.status(200).send({ token, userId, role: userRole }); // Envía también el rol en la respuesta
                    } else {
                        res.status(401).send({ message: 'Contraseña incorrecta' });
                    }
                });
            } else {
                res.status(404).send({ message: 'Usuario no encontrado' });
            }
        });
    } catch (e) {
        res.status(500).send(e);
    }
};
