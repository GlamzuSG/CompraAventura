# 🛒 Compra Aventura: Sistema Inteligente de Comparativa Multitienda y Optimización de Consumo

## 📝 Problemática
Nuestro proyecto aborda la falta de transparencia en el mercado de consumo masivo mediante un motor de búsqueda avanzado. El objetivo es eliminar la brecha de información entre las cadenas de retail y los consumidores, permitiendo comparar costos, ofertas y disponibilidad de stock en tiempo real para facilitar una toma de decisiones eficiente y segura.

---

## 👥 Equipo de Trabajo (Scrum)

* **Scrum Master:** Vicente Fernandez Simonetti
* **Product Owner:** Joaquín Rodríguez López
* **Developers (Devs):**
    * Máximo Torrijo Espinoza
    * Joaquín Thomas Rojas Toledo

---

## 🛠️ Responsabilidades del Equipo

| Integrante | Rol | Ítems de la rúbrica a cargo |
| :--- | :--- | :--- |
| **Vicente Fernandez Simonetti** | Scrum Master | Facilitación de Ceremonias, Gestión de Impedimentos, Seguimiento de Atributos de Calidad. |
| **Joaquín Rodríguez López** | Product Owner | Gestión de Backlog, Definición de Historias de Usuario (US), Validación de Valor de Negocio. |
| **Máximo Torrijo Espinoza** | Developer | Capa de Cliente (Frontend), Módulo de Autenticación (JWT), Diseño de Interfaz (Figma). |
| **Joaquín Thomas Rojas Toledo** | Developer | Capa de Lógica (Backend), Integración de Adaptadores (APIs Externas), Persistencia (SQL/Redis). |

---



## 📋 Backlog de Historias de Usuario (Issues)

| ID | Historia de Usuario | Descripción | Criterios de Aceptación |
| :--- | :--- | :--- | :--- |
| **#1** | **Búsqueda Comparativa** | Como usuario, quiero buscar un producto por nombre para ver una comparativa de precios en una sola pantalla. | Mostrar lista comparativa multitienda al ingresar un nombre de producto existente. |
| **#2** | **Manejo de Errores** | Como usuario, quiero un mensaje claro cuando busco un producto que no existe. | Mostrar mensaje "Producto no encontrado" ante términos inexistentes en la BD. |
| **#3** | **Orden y Alertas** | Como comprador, quiero ordenar por precio y suscribirme a alertas de baja de costo. | Opción "Ordenar por menor precio" y confirmación de suscripción a notificaciones de precio. |
| **#4** | **Carga Administrativa** | Como administrador, quiero cargar precios vía CSV y destacar productos patrocinados. | Actualización de precios en < 5 min vía CSV y posicionamiento prioritario de marcas promocionadas. |
| **#5** | **Resiliencia y Voz** | Como usuario, quiero ver resultados parciales si una tienda cae y poder buscar por voz. | Mensaje discreto ante caída de servidores externos y procesamiento de audio a texto para búsqueda. |
| **#6** | **Priorización GPS** | Como usuario con GPS, quiero ver primero las ofertas de las sucursales más cercanas. | Priorizar resultados de tiendas dentro de un radio de 5 km de la ubicación actual. |
| **#7** | **Registro de Usuarios** | Como usuario nuevo, quiero registrarme para guardar mis preferencias y listas. | Formulario de validación, creación de cuenta y redirección exitosa al Dashboard. |
| **#8** | **Autenticación JWT** | Como usuario, quiero iniciar sesión de forma segura para acceder a mis datos privados. | Autenticación mediante tokens JWT y manejo correcto del cierre de sesión (logout). |
| **#9** | **Sugerencias Dinámicas** | Como usuario, quiero sugerencias en tiempo real mientras escribo para agilizar la búsqueda. | Despliegue de sugerencias al escribir 2 caracteres y visualización de resultados multitienda. |
| **#10** | **Filtros Avanzados** | Como usuario, quiero aplicar filtros de categoría, precio y tienda para refinar resultados. | Actualización inmediata de la lista según filtros aplicados y opción de "Limpiar filtros". |



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
