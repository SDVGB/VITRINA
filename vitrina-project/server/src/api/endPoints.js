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
const { creararticulos } = require('../controllers/createArticleController');
const { getAllArticulos } = require('../controllers/getAllarticulosController');
const { updateProfileImage } = require('../controllers/profileController');
const profileValidator = require('../controllers/pofileValidator'); // Importa tu middleware personalizado

// Ruta para manejar artículos
router.get('/getallarticulos', getAllArticulos);

// Rutas de autenticación
router.post('/register', register);
router.post('/login', login);

// Rutas para obtener los datos necesarios para el formulario
router.post('/postcreation', profileValidator, postcreation); // Protegida
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
router.get('/notificaciones/:userRut', profileValidator, obtenerNotificaciones); // Protegida

// Ruta para probar la conexión (ping)
router.get('/ping', ping);

router.post('/creararticulos', profileValidator, creararticulos); // Protegida

// Ruta para actualizar la imagen de perfil
router.post('/api/update-profile-image', profileValidator, updateProfileImage); // Protegida

module.exports = router;
