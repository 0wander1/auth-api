 // Importa Express para crear la aplicación
const express = require('express');

// Importa las rutas de autenticación
const authRoutes = require('./routes/authRoutes');

// Crea la instancia de la aplicación Express
const app = express();

// Middleware para que Express pueda leer JSON en el body de las peticiones
app.use(express.json());

// Registra las rutas de autenticación bajo el prefijo /api/auth
app.use('/api/auth', authRoutes);

// Exporta la app para usarla en index.js
module.exports = app;