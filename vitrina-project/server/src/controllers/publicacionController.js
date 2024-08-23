// Se trae la conexión a la base de datos
const connection = require('../models/db');


// Función para traer la última publicación de tipo venta
const getPublicacion =(request, response) =>{
    // El ID_Tipo_Publicación es '01' porque con ese valor lo guardé en base de datos
    let consult= "Select * FROM Publicacion WHERE ID_Tipo_Publicacion = '01' ORDER BY Fecha_Publicacion DESC LIMIT 1"
    try {
        connection.query(consult, (error, resultados) => {
            if (error) {
                response.json({ error: error})
            } else {
                // Devolvemos la primer publicación que entregue la base de datos y si no existe ninguna devuelve null
                response.json({
                    publicacion: resultados[0] || null
                })
            }
        })
    } catch (error) {
        response.json({ error: error })
    }
}


module.exports={
    getPublicacion
}