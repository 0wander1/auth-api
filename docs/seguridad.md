 # Documentación de Seguridad

## Manejo de contraseñas

Las contraseñas nunca se almacenan en texto plano. Al registrar un usuario, la contraseña pasa por bcryptjs con 10 rondas de salt, lo que genera un hash único e irreversible. Al hacer login, bcryptjs compara la contraseña recibida contra el hash almacenado.

## Tokens JWT

Al autenticarse correctamente, el servidor genera un token JWT firmado con la clave `JWT_SECRET` definida en el archivo `.env`. El token contiene el id y el nombre del usuario, y tiene una expiración de 1 hora. Después de ese tiempo el token deja de ser válido y el usuario debe autenticarse de nuevo.

## Middleware de verificación

El archivo `src/middlewares/verifyToken.js` protege las rutas que requieren autenticación. Extrae el token del header `Authorization` en formato `Bearer <token>`, lo verifica con la clave secreta y, si es válido, permite continuar la petición. Si el token es inválido o ha expirado, responde con error 401.

## Variables de entorno

La clave secreta `JWT_SECRET` se almacena en el archivo `.env` y nunca se sube a GitHub gracias a la regla definida en `.gitignore`. Esto evita que personas externas puedan firmar tokens válidos.

## Lo que no se almacena

- Contraseñas en texto plano
- Tokens activos
- Información sensible adicional del usuario