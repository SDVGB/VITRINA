const bcrypt = require('bcrypt');
const connection = require('../models/db');

// Función para generar un ID_Rut único
const generateUniqueRut = () => {
    // Genera un número aleatorio de 12 dígitos como string
    return Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
};

module.exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica si el usuario ya existe
        const [userExists] = await connection.promise().query('SELECT * FROM usuario WHERE Correo_Usuario = ?', [email]);
        if (userExists.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Encripta la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generar valores por defecto
        const idRut = generateUniqueRut(); // Genera un ID único
        const nombreUsuario = 'Usuario'; // Nombre por defecto
        const apellidoPaterno = 'Paterno'; // Apellido paterno por defecto
        const apellidoMaterno = 'Materno'; // Apellido materno por defecto
        const rolId = 'R001'; // ID del rol por defecto

        // Inserta el nuevo usuario en la base de datos
        await connection.promise().query(
            'INSERT INTO usuario (ID_Rut, Nombre_Usuario, Apellido_Paterno, Apellido_Materno, Correo_Usuario, Contraseña, Roles_ID_Rol) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [idRut, nombreUsuario, apellidoPaterno, apellidoMaterno, email, hashedPassword, rolId]
        );

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
