# 🛒 Compra Aventura: Sistema Inteligente de Comparativa Multitienda y Optimización de Consumo

## 📝 Problemática
Nuestro proyecto aborda la falta de transparencia en el mercado de consumo masivo mediante un motor de búsqueda avanzado. El objetivo es eliminar la brecha de información entre las cadenas de retail y los consumidores, permitiendo comparar costos, ofertas y disponibilidad de stock en tiempo real para facilitar una toma de decisiones eficiente y segura.

---

## 👥 Equipo de Trabajo (Scrum)

* **Scrum Master:** Vicente Fernandez Simonetti
* **Product Owner:** Joaquín López Rodríguez
* **Developers (Devs):**
    * Máximo Torrijo Espinoza
    * Joaquín Thomas Rojas Toledo

---

## 🛠️ Responsabilidades del Equipo

| Integrante | Rol | Ítems de la rúbrica a cargo |
| :--- | :--- | :--- |
| **Vicente Fernandez Simonetti** | Scrum Master | Facilitación de Ceremonias, Gestión de Impedimentos, Seguimiento de Atributos de Calidad. |
| **Joaquín Rodríguez López** | Product Owner | Gestión de Backlog, Definición de Historias de Usuario (US), Validación de Valor de Negocio. |
| **Joaquín Thomas Rojas Toledo** | Developer | Capa de Cliente (Frontend), Módulo de Autenticación (JWT), Diseño de Interfaz (Figma). |
| **Máximo Torrijo Espinoza** | Developer | Capa de Lógica (Backend), Integración de Adaptadores (APIs Externas), Persistencia (SQL/Redis). |

 
---



## 📋 Lista de Historias de Usuario

| ID | Nombre | Issue |
| :--- | :--- | :--- |
| **US-01** | Búsqueda comparativa por nombre | [Issue #1](https://github.com/GlamzuSG/CompraAventura/issues/1) |
| **US-02** | Manejo de productos no encontrados | [Issue #2](https://github.com/GlamzuSG/CompraAventura/issues/2) |
| **US-03** | Ordenar por precio y alertas de baja | [Issue #3](https://github.com/GlamzuSG/CompraAventura/issues/3) |
| **US-04** | Carga masiva de precios (CSV) y patrocinios | [Issue #4](https://github.com/GlamzuSG/CompraAventura/issues/4) |
| **US-05** | Resiliencia de servidores y búsqueda por voz | [Issue #5](https://github.com/GlamzuSG/CompraAventura/issues/5) |
| **US-06** | Priorización de resultados por GPS | [Issue #6](https://github.com/GlamzuSG/CompraAventura/issues/6) |
| **US-07** | Registro de nuevos usuarios | [Issue #7](https://github.com/GlamzuSG/CompraAventura/issues/7) |
| **US-08** | Inicio de sesión seguro con JWT | [Issue #8](https://github.com/GlamzuSG/CompraAventura/issues/8) |
| **US-09** | Sugerencias dinámicas de búsqueda | [Issue #9](https://github.com/GlamzuSG/CompraAventura/issues/9) |
| **US-10** | Filtros avanzados por categoría y tienda | [Issue #10](https://github.com/GlamzuSG/CompraAventura/issues/10) |




---

## 🧩 Entidades de Dominio

El sistema se compone de las siguientes entidades principales (objetos del mundo real):

* **Usuario**
    - id, nombre, email, contraseña
* **Producto**
    - id, nombre, categoría
* **Supermercado**
    - id, nombre, ubicación
* **Precio**
    - id, valor, fecha, producto_id, supermercado_id
* **Oferta**
    - id, descuento, vigencia


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
