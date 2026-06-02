# 💬 Conversaciones Completas Simuladas con Clarita Review
Este archivo contiene las transcripciones completas y realistas de las sesiones de refinamiento con **Clarita Review** para las cuatro Historias de Usuario clave. 

Puedes utilizar estos diálogos como plantilla exacta o guía para ingresarlos en tu herramienta de Clarita Review en línea y generar los enlaces reales requeridos para la entrega.

---

## 📑 Índice de Conversaciones
1. [US-01: Búsqueda Comparativa por Nombre](#us-01-búsqueda-comparativa-por-nombre)
2. [US-03: Ordenar por Precio y Alertas de Baja](#us-03-ordenar-por-precio-y-alertas-de-baja)
3. [US-07: Registro de Nuevos Usuarios](#us-07-registro-de-nuevos-usuarios)
4. [US-08: Inicio de Sesión Seguro con JWT](#us-08-inicio-de-sesión-seguro-con-jwt)

---

## US-01: Búsqueda Comparativa por Nombre

**Desarrollador (Dev):** 
> Hola Clarita, quiero refinar la Historia de Usuario **US-01: Búsqueda comparativa por nombre**. 
> Mi borrador es: 
> *"Como consumidor, quiero buscar un producto por su nombre para ver qué supermercado lo vende más barato."*

**Clarita Review:**
> ¡Hola! Es una excelente historia de usuario para comenzar, ya que es el núcleo de **CompraAventura**. Sin embargo, para que sea realmente útil y testeable, debemos definir mejor el alcance y el rendimiento de la búsqueda.
> 
> Te propongo las siguientes preguntas para refinarla:
> 1. **Rendimiento:** Al ser una comparativa multitienda, consultar múltiples APIs o scraping en tiempo real puede ser lento. ¿Cuál es el tiempo máximo de espera aceptable para el usuario?
> 2. **Utilidad de la Comparativa:** Si solo se encuentra el producto en un supermercado, no hay comparativa real. ¿Deberíamos exigir un mínimo de tiendas en el resultado para considerarlo exitoso?
> 3. **Normalización:** ¿Qué pasa si el usuario busca con mayúsculas, minúsculas o tildes (ej. "LeChe" o "Café")?

**Desarrollador (Dev):**
> Buen punto, Clarita. 
> 1. Para la velocidad, un tiempo de respuesta menor a 3 segundos sería lo ideal para no arruinar la experiencia del usuario.
> 2. Para comparar precios, necesitamos mostrar al menos 2 supermercados diferentes en la vista.
> 3. Sí, la búsqueda debe normalizarse eliminando tildes y sin importar mayúsculas/minúsculas.

**Clarita Review:**
> ¡Excelente! Con este feedback, he estructurado la historia refinada. Aquí tienes la versión final con Criterios de Aceptación claros (formato Gherkin) y Definición de Terminado (DoD):
> 
> ### 📋 US-01 Refinada: Búsqueda comparativa por nombre
> **Como** consumidor de retail,  
> **Quiero** ingresar el nombre de un producto en la barra de búsqueda,  
> **Para** comparar los precios en tiempo real de distintos supermercados y elegir la opción más económica.
> 
> #### 🔹 Criterios de Aceptación:
> * **CA-01 (Búsqueda exitosa):** 
>   * **Dado** que el usuario ingresa un término de búsqueda válido (ej: "Leche entera"),
>   * **Cuando** presiona buscar,
>   * **Entonces** el sistema debe desplegar una lista comparativa que muestre el producto en al menos dos (2) supermercados diferentes, ordenados de menor a mayor precio.
> * **CA-02 (Rendimiento):**
>   * **Dado** que el servidor recibe una consulta de búsqueda,
>   * **Cuando** se realiza la consulta multitienda,
>   * **Entonces** el tiempo total de respuesta del backend debe ser inferior a 3 segundos.
> * **CA-03 (Normalización de texto):**
>   * **Dado** que el usuario busca un término con mayúsculas/minúsculas o tildes (ej: "LÉchÉ"),
>   * **Cuando** el motor procesa la consulta,
>   * **Entonces** debe normalizar el texto (ignorar mayúsculas, minúsculas y tildes) y mostrar los resultados coincidentes correctos.
> 
> #### 🔹 Definition of Done (DoD) incorporado:
> - El endpoint `GET /api/productos/buscar` responde en < 3000ms.
> - Se crearon casos de prueba unitarios para la normalización lingüística.

---

## US-03: Ordenar por Precio y Alertas de Baja

**Product Owner (PO):**
> Hola Clarita, revisemos la **US-03: Ordenar por precio y alertas de baja**. 
> Mi borrador es:
> *"Como usuario, quiero ordenar mis resultados de búsqueda por precio y ver alertas si un producto está en oferta o ha bajado mucho de precio."*

**Clarita Review:**
> ¡Hola! Es una funcionalidad muy valiosa para potenciar el ahorro. Para refinarla, enfoquémonos en definir las reglas de negocio precisas:
> 
> 1. **Empate de Precios:** Si dos supermercados ofrecen el mismo producto al mismo precio, ¿cuál es el criterio secundario de ordenación?
> 2. **Definición de Alerta de Baja:** ¿Qué porcentaje de descuento o variación de precio califica para activar la "alerta de baja" y que se muestre destacada en la interfaz?

**Product Owner (PO):**
> 1. Si hay un empate en los precios, se ordenarán alfabéticamente por el nombre del supermercado.
> 2. Para la alerta de baja, definamos que el descuento debe ser igual o superior a un 15% respecto al precio promedio histórico del producto.

**Clarita Review:**
> ¡Perfecto! Esto elimina la ambigüedad para el equipo de desarrollo. La historia de usuario refinada queda de la siguiente manera:
> 
> ### 📋 US-03 Refinada: Ordenar por precio y alertas de baja
> **Como** comprador consciente del presupuesto,  
> **Quiero** ordenar la lista comparativa por precio y visualizar alertas visuales de descuentos significativos,  
> **Para** identificar rápidamente las mayores oportunidades de ahorro en mis compras.
> 
> #### 🔹 Criterios de Aceptación:
> * **CA-01 (Ordenamiento ascendente y empates):**
>   * **Dado** que se despliega una lista comparativa de precios,
>   * **Cuando** el usuario selecciona ordenar por precio (de menor a mayor),
>   * **Entonces** la lista se reordena de inmediato, y en caso de que existan precios idénticos, estos se listarán alfabéticamente por el nombre del supermercado.
> * **CA-02 (Alerta de baja significativa):**
>   * **Dado** que un producto tiene un descuento registrado en oferta,
>   * **Cuando** dicho descuento sea igual o mayor al 15% del precio base de lista,
>   * **Entonces** el producto se mostrará con una etiqueta destacada que diga "Alerta de Baja".
> 
> #### 🔹 Definition of Done (DoD) incorporado:
> - Test unitario que valide el comportamiento de ordenamiento con datos de precios idénticos (orden alfabético).
> - La regla de cálculo del 15% está encapsulada en una función pura en el backend.

---

## US-07: Registro de Nuevos Usuarios

**Desarrollador (Dev):**
> Hola Clarita, refinemos la **US-07: Registro de nuevos usuarios**. 
> Borrador inicial:
> *"Como nuevo usuario, quiero registrarme ingresando mi nombre, email y clave, para poder acceder al sistema."*

**Clarita Review:**
> ¡Hola! El registro es la puerta de entrada a la seguridad de la aplicación. Para evitar vulnerabilidades y malas prácticas, debemos añadir rigor técnico.
> 
> Mis sugerencias de refinamiento son:
> 1. **Unicidad:** ¿Qué ocurre si alguien intenta registrar un email que ya existe en la base de datos?
> 2. **Fortaleza de Contraseñas:** ¿Hay una longitud mínima de caracteres para evitar contraseñas débiles?
> 3. **Seguridad en Base de Datos (DoD):** ¿Cómo almacenamos la clave? Nunca debe guardarse en texto plano. ¿Qué algoritmo usaremos?

**Desarrollador (Dev):**
> 1. Si el email ya existe, el sistema debe arrojar un error HTTP 409 (Conflict) indicando claramente que el correo ya está registrado.
> 2. La contraseña debe tener como mínimo 8 caracteres.
> 3. En la base de datos, la contraseña debe almacenarse cifrada/hasheada usando **bcryptjs** (con salt de 10) en nuestro DoD.

**Clarita Review:**
> Excelente enfoque en seguridad informática. Aquí está la versión refinada que implementa estas reglas robustas:
> 
> ### 📋 US-07 Refinada: Registro de nuevos usuarios
> **Como** nuevo visitante de CompraAventura,  
> **Quiero** crear una cuenta personal proporcionando mi nombre completo, un email válido y una contraseña segura,  
> **Para** acceder a las funcionalidades personalizadas de seguimiento y alertas de precios.
> 
> #### 🔹 Criterios de Aceptación:
> * **CA-01 (Campos requeridos y formatos):**
>   * **Dado** que el usuario está en el formulario de registro,
>   * **Cuando** ingresa un email con formato inválido o una contraseña de menos de 8 caracteres,
>   * **Entonces** el sistema debe rechazar la solicitud con un código HTTP 400 (Bad Request) y mostrar el mensaje de error correspondiente.
> * **CA-02 (Email duplicado):**
>   * **Dado** que un email ya existe en la base de datos,
>   * **Cuando** otro usuario intenta registrarse con ese mismo email,
>   * **Entonces** el sistema debe responder con un código HTTP 409 (Conflict) e impedir el registro.
> * **CA-03 (Happy Path y Normalización):**
>   * **Dado** que los datos ingresados son correctos,
>   * **Cuando** el usuario envía el registro,
>   * **Entonces** se debe crear la cuenta en la base de datos SQLite, normalizando el correo a minúsculas, y retornar un código HTTP 201 (Created).
> 
> #### 🔹 Definition of Done (DoD) incorporado:
> - **[CRÍTICO]** Las contraseñas se almacenan hasheadas con bcryptjs (nunca texto plano).
> - Pruebas automatizadas en Thunder Client cubriendo clases de equivalencia para longitud de contraseña (7, 8 y 9 caracteres).

---

## US-08: Inicio de Sesión Seguro con JWT

**Desarrollador (Dev):**
> Hola Clarita, por último, refinemos la **US-08: Inicio de sesión seguro con JWT**.
> Borrador inicial:
> *"Como usuario registrado, quiero iniciar sesión con mi correo y clave para obtener un token y ver mi perfil."*

**Clarita Review:**
> ¡Hola! El inicio de sesión es crítico para la sesión y protección de datos. Debemos afinar la expiración, la seguridad de las respuestas y cómo se cierra la sesión.
> 
> Te planteo estas preguntas para el refinamiento:
> 1. **Expiración:** ¿Cuánto tiempo durará el token JWT antes de expirar?
> 2. **Seguridad contra enumeración:** Si el inicio de sesión falla, ¿el mensaje de error debe decir si lo que falló fue la contraseña o si el email no existe? (Aviso: revelar esto ayuda a atacantes a descubrir emails registrados).
> 3. **Cierre de sesión:** Dado que JWT es stateless (sin estado en el servidor), ¿dónde o cómo se maneja el logout?

**Desarrollador (Dev):**
> 1. El token JWT tendrá una expiración de exactamente 2 horas.
> 2. Para evitar enumeración, responderemos con un mensaje genérico "Credenciales inválidas" tanto si el correo no existe como si la contraseña está mal.
> 3. Para el logout, el backend validará el token y retornará una confirmación, aclarando en el mensaje de respuesta que el cliente (Frontend) debe destruir/eliminar el token almacenado de su memoria.

**Clarita Review:**
> Muy sabias decisiones de arquitectura de seguridad. He redactado la historia de usuario refinada con tus respuestas:
> 
> ### 📋 US-08 Refinada: Inicio de sesión seguro con JWT
> **Como** usuario registrado en la plataforma,  
> **Quiero** autenticarme con mis credenciales de correo y contraseña,  
> **Para** obtener un token de acceso seguro (JWT) que me permita consultar mi perfil privado y cerrar mi sesión en cualquier momento.
> 
> #### 🔹 Criterios de Aceptación:
> * **CA-01 (Login exitoso y generación de JWT):**
>   * **Dado** que el usuario ingresa sus credenciales válidas,
>   * **Cuando** hace clic en iniciar sesión,
>   * **Entonces** el sistema genera un token JWT firmado (con tiempo de expiración de 2 horas) y retorna un estado HTTP 200 con la información básica del usuario.
> * **CA-02 (Mensaje genérico de error):**
>   * **Dado** que un usuario ingresa una contraseña incorrecta o un correo inexistente,
>   * **Cuando** procesa el login,
>   * **Entonces** el sistema debe retornar un código HTTP 401 (Unauthorized) con el mensaje genérico "Credenciales inválidas" para proteger contra enumeración de cuentas.
> * **CA-03 (Acceso a rutas protegidas):**
>   * **Dado** que un endpoint requiere autenticación (ej: `/api/auth/perfil`),
>   * **Cuando** el usuario realiza una solicitud sin un token en formato `Bearer <token>` o con un token vencido,
>   * **Entonces** el sistema debe denegar el acceso devolviendo un estado HTTP 401.
> * **CA-04 (Logout explicativo):**
>   * **Dado** que un usuario con un token válido solicita cerrar sesión,
>   * **Cuando** llama al endpoint `/api/auth/logout`,
>   * **Entonces** el sistema responde con un estado HTTP 200 indicando que la sesión ha sido cerrada y que debe eliminar el token en el cliente.
> 
> #### 🔹 Definition of Done (DoD) incorporado:
> - El middleware `authMiddleware` implementa correctamente la validación de expiración y formato del header `Authorization: Bearer <token>`.
