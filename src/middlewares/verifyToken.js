 // Importa jsonwebtoken para verificar el token
const jwt = require('jsonwebtoken');

// Middleware que verifica si el token JWT es válido
const verifyToken = (req, res, next) => {

    // Obtiene el token del header Authorization
    const authHeader = req.headers['authorization'];

    // Verifica que el header exista
    if (!authHeader) {
        return res.status(401).json({
            mensaje: 'Acceso denegado: no se proporcionó token'
        });
    }

    // El token viene en formato "Bearer <token>", se extrae solo el token
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            mensaje: 'Acceso denegado: formato de token inválido'
        });
    }

    try {
        // Verifica y decodifica el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Agrega los datos del usuario al objeto request para usarlos después
        req.usuario = decoded;

        // Pasa al siguiente middleware o controlador
        next();

    } catch (error) {
        return res.status(401).json({
            mensaje: 'Token inválido o expirado'
        });
    }
};

// Exporta el middleware para usarlo en las rutas
module.exports = verifyToken;