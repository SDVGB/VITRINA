const connection = require('../models/db'); // Importa la conexión a la base de datos.
const path = require('path'); // Importa path para manejar rutas de archivos
const fs = require('fs'); // Importa fs para manejar el sistema de archivos
const jwt = require('jsonwebtoken'); // Importa jwt para manejar la verificación del token

// Middleware para verificar y decodificar el token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Captura el token de la cabecera

    if (!token) {
        return res.status(403).send('Token requerido.');
    }

    jwt.verify(token, "Stack", (err, decoded) => { // Verifica el token con la clave secreta
        if (err) {
            return res.status(401).send('Token inválido o expirado.');
        }

        req.username = decoded.username; // Almacena el `username` decodificado en la solicitud
        next();
    });
};

// Controlador para manejar la creación de una publicación con imagen y precio
module.exports.postcreation = [verifyToken, (req, res) => {
    const {
        Nombre_Publicacion, Cantidad, Descripcion_Publicacion,
        ID_Prenda, ID_Tipo_Publicacion, ID_Genero, ID_Talla, ID_Edad, Precio
    } = req.body;

    const Fecha_Publicacion = new Date().toISOString().slice(0, 10);

    // Verificar si se ha subido una imagen
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No se ha subido ninguna imagen.');
    }

    const imageFile = req.files.Imagen_Publicacion;
    const assetsDir = path.join(__dirname, 'assets');

    // Verificar si la carpeta assets existe, y si no, crearla
    if (!fs.existsSync(assetsDir)){
        fs.mkdirSync(assetsDir);
    }

    const uploadPath = path.join(assetsDir, imageFile.name);

    // Mover la imagen al directorio de assets
    imageFile.mv(uploadPath, function(err) {
        if (err) {
            console.error('Error moviendo el archivo:', err.message);
            return res.status(500).send(`Error moviendo el archivo: ${err.message}`);
        }

        const imageUrl = `/assets/${imageFile.name}`;

        // Obtener el RUT del usuario usando el `username` decodificado del token
        const queryRUT = "SELECT ID_Rut FROM Usuario WHERE Correo_Usuario = ?";
        connection.query(queryRUT, [req.username], (err, result) => {
            if (err) {
                return res.status(500).send('Error obteniendo el RUT.');
            }

            if (result.length > 0) {
                const RUT = result[0].ID_Rut; // Este es el RUT del usuario logueado

                // Convertir el precio a un número entero, manejando posibles NaN
                let precioInt = parseInt(Precio.replace(/[^0-9]/g, ''), 10);
                if (isNaN(precioInt)) {
                    precioInt = 0; // O maneja de otra manera si el precio no es válido
                }

                // Inserción de los datos en la tabla Publicacion, incluyendo el campo Precio como un entero
                const query = `
                    INSERT INTO Publicacion (
                        Nombre_Publicacion, Fecha_Publicacion, Cantidad, Descripcion_Publicacion,
                        ID_Prenda, ID_Rut, ID_Tipo_Publicacion, ID_Genero, ID_Talla, ID_Edad,
                        Imagen_Publicacion_Rutas, Precio
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;

                connection.query(query, [
                    Nombre_Publicacion, Fecha_Publicacion, Cantidad, Descripcion_Publicacion,
                    ID_Prenda, RUT, ID_Tipo_Publicacion, ID_Genero, ID_Talla, ID_Edad,
                    imageUrl, precioInt
                ], (err, result) => {
                    if (err) {
                        console.error('Error insertando datos:', err);
                        return res.status(500).send('Error insertando datos.');
                    }
                    res.status(200).send('Publicación creada exitosamente.');
                });
            } else {
                return res.status(404).send('Usuario no encontrado.');
            }
        });
    });
}];

