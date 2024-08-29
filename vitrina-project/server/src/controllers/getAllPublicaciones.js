const connection = require('../models/db'); // Asegúrate de que la ruta sea correcta

const getAllPublicaciones = (req, res) => {
    const { tipo } = req.query;

    // Consulta básica para obtener todas las publicaciones
    // let consulta = "SELECT * FROM Publicacion"; // Código original comentado

    // Nueva consulta que une la tabla Publicacion con Talla para obtener el Nombre_Talla
    let consulta = `
        SELECT Publicacion.*, Talla.Nombre_Talla 
        FROM Publicacion 
        LEFT JOIN Talla ON Publicacion.ID_Talla = Talla.ID_Talla
    `;

    // Si se especifica un tipo, se añade una cláusula WHERE para filtrar por tipo
    if (tipo) {
        // consulta += ` WHERE ID_Tipo_Publicacion = '${tipo}'`; // Código original comentado
        consulta += ` WHERE Publicacion.ID_Tipo_Publicacion = '${tipo}'`; // Actualizado para la nueva consulta
    }

    connection.query(consulta, (error, resultados) => {
        if (error) {
            res.json({ error: error });
        } else {
            res.json({ publicaciones: resultados });
        }
    });
};

module.exports = {
    getAllPublicaciones,
};
