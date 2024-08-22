const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/pingController');
const { login } = require('../controllers/loginController');
const { register } = require('../controllers/registerController');
const { getArticulos } = require('../controllers/articulosController');


router.post('/register', register);
router.post('/login', login);
router.get('/articulos', getArticulos)

module.exports = router;
