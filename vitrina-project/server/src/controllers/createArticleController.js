const connection = require('../models/db'); // Importa la conexión a la base de datos.
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

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

// Controlador para manejar la creación de un artículo
module.exports.creararticulos = [verifyToken, (req, res) => {
    const {
        Nombre_Articulo,
        Fecha_Articulo,
        Descripcion_Articulos,
        Link_Ref_Articulos
    } = req.body;

    // Verificar si se ha subido una imagen
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No se ha subido ninguna imagen.');
    }

    const imageFile = req.files.Imagen_Articulos_Ruta;
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

                // Inserción de los datos en la tabla Articulos
                const query = `
                    INSERT INTO Articulos (
                        ID_Rut, Nombre_Articulo, Fecha_Articulo, Descripcion_Articulos,
                        Link_Ref_Articulos, Imagen_Articulos_Ruta
                    ) VALUES (?, ?, ?, ?, ?, ?)
                `;

                connection.query(query, [
                    RUT, Nombre_Articulo, Fecha_Articulo, Descripcion_Articulos,
                    Link_Ref_Articulos, imageUrl
                ], (err, result) => {
                    if (err) {
                        console.error('Error insertando datos:', err);
                        return res.status(500).send('Error insertando datos.');
                    }
                    res.status(201).json({ message: 'Artículo creado exitosamente.', id: result.insertId });
                });
            } else {
                return res.status(404).send('Usuario no encontrado.');
            }
        });
    });
}];
