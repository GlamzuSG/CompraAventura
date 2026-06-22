# Casos de Prueba – US-01: Búsqueda de productos con filtro

| ID    | Qué se debe hacer (acción / entrada)                        | Salida esperada                          |
|-------|-------------------------------------------------------------|------------------------------------------|
| CP-01 | GET /api/productos?nombre=leche                             | Lista de productos que contengan "leche" |
| CP-02 | GET /api/productos?categoria=Lacteos                        | Solo productos de categoría "Lacteos"    |
| CP-03 | GET /api/productos?nombre=zzz (producto inexistente)        | Arreglo vacío []                         |
| CP-04 | POST /api/productos con { nombre, categoria, descripcion }  | Status 201 y { id: N }                   |
| CP-05 | DELETE /api/productos/1 con producto existente              | Status 200 y { ok: true }                |
