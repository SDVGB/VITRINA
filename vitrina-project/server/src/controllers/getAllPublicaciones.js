const connection = require('../models/db'); // Asegúrate de que la ruta sea correcta

const getAllPublicaciones = (req, res) => {
    const { tipo } = req.query;

    // Consulta básica para obtener todas las publicaciones
    let consulta = "SELECT * FROM Publicacion";

    // Si se especifica un tipo, se añade una cláusula WHERE para filtrar por tipo
    if (tipo) {
        consulta += ` WHERE ID_Tipo_Publicacion = '${tipo}'`;
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
