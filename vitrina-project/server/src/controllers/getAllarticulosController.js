const connection = require('../models/db');

module.exports.getAllArticulos = (req, res) => {
  const sql = 'SELECT * FROM Articulos';
  
  connection.query(sql, (error, resultados) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error al obtener los artículos' });
    } else {
      res.status(200).json({ articulos: resultados });
    }
  });
};
