 # API REST de Autenticación

API REST desarrollada con Node.js y Express para el registro e inicio de sesión de usuarios, implementando seguridad con bcrypt y JWT.

**Evidencia:** GA7-220501096-AA5-EV01  
**Programa:** Análisis y Desarrollo de Software — SENA  
**Ficha:** 3186640  

---

##  Descripción

Esta API permite registrar usuarios con contraseña hasheada y autenticarlos mediante tokens JWT. 

---

##  Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| Node.js | 24.15.0 | Entorno de ejecución |
| Express | 4.x | Framework web |
| bcryptjs | 2.x | Hasheo de contraseñas |
| jsonwebtoken | 9.x | Generación de tokens JWT |
| dotenv | 16.x | Variables de entorno |

---

##  Instalación

### Requisitos previos
- Node.js instalado (versión 18 o superior)
- Git instalado

### Pasos

1. Clonar el repositorio
```bash
git clone https://github.com/0wander1/auth-api.git
cd auth-api
```

2. Instalar dependencias
```bash
npm install
```

3. Crear el archivo `.env` en la raíz del proyecto
PORT=3000
JWT_SECRET=clave_secreta_super_segura_2024

4. Iniciar el servidor
```bash
node index.js
```

El servidor estará corriendo en `http://localhost:3000`

---

## 🔑 Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `PORT` | Puerto donde corre el servidor | `3000` |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT | `clave_secreta_super_segura_2024` |

---

## 📡 Endpoints

### POST `/api/auth/register`
Registra un nuevo usuario en el sistema.

**Body:**
```json
{
  "usuario": "hector",
  "contrasena": "mi_password123"
}
```

**Respuesta exitosa (201):**
```json
{
  "mensaje": "Usuario registrado exitosamente"
}
```

---

### POST `/api/auth/login`
Autentica un usuario y devuelve un token JWT.

**Body:**
```json
{
  "usuario": "hector",
  "contrasena": "mi_password123"
}
```

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Autenticación satisfactoria",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---
