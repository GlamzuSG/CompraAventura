# 🛒 CompraAventura

API REST para comparar precios de productos entre supermercados. Construida con **Node.js**, **Express** y **SQLite**.

---

## 🚀 Tecnologías

- **Node.js** — entorno de ejecución JavaScript
- **Express** — framework web minimalista
- **better-sqlite3** — base de datos SQL local, sin servidor
- **JWT + bcrypt** — autenticación segura de usuarios

---

## 👥 Equipo de Trabajo

| Integrante | Rol | Ítems rúbrica |
|------------|-----|---------------|
| Vicente Fernandez Simonetti | Scrum Master, Developer | 3.1: GitHub Workflow |
| Joaquín López Rodríguez | Product Owner, Developer | 1.1: Mejora de HU |
| Joaquín Thomas Rojas Toledo | Developer, QA | 4.1: Casos de prueba |
| Máximo Torrijo Espinoza | Technical Lead, Developer | 2.1: Desarrollo APIs |

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

## 💻 Ejecutar localmente

### Requisitos previos
- Node.js v18 o superior
- npm
- Docker (opcional, para ejecutar con contenedores)

### Variables de entorno
Crea un archivo `.env` dentro de `backend/` con las siguientes variables:
---
### Instalación y ejecución (sin Docker)
```bash
git clone https://github.com/GlamzuSG/CompraAventura.git
cd CompraAventura/backend
npm install
npm start
```
La API quedará disponible en `http://localhost:3000`
---
### Instalación y ejecución (con Docker)
```bash
docker-compose up --build
```
La API quedará disponible en `http://localhost:3000`

### Requisitos
- Node.js v18 o superior
- npm

### Pasos

```bash
git clone https://github.com/GlamzuSG/CompraAventura.git
cd CompraAventura/backend
npm install
npm start
```

La API quedará disponible en `http://localhost:3000`

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

```
CompraAventura/
├── backend/
│   ├── src/
│   │   ├── db/database.js
│   │   ├── routes/productos.js
│   │   ├── routes/login.js
│   │   ├── routes/registro.js
│   │   ├── middleware/auth.js
│   │   └── index.js
│   ├── Dockerfile
│   └── package.json
├── diagramas/
├── docker-compose.yml
└── README.md
```

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

## 📝 Historias de usuario

| ID | Nombre | Issue |
|----|--------|-------|
| US-01 | Búsqueda comparativa por nombre | [#1](https://github.com/GlamzuSG/CompraAventura/issues/1) |
| US-02 | Manejo de productos no encontrados | [#2](https://github.com/GlamzuSG/CompraAventura/issues/2) |
| US-03 | Ordenar por precio y alertas | [#3](https://github.com/GlamzuSG/CompraAventura/issues/3) |
| US-04 | Carga masiva de precios (CSV) | [#4](https://github.com/GlamzuSG/CompraAventura/issues/4) |
| US-05 | Resiliencia de servidores | [#5](https://github.com/GlamzuSG/CompraAventura/issues/5) |
| US-06 | Priorización por GPS | [#6](https://github.com/GlamzuSG/CompraAventura/issues/6) |
| US-07 | Registro de usuarios | [#7](https://github.com/GlamzuSG/CompraAventura/issues/7) |
| US-08 | Inicio de sesión con JWT | [#8](https://github.com/GlamzuSG/CompraAventura/issues/8) |
| US-09 | Sugerencias dinámicas | [#9](https://github.com/GlamzuSG/CompraAventura/issues/9) |
| US-10 | Filtros avanzados | [#10](https://github.com/GlamzuSG/CompraAventura/issues/10) |
---
## 🎁 Bonus

| Bonus | Estado | Ubicación |
|-------|--------|-----------|
| Contenedores (docker-compose) | ✅ Sí | ./docker-compose.yml |
| Spec-driven development | ❌ No | — |
---

*Proyecto académico — Ingeniería de Software, Universidad de Valparaíso.*
