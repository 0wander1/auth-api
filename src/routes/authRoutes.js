 
// Importa Express y crea un enrutador
const express = require('express');
const router = express.Router();

// Importa el controlador de autenticación
const authController = require('../controllers/authController');

// Ruta para registrar un nuevo usuario
// POST /api/auth/register
router.post('/register', authController.register);

// Ruta para iniciar sesión
// POST /api/auth/login
router.post('/login', authController.login);

// Exporta el enrutador para usarlo en app.js
module.exports = router;