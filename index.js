 // Carga las variables de entorno desde el archivo .env
require('dotenv').config();

// Importa la configuración principal de Express
const app = require('./src/app');

// Puerto donde correrá el servidor, tomado del .env o 3000 por defecto
const PORT = process.env.PORT || 3000;

// Inicia el servidor y escucha peticiones
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});