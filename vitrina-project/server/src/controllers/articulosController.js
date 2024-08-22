const connection = require('../models/db');

const getArticulos = (request, response) => {
    const parametros = request.query
    let consult = "SELECT * FROM Articulos"
    if (parametros.sort) {
        const sort = parametros.sort.split(':').join(' ')
        consult += ` ORDER BY ${sort}`
    }
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

module.exports = {
    getArticulos
}