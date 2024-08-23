const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/pingController');
const { login } = require('../controllers/loginController');
const { register } = require('../controllers/registerController');
const { getArticulos } = require('../controllers/articulosController');
const {getPublicacion} = require('../controllers/publicacionController');


router.post('/register', register);
router.post('/login', login);
// Se agregan los endpoint para traer artículos y la última publicación
router.get('/articulos', getArticulos)
router.get('/publicacion', getPublicacion)

module.exports = router;
