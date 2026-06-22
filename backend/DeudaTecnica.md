# Deuda Técnica y Code Smells

## Code smells identificados

| ID    | Ubicación              | Problema                                      | Mejora propuesta                          |
|-------|------------------------|-----------------------------------------------|-------------------------------------------|
| DT-01 | backend/src/index.js   | Todas las rutas importadas en un solo archivo | Separar en un archivo de rutas centralizado |
| DT-02 | backend/src/routes/    | Sin validación de datos de entrada            | Agregar validaciones con Joi o Zod        |
| DT-03 | backend/src/routes/    | Sin manejo de errores consistente             | Middleware global de manejo de errores    |

## Mejoras futuras
- Paginación en endpoints de listado.
- Autenticación JWT en endpoints de productos.
- Variables de entorno para configuración de la base de datos.