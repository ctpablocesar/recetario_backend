const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// base de datos
dbConnection();

// CORS
app.use(cors());

//direcrorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

// rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recetas', require('./routes/recetas'));
app.use('/api/contacto', require('./routes/contacto'));
app.use('/api/galeria', require('./routes/galeria'));
app.use('/api/correo', require('./routes/correos'));
app.use('/api/password', require('./routes/password'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})
