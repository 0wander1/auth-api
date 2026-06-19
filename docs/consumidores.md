# Documentación para Consumidores

## ¿Qué es esta API?

Esta API permite registrar usuarios y autenticarlos mediante tokens JWT. Está diseñada para ser consumida por cualquier cliente HTTP como Postman, Thunder Client, o una aplicación frontend.

## URL base
http://localhost:3000/api/auth

## Endpoints disponibles

### 1. Registro de usuario

| Campo | Valor |
|---|---|
| Método | POST |
| URL | `/api/auth/register` |
| Content-Type | application/json |

**Body:**
```json
{
  "usuario": "hector",
  "contrasena": "mi_password123"
}
```

**Respuesta exitosa:**
```json
{
  "mensaje": "Usuario registrado exitosamente"
}
```

**Posibles errores:**
```json
{ "mensaje": "El usuario y la contraseña son obligatorios" }
{ "mensaje": "El usuario ya está registrado" }
```

---

### 2. Inicio de sesión

| Campo | Valor |
|---|---|
| Método | POST |
| URL | `/api/auth/login` |
| Content-Type | application/json |

**Body:**
```json
{
  "usuario": "hector",
  "contrasena": "mi_password123"
}
```

**Respuesta exitosa:**
```json
{
  "mensaje": "Autenticación satisfactoria",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Posibles errores:**
```json
{ "mensaje": "El usuario y la contraseña son obligatorios" }
{ "mensaje": "Error en la autenticación: usuario no encontrado" }
{ "mensaje": "Error en la autenticación: contraseña incorrecta" }
```

---

## Recomendaciones

- Los campos `usuario` y `contrasena` son obligatorios en ambos endpoints.
- El `Content-Type` de todas las peticiones debe ser `application/json`.