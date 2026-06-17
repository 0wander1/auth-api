 // Importa bcryptjs para hashear y comparar contraseñas
const bcrypt = require('bcryptjs');

// Importa jsonwebtoken para generar tokens JWT
const jwt = require('jsonwebtoken');

// Importa el módulo fs para leer y escribir el archivo JSON
const fs = require('fs');

// Importa path para construir rutas de archivos de forma segura
const path = require('path');

// Ruta absoluta al archivo que simula la base de datos
const DB_PATH = path.join(__dirname, '../data/users.json');

// Función auxiliar para leer los usuarios del archivo JSON
const leerUsuarios = () => {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
};

// Función auxiliar para guardar los usuarios en el archivo JSON
const guardarUsuarios = (usuarios) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(usuarios, null, 2));
};

// ─── REGISTRO ───────────────────────────────────────────────────────────────

const register = async (req, res) => {
    try {
        // Extrae usuario y contraseña del cuerpo de la petición
        const { usuario, contrasena } = req.body;

        // Valida que ambos campos estén presentes
        if (!usuario || !contrasena) {
            return res.status(400).json({
                mensaje: 'El usuario y la contraseña son obligatorios'
            });
        }

        // Lee los usuarios existentes
        const usuarios = leerUsuarios();

        // Verifica que el usuario no esté registrado previamente
        const usuarioExiste = usuarios.find(u => u.usuario === usuario);
        if (usuarioExiste) {
            return res.status(400).json({
                mensaje: 'El usuario ya está registrado'
            });
        }

        // Hashea la contraseña con bcrypt (10 rondas de sal)
        const contrasenaHasheada = await bcrypt.hash(contrasena, 10);

        // Crea el nuevo usuario con la contraseña hasheada
        const nuevoUsuario = {
            id: Date.now(),
            usuario,
            contrasena: contrasenaHasheada
        };

        // Agrega el nuevo usuario y guarda en el archivo JSON
        usuarios.push(nuevoUsuario);
        guardarUsuarios(usuarios);

        // Responde con éxito
        return res.status(201).json({
            mensaje: 'Usuario registrado exitosamente'
        });

    } catch (error) {
        // Error interno del servidor
        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};

// ─── LOGIN ───────────────────────────────────────────────────────────────────

const login = async (req, res) => {
    try {
        // Extrae usuario y contraseña del cuerpo de la petición
        const { usuario, contrasena } = req.body;

        // Valida que ambos campos estén presentes
        if (!usuario || !contrasena) {
            return res.status(400).json({
                mensaje: 'El usuario y la contraseña son obligatorios'
            });
        }

        // Lee los usuarios existentes
        const usuarios = leerUsuarios();

        // Busca el usuario en la base de datos
        const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);
        if (!usuarioEncontrado) {
            return res.status(401).json({
                mensaje: 'Error en la autenticación: usuario no encontrado'
            });
        }

        // Compara la contraseña recibida con el hash almacenado
        const contrasenaValida = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);
        if (!contrasenaValida) {
            return res.status(401).json({
                mensaje: 'Error en la autenticación: contraseña incorrecta'
            });
        }

        // Genera un token JWT firmado con la clave secreta del .env
        const token = jwt.sign(
            { id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Responde con mensaje de éxito y el token
        return res.status(200).json({
            mensaje: 'Autenticación satisfactoria',
            token
        });

    } catch (error) {
        // Error interno del servidor
        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};

// Exporta las funciones para usarlas en las rutas
module.exports = { register, login };