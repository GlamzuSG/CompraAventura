## 📐 Diseño Arquitectónico

## 1. Estilo Arquitectónico

**Estilo adoptado:** Arquitectura Multicapa Distribuida (Layered Architecture).

### Justificación basada en REF priorizados:

La arquitectura multicapa distribuida fue seleccionada para asegurar una correcta separación de responsabilidades, facilitar la escalabilidad del sistema y cumplir con los requisitos extrafuncionales definidos para Compra Aventura.

| REF ID | Descripción | Prioridad | Cómo lo aborda la arquitectura |
|--------|-------------|----------|--------------------------------|
| REF-01 | El sistema debe responder en menos de 2 segundos | Alta | Uso de Redis para cachear precios y reducir latencia en consultas repetidas |
| REF-02 | Soportar múltiples usuarios simultáneos | Alta | Separación de capas permite escalar backend y frontend de forma independiente |
| REF-03 | Contraseñas encriptadas | Alta | Manejo seguro de credenciales en la capa de backend |
| REF-04 | Autenticación mediante JWT | Alta | Implementación de API Gateway que gestiona autenticación y control de acceso |
| REF-07 | Disponibilidad del sistema (99%) | Alta | Arquitectura distribuida que reduce puntos únicos de falla |

Se seleccionó una arquitectura multicapa distribuida debido a que el sistema requiere integrar múltiples fuentes externas (supermercados), manejar autenticación segura y garantizar tiempos de respuesta bajos. La separación en capas permite aislar responsabilidades, mejorar el mantenimiento y asegurar que los requisitos de rendimiento, seguridad y disponibilidad sean abordados de forma efectiva.

## 2. Diagrama de Arquitectura

 

<img width="901" height="551" alt="diagramaarquitectura drawio" src="https://github.com/user-attachments/assets/164d8775-dbb8-4378-88dd-54fa2cd65c3c" />

 

## 3. Descomposición Modular

**Fundamentación:** Se utiliza una descomposición por capas para reducir el acoplamiento y mejorar la mantenibilidad del sistema.

### Módulo 1: Presentación (Frontend)
- **Responsabilidad:** Permitir al usuario buscar productos y visualizar comparaciones.
- **Ofrece:** Interfaz de usuario y solicitudes HTTP.
- **Depende de:** API Gateway.

### Módulo 2: Acceso y Seguridad (API Gateway)
- **Responsabilidad:** Gestionar autenticación y validación de usuarios.
- **Ofrece:** Acceso seguro mediante JWT.
- **Depende de:** Backend.

### Módulo 3: Lógica de Negocio (Backend)
- **Responsabilidad:** Procesar búsquedas y comparar precios.
- **Ofrece:** Servicios de lógica de negocio.
- **Depende de:** Adaptadores y base de datos.

### Módulo 4: Integración (Adaptadores)
- **Responsabilidad:** Obtener datos desde APIs externas.
- **Ofrece:** Datos normalizados de precios y ofertas.
- **Depende de:** Servicios externos.

### Módulo 5: Datos (Persistencia + Caché)
- **Responsabilidad:** Almacenar datos y optimizar consultas.
- **Ofrece:** Acceso a base de datos y caché (Redis).
- **Depende de:** Sistema de almacenamiento.

## 4. Decisiones de Diseño

### Decisión 1
- **Decisión:** Usar arquitectura multicapa distribuida.
- **Motivación:** Separar responsabilidades y facilitar escalabilidad.
- **Alternativas consideradas:** Arquitectura monolítica simple.
- **Impacto:** Mejora la mantenibilidad y la organización del sistema.

### Decisión 2
- **Decisión:** Implementar autenticación con JWT.
- **Motivación:** Cumplir requisitos de seguridad (REF-04).
- **Alternativas consideradas:** Autenticación basada en sesiones tradicionales.
- **Impacto:** Permite un acceso más seguro y controlado al sistema.

### Decisión 3
- **Decisión:** Usar Redis como caché.
- **Motivación:** Reducir tiempos de respuesta (REF-01).
- **Alternativas consideradas:** Consultas directas a la base de datos o a APIs externas sin caché.
- **Impacto:** Mejora el rendimiento y reduce la latencia.
