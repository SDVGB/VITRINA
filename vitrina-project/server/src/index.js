const express = require('express');
const cors = require('cors'); // Importa el módulo cors
const path = require('path'); // Importa el módulo path
const fileUpload = require('express-fileupload'); // Importa el middleware express-fileupload

const app = express();
const port = 5000;
const routes = require('./api/endPoints'); // Importa las rutas desde endPoints.js

// Middleware para parsear JSON y datos de formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST']
}));

// Middleware para manejo de archivos
app.use(fileUpload()); // Asegura que el servidor pueda manejar archivos

// Middleware para servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Uso de las rutas definidas en endPoints.js
app.use('/', routes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
