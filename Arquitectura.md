## 📐 Diseño Arquitectónico

Se ha optado por una **arquitectura multicapa distribuida** para asegurar la escalabilidad, el mantenimiento y la correcta separación de responsabilidades:

* **Capa de Cliente (Frontend):** Interfaz responsiva diseñada para el usuario final que se comunica con el servidor mediante **HTTP/REST (JSON)**.
* **Capa de Acceso y Seguridad (API Gateway):** Gestiona el **Auth Service (JWT/Login)** y un **Rate Limiter** para evitar la saturación del sistema y garantizar un acceso seguro.
* **Capa de Lógica de Negocio (Backend):** Contiene el motor de búsqueda, la lógica de ordenamiento del comparador de precios y el validador de stock.
* **Capa de Integración (Adaptadores):** Implementa conectores específicos para cada cadena (**Lider, Jumbo, Santa Isabel**), permitiendo la interoperabilidad y el consumo de datos externos.
* **Capa de Datos (Persistencia):** * **Bases de Datos Relacionales:** Gestión de usuarios y persistencia de perfiles.
    * **Redis:** Cacheo temporal de precios para optimizar el rendimiento y minimizar la latencia de respuesta.
