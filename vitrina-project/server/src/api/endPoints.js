const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/pingController');
const { login } = require('../controllers/loginController');
const { register } = require('../controllers/registerController');
const { getArticulos } = require('../controllers/articulosController');
const {getPublicacion} = require('../controllers/publicacionController');
const { postcreation } = require('../controllers/postcreationController');
const { prendas} = require('../controllers/prendasController');
const { tiposPublicacion} = require('../controllers/tiposPublicacionController');
const { generos} = require('../controllers/generosController');
const { edades} = require('../controllers/edadesController');
const { tallas} = require('../controllers/tallasController');
const { getAllPublicaciones } = require('../controllers/getAllPublicaciones');

router.post('/register', register);
router.post('/login', login);



// Rutas para obtener los datos necesarios para el formulario
router.post('/postcreation', postcreation);
router.get('/prendas', prendas);
router.get('/tipospublicacion', tiposPublicacion);
router.get('/generos',generos);
router.get('/edades', edades);
router.get('/tallas', tallas);

// Se agregan los endpoint para traer artículos y la última publicación
router.get('/articulos', getArticulos)
router.get('/publicacion', getPublicacion)
router.get('/publicaciones', getAllPublicaciones);

module.exports = router;
