# 🛒 CompraAventura

API REST para comparar precios de productos entre supermercados. Construida con **Node.js**, **Express** y **SQLite**.

---

## 🚀 Tecnologías

- **Node.js** — entorno de ejecución JavaScript
- **Express** — framework web minimalista
- **better-sqlite3** — base de datos SQL local, sin servidor
- **JWT + bcrypt** — autenticación segura de usuarios

---

## 📋 Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/auth/registro` | Registrar usuario |
| `POST` | `/api/auth/login` | Iniciar sesión |
| `GET` | `/api/productos` | Listar/buscar productos con filtro |
| `POST` | `/api/productos` | Crear producto |
| `PUT` | `/api/productos/:id` | Editar producto |
| `DELETE` | `/api/productos/:id` | Eliminar producto |
| `GET` | `/api/productos/:id/precios` | Comparar precios por supermercado |

---

## 💻 Instalación y ejecución

### Requisitos previos
- Node.js v18 o superior
- npm

### Pasos
```bash
git clone https://github.com/GlamzuSG/CompraAventura.git
cd CompraAventura/backend
npm install
npm start
```
La API queda disponible en `http://localhost:3000`

---

## 🧪 Ejemplos de uso con curl

### Crear un producto
```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Leche","categoria":"Lacteos","descripcion":"1 litro"}'
```

### Buscar productos con filtro
```bash
curl "http://localhost:3000/api/productos?nombre=leche&categoria=Lacteos"
```

### Comparar precios de un producto
```bash
curl http://localhost:3000/api/productos/1/precios
```

---

## 📁 Estructura del proyecto
---

## 📐 Artefactos del proyecto

| Artefacto | Enlace |
|-----------|--------|
| Diagrama de secuencia | [ver](./diagramas/secuencia.png) |
| Diagrama de despliegue | [ver](./diagramas/despliegue.png) |
| Diagrama de componentes | [ver](./diagramas/componentes.png) |
| Diagrama de estados | [ver](./diagramas/Estados-precio.png) |
| Diagrama de casos de uso | [ver](./diagramas/casos-de-uso.png) |
| Especificación de HU | [ver](./backend/EspecificacionesHU.md) |
| Casos de prueba | [ver](./backend/CasosDePrueba.md) |
| Deuda técnica | [ver](./backend/DeudaTecnica.md) |

---

## 👥 Responsabilidades del equipo

| Integrante | Rol | Ítems rúbrica |
|------------|-----|---------------|
| Vicente Fernandez Simonetti | Scrum Master, Developer | 3.1: GitHub Workflow |
| Joaquín López Rodríguez | Product Owner, Developer | 1.1: Mejora de HU |
| Joaquín Thomas Rojas Toledo | Developer, QA | 4.1: Casos de prueba |
| Máximo Torrijo Espinoza | Technical Lead, Developer | 2.1: Desarrollo APIs |

---

## 📝 Historia de usuario implementada

| ID | Nombre | Issue |
|----|--------|-------|
| US-01 | Búsqueda de productos con filtro | #1 |

---

*Proyecto académico — Ingeniería de Software, Universidad de Valparaíso.*