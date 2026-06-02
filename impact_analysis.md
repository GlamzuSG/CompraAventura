# CompraAventura - Motor de Seguimiento y Comparación de Precios

## 1. Descripción del Sistema
El sistema es un motor de búsqueda y comparación de precios que permite a los usuarios realizar un seguimiento inteligente de productos. La solución evoluciona de un servidor de visualización estático a un **ecosistema asíncrono** que gestiona notificaciones automáticas, persistencia de datos para Machine Learning y estabilidad garantizada durante procesos de ingesta masiva de datos.

## 2. Historias de Usuario (GitHub Issues)

| ID | Nombre | Issue |
| :--- | :--- | :--- |
| **US-01** | Notificación de Variación de Precios vía Gmail | #1 |
| **US-02** | Persistencia de Búsquedas para Machine Learning | #2 |
| **US-03** | Arquitectura Basada en Colas de Trabajo | #3 |
| **US-04** | Estabilidad del Motor durante Carga de Datos | #4 |
| **US-05** | Selección y Gestión de Productos Favoritos | #5 |

---

## 3. Requisitos Extrafuncionales (ReqExtrafuncionales.md)

| REF ID | Clasificación (ISO 25010) | Descripción | Prioridad |
| :--- | :--- | :--- | :--- |
| **REF-01** | Rendimiento | El registro de búsquedas en MySQL debe realizarse en < 50ms. | Media |
| **REF-02** | Disponibilidad | Durante la ingesta nocturna, la latencia no debe degradarse > 10%. | Alta |
| **REF-03** | Escalabilidad | Uso de colas de trabajo (Redis/Celery) para procesos de largo aliento. | Alta |
| **REF-04** | Fiabilidad | Reintento automático (hasta 3 veces) en fallos de envío de Gmail. | Media |

---

## 4. Análisis de Arquitectura: Orientada a Eventos (EDA)

### 4.1 ¿Por qué se reemplaza el modelo de Multi-Capas?
El modelo de **Multi-Capas Tradicional (Monolítico)** opera de forma síncrona, lo que causaba los siguientes problemas:
* **Bloqueo del Sistema:** Al intentar guardar el historial en MySQL y enviar correos simultáneamente, el sistema genera latencia. Si un componente es lento, toda la aplicación se vuelve inestable.
* **Inestabilidad Nocturna:** El ingreso masivo de datos nocturnos compite por los mismos recursos (CPU/RAM) que las consultas de los usuarios, causando fallos en la experiencia de navegación.

### 4.2 Componentes de la Nueva Arquitectura
* **BFF / API Gateway:** Maneja la autenticación JWT y consultas rápidas a caché para respuestas en < 2s.
* **Message Broker (Redis/RabbitMQ):** Actúa como el "pulmón" del sistema. Recibe eventos y los distribuye sin bloquear al usuario.
* **Micro-Workers Asíncronos:** Servicios independientes que procesan el envío de correos, el historial en MySQL y el entrenamiento de modelos de ML.

---

## 5. Análisis de Impacto

### 5.1 Impacto en Entidades y Módulos
* **Nueva Tabla `search_logs`:** Almacena `ID_Usuario`, `Producto` y `Timestamp` para alimentar modelos de ML.
* **Capa de Datos:** Se priorizan las consultas de lectura sobre las de escritura durante la carga masiva mediante réplicas de lectura.
* **Worker de Notificaciones:** Gestiona la lógica de comparación de precios y despacho asíncrono vía Gmail.

### 5.2 Impacto en Mockups
* **Pantalla de Resultados:** Inclusión de botón "Seguir" (campana) e indicadores visuales de estado.
* **Pantalla de "No Resultados":** Nueva sección de sugerencias inteligentes "Basado en tus búsquedas anteriores".
* **Panel de Usuario:** Vista para gestionar alertas de precio y configuración de Gmail.

---

## 6. Trazabilidad Técnica

| Historia | REF Relacionado | Módulo Impactado | Decisión de Diseño |
| :--- | :--- | :--- | :--- |
| **US-01** | REF-04 | Worker Gmail | Desacoplamiento vía Broker |
| **US-02** | REF-01 | MySQL / ML | Persistencia asíncrona |
| **US-03** | REF-03 | Infraestructura | Implementación de Redis/Celery |
| **US-04** | REF-02 | API / DB | Separación de procesos Worker/API |

---

## 7. Justificación y Trade-offs
La transición a una **Arquitectura Orientada a Eventos** garantiza que el sistema sea **resiliente** (los datos permanecen seguros en la cola si un proceso falla) y **escalable**. El principal trade-off es el aumento en la complejidad técnica de la infraestructura, pero se soluciona definitivamente el problema de latencia y bloqueos para el usuario final.
