const jwt = require('jsonwebtoken');

const profileValidator = (req, res, next) => {
    // Obtener el token de la cabecera 'authorization'
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Captura el token si está presente

    if (!token) {
        return res.status(403).send('Token requerido.'); // Si no hay token, responde con un error 403
    }

    // Verificar el token utilizando la clave secreta
    jwt.verify(token, "Stack", (err, decoded) => {
        if (err) {
            return res.status(401).send('Token inválido o expirado.'); // Si el token no es válido, responde con un error 401
        }
        req.user = decoded; // Almacena el usuario decodificado en la solicitud para su uso posterior
        next(); // Continúa con la siguiente función middleware o ruta
    });
};

module.exports = profileValidator;
