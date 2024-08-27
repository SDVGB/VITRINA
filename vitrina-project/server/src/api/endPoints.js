const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/pingController');
const { login } = require('../controllers/loginController');
const { register } = require('../controllers/registerController');
const { getArticulos } = require('../controllers/articulosController');
const { getPublicacion } = require('../controllers/publicacionController');
const { postcreation } = require('../controllers/postcreationController');
const { prendas } = require('../controllers/prendasController');
const { tiposPublicacion } = require('../controllers/tiposPublicacionController');
const { generos } = require('../controllers/generosController');
const { edades } = require('../controllers/edadesController');
const { tallas } = require('../controllers/tallasController');
const { getAllPublicaciones } = require('../controllers/getAllPublicaciones');
const { enviarSolicitudContacto } = require('../controllers/solicitudesController');
const { obtenerNotificaciones } = require('../controllers/notificacionesController');

// Rutas de autenticación
router.post('/register', register);
router.post('/login', login);

// Rutas para obtener los datos necesarios para el formulario
router.post('/postcreation', postcreation);
router.get('/prendas', prendas);
router.get('/tipospublicacion', tiposPublicacion);
router.get('/generos', generos);
router.get('/edades', edades);
router.get('/tallas', tallas);

// Rutas para manejar publicaciones y artículos
router.get('/articulos', getArticulos);
router.get('/publicacion', getPublicacion);
router.get('/publicaciones', getAllPublicaciones);

// Ruta para enviar solicitudes de contacto
router.post('/enviar-solicitud-contacto', enviarSolicitudContacto);

// Ruta para obtener notificaciones de un usuario
router.get('/notificaciones/:userRut', obtenerNotificaciones);

// Ruta para probar la conexión (ping)
router.get('/ping', ping);

module.exports = router;
