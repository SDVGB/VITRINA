const connection = require('../models/db'); // Importa la conexión a la base de datos.
const jwt = require('jsonwebtoken'); // Importa el módulo 'jsonwebtoken' para manejar tokens JWT.
const bcrypt = require('bcrypt'); // Importa el módulo 'bcrypt' para manejar el hashing y comparación de contraseñas.

module.exports.login = (req, res) => {
    const { username, password } = req.body; // Extrae 'username' y 'password' del cuerpo de la solicitud (req.body).
    const consult = "SELECT * FROM Usuario WHERE Correo_Usuario = ?"; // Define la consulta SQL para buscar al usuario por correo.

    try {
        connection.query(consult, [username], (err, result) => { // Ejecuta la consulta SQL con el correo como parámetro.
            if (err) { 
                res.send(err); // Si hay un error en la consulta, envía el error como respuesta.
            }
            
            if (result.length > 0) { // Verifica si la consulta encontró algún usuario.
                const storedPassword = result[0].Contraseña; // Obtiene la contraseña almacenada en la base de datos para el usuario encontrado.
                
                // Compara la contraseña ingresada con la almacenada usando bcrypt.
                bcrypt.compare(password, storedPassword, (err, isMatch) => {
                    if (err) {
                        res.send(err); // Si hay un error durante la comparación, envía el error como respuesta.
                    }
                    
                    if (isMatch) { // Si las contraseñas coinciden...
                        const token = jwt.sign({ username }, "Stack", { expiresIn: "60m" }); // Genera un token JWT que expira en 3 minutos.
                        res.send({ token }); // Envía el token como respuesta.
                    } else {
                        console.log('wrong password'); // Si las contraseñas no coinciden, imprime un mensaje en la consola.
                        res.send({ message: 'wrong password' }); // Envía un mensaje indicando que la contraseña es incorrecta.
                    }
                });
            } else {
                console.log('wrong user'); // Si no se encontró ningún usuario, imprime un mensaje en la consola.
                res.send({ message: 'wrong user' }); // Envía un mensaje indicando que el usuario no existe.
            }
        });
    } catch (e) {
        res.send(e); // Si ocurre una excepción, envía el error como respuesta.
    }
};
