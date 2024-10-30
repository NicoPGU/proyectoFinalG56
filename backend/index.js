require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express();

// Configuración de CORS
app.use(cors({ origin: 'http://localhost:5173' }));

// Middleware para parsear JSON
app.use(express.json());


// Importar rutas
const userRoutes = require('./routes/users');
const propertyRoutes = require('./routes/properties');

// Usar rutas
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);

module.exports = app;

