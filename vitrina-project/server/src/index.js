const express = require('express');
const cors = require('cors'); // Importa el módulo cors
const app = express();
const port = 5000;
const routes = require('./api/endPoints');


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST']
}));

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Middleware para parsear JSON

app.use('/', routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
