require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express();

// Configuración de CORS
const allowedOrigins = [
    'http://localhost:5173',
    'https://proyectofinalg56-client.onrender.com'
  ];
  
  app.use(cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));

// Middleware para parsear JSON
app.use(express.json());


// Importar rutas
const userRoutes = require('./routes/users');
const propertyRoutes = require('./routes/properties');

// Usar rutas
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);

module.exports = app;



