# 🛒 Compra Aventura: Sistema Inteligente de Comparativa Multitienda y Optimización de Consumo

## 📝 Problemática

Nuestro proyecto aborda la falta de transparencia en el mercado de consumo masivo mediante un motor de búsqueda avanzado. El objetivo es eliminar la brecha de información entre las cadenas de retail y los consumidores, permitiendo comparar costos, ofertas y disponibilidad de stock en tiempo real para facilitar una toma de decisiones eficiente y segura.

---

## 👥 Equipo de Trabajo (Scrum)

- **Scrum Master:** Vicente Fernandez Simonetti
- **Product Owner:** Joaquín López Rodríguez
- **Developers:**
  - Máximo Torrijo Espinoza
  - Joaquín Thomas Rojas Toledo

---

## 🛠️ Responsabilidades del Equipo

| Integrante | Rol | Ítems de la rúbrica a cargo |
|------------|-----|-----------------------------|
| Vicente Fernandez Simonetti | Scrum Master | Facilitación de Ceremonias, Gestión de Impedimentos, Seguimiento de Atributos de Calidad |
| Joaquín Rodríguez López | Product Owner | Gestión de Backlog, Definición de Historias de Usuario, Validación de Valor de Negocio |
| Joaquín Thomas Rojas Toledo | Developer | Capa de Cliente (Frontend), Módulo de Autenticación (JWT), Diseño de Interfaz (Figma) |
| Máximo Torrijo Espinoza | Developer | Capa de Lógica (Backend), Integración de Adaptadores (APIs Externas), Persistencia (SQL/Redis) |

---

## 📋 Lista de Historias de Usuario

| ID | Nombre | Issue |
|----|--------|-------|
| US-01 | Búsqueda comparativa por nombre | [#1](https://github.com/GlamzuSG/CompraAventura/issues/1) |
| US-02 | Manejo de productos no encontrados | [#2](https://github.com/GlamzuSG/CompraAventura/issues/2) |
| US-03 | Ordenar por precio y alertas de baja | [#3](https://github.com/GlamzuSG/CompraAventura/issues/3) |
| US-04 | Carga masiva de precios (CSV) y patrocinios | [#4](https://github.com/GlamzuSG/CompraAventura/issues/4) |
| US-05 | Resiliencia de servidores y búsqueda por voz | [#5](https://github.com/GlamzuSG/CompraAventura/issues/5) |
| US-06 | Priorización de resultados por GPS | [#6](https://github.com/GlamzuSG/CompraAventura/issues/6) |
| US-07 | Registro de nuevos usuarios | [#7](https://github.com/GlamzuSG/CompraAventura/issues/7) |
| US-08 | Inicio de sesión seguro con JWT | [#8](https://github.com/GlamzuSG/CompraAventura/issues/8) |
| US-09 | Sugerencias dinámicas de búsqueda | [#9](https://github.com/GlamzuSG/CompraAventura/issues/9) |
| US-10 | Filtros avanzados por categoría y tienda | [#10](https://github.com/GlamzuSG/CompraAventura/issues/10) |

---

## 🧩 Entidades de Dominio

El sistema se compone de las siguientes entidades principales:

- **Usuario** — id, nombre, email, contraseña
- **Producto** — id, nombre, categoría
- **Supermercado** — id, nombre, ubicación
- **Precio** — id, valor, fecha, producto_id, supermercado_id
- **Oferta** — id, descuento, vigencia

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

## 💻 Ejecutar localmente

### Requisitos previos

- Node.js v18 o superior
- npm
- Docker (opcional, para ejecutar con contenedores)

### Variables de entorno

Crea un archivo `.env` dentro de `backend/` con las siguientes variables:

```env
PORT=3000
JWT_SECRET=tu_clave_secreta
```

### Instalación y ejecución (sin Docker)

```bash
git clone https://github.com/GlamzuSG/CompraAventura.git
cd CompraAventura/backend
npm install
npm start
```

La API quedará disponible en `http://localhost:3000`

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
## ⚙️ Características Funcionales

| Módulo | Descripción |
| :--- | :--- |
| **Autenticación** | Sistema centralizado con credenciales cifradas mediante **JWT**. |
| **Comparativa Multitienda** | Despliegue de precios y ofertas de diversas fuentes simultáneamente. |
| **Sugerencias Dinámicas** | Motor de recomendaciones para minimizar la carga cognitiva. |
| **Monitoreo de Stock Real** | Verificación de disponibilidad de artículos en tiempo real. |

---

## 🎨 Diseño (Figma)
🔗 [Prototipo en Figma](https://rack-studio-58141370.figma.site/login)


## 🎁 Bonus

| Bonus | Estado | Ubicación |
|-------|--------|-----------|
| Contenedores (docker-compose) | ✅ Sí | ./docker-compose.yml |
| Spec-driven development | ❌ No | — |

---

*Proyecto académico — Ingeniería de Software, Universidad de Valparaíso.*
