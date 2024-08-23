// Se trae la conexión a la base de datos
const connection = require('../models/db');

// Función para traer artículos
module.exports.getArticulos = (request, response) => {
    const parametros = request.query
    let consult = "SELECT * FROM Articulos"
    // Si dentro de los parámetros de la consulta viene sort, se ordenan de acuerdo a la indicación y el orden que indique
    if (parametros.sort) {
        const sort = parametros.sort.split(':').join(' ')
        consult += ` ORDER BY ${sort}`
    }
    // Si dentro de los parámetros de la consulta viene limit, se traen la cantidad que indique
    if (parametros.limit) {
        consult += ` LIMIT ${parametros.limit}`
    }
    try {
        connection.query(consult, (error, resultados) => {
            if (error) {
                response.send(error)
            }
            response.json({
                articulos: resultados
            })
        })
    } catch (error) {
        response.send(error)
    }
}
