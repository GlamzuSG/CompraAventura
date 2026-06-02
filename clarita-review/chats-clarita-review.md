# Evidencia de Refinamiento con Clarita Review
## Proyecto: CompraAventura — CIN314 Semestre 1, 2026

Este archivo contiene los enlaces a los chats de Clarita Review utilizados
para refinar las Historias de Usuario del proyecto.

---

## URLs de chats de Clarita Review

| Historia de Usuario | URL del Chat |
|---------------------|--------------|
| US-01 – Búsqueda comparativa por nombre | [PENDIENTE: pegar URL aquí] |
| US-02 – Manejo de productos no encontrados | [PENDIENTE: pegar URL aquí] |
| US-03 – Ordenar por precio y alertas de baja | [PENDIENTE: pegar URL aquí] |
| US-04 – Carga masiva de precios (CSV) | [PENDIENTE: pegar URL aquí] |
| US-05 – Resiliencia de servidores | [PENDIENTE: pegar URL aquí] |
| US-06 – Priorización por GPS | [PENDIENTE: pegar URL aquí] |
| US-07 – Registro de nuevos usuarios | [PENDIENTE: pegar URL aquí] |
| US-08 – Inicio de sesión con JWT | [PENDIENTE: pegar URL aquí] |
| US-09 – Sugerencias dinámicas de búsqueda | [PENDIENTE: pegar URL aquí] |
| US-10 – Filtros avanzados | [PENDIENTE: pegar URL aquí] |

---

## Cambios realizados tras el refinamiento

A continuación se describen las mejoras aplicadas a los issues de GitHub
como resultado del feedback de Clarita Review:

### US-07 – Registro de Usuarios
**Mejoras realizadas:**
- Se añadió criterio de aceptación para email duplicado (antes no estaba cubierto).
- Se especificaron validaciones: largo mínimo de contraseña (8 caracteres), formato de email.
- Se agregó al DoD: "La contraseña debe almacenarse hasheada (bcrypt)".

### US-08 – Login con JWT
**Mejoras realizadas:**
- Se especificó el tiempo de expiración del token (2 horas).
- Se añadió criterio de aceptación: "Si las credenciales son inválidas, el sistema responde con mensaje genérico (sin revelar si el email existe)".
- Se clarificó que el logout elimina el token en el cliente.

### US-01 – Búsqueda Comparativa
**Mejoras realizadas:**
- Se especificó tiempo máximo de respuesta como criterio de aceptación (< 3 segundos).
- Se añadió criterio: mostrar al menos 2 supermercados para que la comparativa sea útil.

### US-03 – Ordenar por Precio
**Mejoras realizadas:**
- Se añadió criterio para definir el comportamiento con precios iguales (orden alfabético).
- Se especificó el criterio de "alerta de baja" como descuento >= 15%.
