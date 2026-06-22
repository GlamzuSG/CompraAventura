# Especificación de Historia de Usuario

## US-01: Búsqueda de productos con filtro
Como usuario registrado, quiero buscar productos filtrando por nombre y categoría, para encontrar rápidamente el producto que necesito.

## Criterios de aceptación
- CA1: Si ingreso un nombre parcial, el sistema muestra todos los productos que lo contengan.
- CA2: Si filtro por categoría, el sistema muestra solo productos de esa categoría.
- CA3: Si no hay resultados, el sistema retorna un arreglo vacío [].

## Definition of Done
1. El endpoint GET /api/productos?nombre=X&categoria=Y responde correctamente.
2. El código fue revisado mediante Pull Request antes de integrarse a main.
3. Se identificaron y documentaron code smells en DeudaTecnica.md.
4. Existen al menos 3 casos de prueba documentados en CasosDePrueba.md.
