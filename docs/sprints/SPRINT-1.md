# Sprint 1 Registro y verificación de cuenta

## Objetivo

Un estudiante puede crear una cuenta con correo y contraseña, recibir el mensaje de verificación y verificar su correo. El servidor impide acceder a las funciones PvP mientras la cuenta no esté verificada.

Al terminar se demostrará este flujo desde la interfaz hasta la persistencia, con manejo de errores y pruebas. La épica relacionada es **RSY-1 Onboarding y perfil**.

## Duración y capacidad propuesta

Duración: dos semanas, equivalentes a diez días laborables. Fecha de planificación: 6 de octubre de 2026. Inicio y fin quedan pendientes del calendario del equipo; no se cuentan festivos como días disponibles sin confirmación.

Hipótesis de capacidad para dimensionar: una persona con 6 horas efectivas por día, 60 horas totales. Se proponen 50 horas para el backlog funcional, 6 para habilitación y documentación, y 4 de reserva. No es una velocidad observada ni un compromiso del equipo. Si la disponibilidad real es menor, recalcular antes de iniciar. Responsables nominales pendientes; los perfiles de la tabla indican quién debería asumir el trabajo.

El alcance obligatorio es el registro por correo. Las opciones Google y Apple de RSY-18 y RSY-19 quedan para un sprint posterior; estas dos tareas solo se completan parcialmente en este sprint y deben conservar esa distinción en Jira.

## Backlog seleccionado

| Orden | Incidencia | Entrega del Sprint 1 | Dependencias |
| --- | --- | --- | --- |
| 1 | RSY-9 | Modelo de usuario y credenciales; email único normalizado; creación transaccional de cuenta y endpoint de registro | Decisiones técnicas iniciales |
| 2 | RSY-10 | Hash seguro de contraseña; ausencia de secretos en respuestas y logs | RSY-9 |
| 3 | RSY-11 | Pruebas unitarias del registro: éxito, duplicados, datos inválidos y reversión de fallos | RSY-9, RSY-10 |
| 4 | RSY-15 | Token de verificación y envío de correo; vencimiento y reenvío controlado | RSY-9 |
| 5 | RSY-16 | Validación de token y actualización del estado de cuenta | RSY-15 |
| 6 | RSY-17 | Restricción de acceso PvP para cuentas no verificadas, aplicada en servidor | RSY-16 |
| 7 | RSY-18, alcance parcial | Diseño accesible del formulario de correo y contraseña y de los estados de verificación | Contrato de registro |
| 8 | RSY-19, alcance parcial | Conexión del formulario de correo con registro y verificación | RSY-9, RSY-10, RSY-15, RSY-16 |
| 9 | RSY-20 | Errores por campo, carga, éxito y reintento ante fallo de red | RSY-19, alcance parcial |
| 10 | RSY-22 | Pruebas de email duplicado, contraseña inválida, campos vacíos y doble envío | Registro integrado |

RSY-17 depende de la identidad autenticada y de un punto protegido donde probar la restricción. El sprint debe incluir una sesión mínima y una ruta protegida de prueba si esos mecanismos aún no existen. No exige construir el motor de duelos.

## Subtareas necesarias

Las subtareas nuevas del backlog mejorado no tenían clave asignada antes de su importación. Buscar por título y reutilizarlas si ya existen; no volver a crearlas.

| Padre | Subtarea | Criterio de terminación |
| --- | --- | --- |
| RSY-9 | Implementar creación transaccional de cuenta y endpoint de registro | Persistencia atómica; duplicado rechazado; respuesta sin credenciales; fallo revierte usuario y credenciales |
| RSY-15 | Definir vencimiento y reenvío seguro de verificación | TTL y límite acordados; token almacenado como hash; reenvío invalida el anterior; vencimiento y abuso probados |
| RSY-9 | Documentar contrato y migración inicial | Campos, restricciones, códigos de error y procedimiento de migración registrados y usados por frontend y pruebas |
| RSY-17 | Implementar identidad mínima y protección de acceso | Servidor identifica usuario de forma verificable; cliente no puede suplantarlo mediante un ID; cuenta no verificada recibe rechazo en ruta protegida |
| RSY-19 | Integrar pantalla de confirmación y reenvío | Mostrar estado pendiente, verificación correcta y error de token; reenvío respeta el límite del servidor |
| RSY-22 | Validar flujo completo de registro y verificación | Evidencia reproducible de cuenta nueva, correo, token, verificación y cambio de permiso |

Las últimas cuatro subtareas son propuestas adicionales de este sprint. La instalación del entorno, configuración de base de datos, proveedor de correo de pruebas y ejecución automatizada de pruebas forman parte del trabajo de habilitación de estas entregas.

## Criterios de aceptación del sprint

1. Con datos válidos se crea exactamente una cuenta; correo normalizado evita duplicados por espacios y mayúsculas conforme a la política acordada.
2. La contraseña se almacena como hash con salt usando una biblioteca adecuada. La contraseña, su hash y los tokens no aparecen en respuestas ni logs.
3. La verificación usa un token impredecible, de un solo uso y con vencimiento. El enlace funciona en el entorno de demostración.
4. Tokens vencidos, alterados, reutilizados o reemplazados por reenvío son rechazados con un mensaje comprensible.
5. Una cuenta sin verificar no accede al punto protegido PvP. Tras verificar, supera el control de email sin omitir otros permisos necesarios.
6. El formulario evita envíos repetidos, presenta errores por campo y permite recuperarse de fallos de red sin crear cuentas duplicadas.
7. El flujo puede operarse con teclado y muestra etiquetas, foco y estados de carga y confirmación.
8. Pruebas automatizadas cubren registro, verificación y autorización. Se adjunta evidencia del recorrido integrado y de las correcciones.

## Secuencia de trabajo propuesta

| Días | Trabajo | Resultado esperado |
| --- | --- | --- |
| 1 y 2 | Acordar decisiones, habilitar entorno, diseñar modelo y contrato; preparar interfaz | Contrato y migración revisados; aplicación ejecutable en desarrollo |
| 3 y 4 | Implementar registro, hash, sesión mínima y pruebas unitarias | Registro persistente y protegido contra duplicados |
| 5 y 6 | Implementar envío, validación, vencimiento y reenvío del token | Verificación completa en entorno de pruebas |
| 7 y 8 | Integrar frontend, restricción PvP y errores | Flujo integrado con permisos comprobables |
| 9 | Ejecutar casos límite y recorrido completo; corregir defectos | Evidencia de aceptación y defectos críticos resueltos |
| 10 | Demostración, revisión del sprint y retrospectiva | Entregas aceptadas y ajustes para Sprint 2 |

El equipo confirma esta secuencia tras estimar. Si la capacidad no alcanza, preservar primero el flujo de correo integrado; no declarar terminada una entrega sin su validación.

## Estimación inicial y responsables

| Trabajo | Horas propuestas | Perfil responsable | Resultado verificable |
| --- | --- | --- | --- |
| Habilitación del monorepo, PostgreSQL, Mailpit y documentación | 6 | Desarrollo | Instalación, migración y arranque reproducibles |
| RSY-9 modelo, contrato y registro transaccional | 8 | Backend | Cuenta y credenciales atómicas; unicidad del correo |
| RSY-10 hash de contraseña | 3 | Backend | Argon2id y ausencia de secretos en la respuesta |
| RSY-11 pruebas de registro | 5 | Backend y QA | Éxito, datos inválidos, duplicados y rollback |
| RSY-15 correo y reenvío seguro | 6 | Backend | Correo en Mailpit, TTL y cooldown |
| RSY-16 consumir token y verificar | 4 | Backend | Rechazo de tokens alterados, vencidos y usados |
| RSY-17 sesión mínima y restricción PvP | 5 | Backend | 401 sin sesión; 403 sin verificar; acceso verificado |
| RSY-18 diseño de registro por correo | 5 | Frontend | Interfaz adaptable, etiquetas, teclado y estados |
| RSY-19 integración por correo | 6 | Frontend | Recorrido registro, confirmación y sesión |
| RSY-20 errores y recuperación | 3 | Frontend | Errores por campo, red y envío de correo |
| RSY-22 validación integrada | 5 | QA y desarrollo | Pruebas automatizadas y demostración del recorrido |
| Reserva para integración y defectos | 4 | Desarrollo | No se consume como funcionalidad adicional |
| Total | 60 | Por asignar | Confirmar capacidad antes de iniciar |

Son horas de trabajo propuestas, no horas ya invertidas. Las subtareas se incluyen en la estimación de su padre y no se suman nuevamente. RSY-18 y RSY-19 solo estiman el alcance de correo.

## Decisiones técnicas del Sprint 1

- Monorepo npm con `apps/web` (Next.js, React, TypeScript y Tailwind CSS) y `apps/api` (NestJS y TypeScript).
- PostgreSQL 17, consultas parametrizadas con `pg` y migración SQL transaccional. Docker Compose habilita base y correo local.
- Contraseña de 12 a 128 caracteres, sin reglas arbitrarias de símbolos. Argon2id con 64 MiB, 3 iteraciones y paralelismo 1; calibrar consumo en el entorno de despliegue.
- Email normalizado con trim y minúsculas. La política inicial informa duplicados para permitir recuperar el acceso mediante inicio de sesión. No se implementa recuperación de contraseña en este sprint.
- Sesión opaca aleatoria de 256 bits, hash SHA-256 persistido, vencimiento de 7 días y cookie HttpOnly con SameSite Lax. Secure obligatorio en producción; cierre elimina la sesión del servidor.
- Token de verificación aleatorio de 256 bits, hash SHA-256 persistido, TTL inicial de 30 minutos y un reenvío cada 60 segundos por usuario. Reenvío reemplaza el token anterior. Valores configurables.
- Mailpit captura correos de desarrollo. Un fallo SMTP conserva la cuenta y se informa al usuario, quien puede reenviar desde su sesión. El enlace se consume mediante confirmación POST, no al abrirlo.
- Frontend y API se consumen desde el mismo origen mediante proxy de Next.js. La API exige Origin autorizado en escrituras y limita solicitudes por IP a 30 por minuto en una instancia.
- La ruta `/api/pvp/access` comprueba autenticación y correo verificado. No crea duelos ni implementa Socket.IO; estos pertenecen al siguiente alcance PvP.
- Pruebas de servicio con Vitest; recorrido de navegador con Playwright. Una base dedicada permite repetir las pruebas de persistencia contra PostgreSQL real.

Estas decisiones quedan adoptadas para la base inicial. La aceptación funcional y la configuración de producción corresponden al equipo antes del lanzamiento.

## Pendientes de la reunión de inicio

- Confirmar inicio, fin, disponibilidad real y responsables nominales.
- Revisar las estimaciones de la tabla con quienes harán el trabajo.
- Validar política de contraseña, normalización de email, TTL y reenvío con el responsable funcional.
- Definir proveedor SMTP y dominio HTTPS de producción antes del despliegue.

Guardar las decisiones acordadas junto al código. No colocar credenciales reales en el repositorio.

## Riesgos y respuesta

| Riesgo | Respuesta |
| --- | --- |
| Credenciales de correo o entrega bloqueadas | Configurar buzón o servidor de correo de pruebas desde el primer día; demostrar entrega y apertura del enlace |
| Repositorio inicial sin aplicación | Reservar capacidad explícita para habilitación técnica antes de comprometer todas las tareas |
| RSY-18 y RSY-19 incluyen OAuth | Registrar alcance parcial de correo; conservar Google y Apple pendientes para otro sprint |
| PvP aún no implementado | Verificar el control en una ruta protegida y reutilizarlo cuando se creen cola y duelos |
| Configuración de sesión no acordada | Resolver antes de implementar el control RSY-17; no usar un ID enviado por el cliente como identidad |

## Definición de terminado

- Código revisado y guardado en el repositorio; aplicación y migraciones ejecutables con instrucciones reproducibles.
- Criterios de la entrega comprobados y pruebas correspondientes aprobadas.
- Configuración mediante variables de entorno documentada; ejemplo sin secretos reales.
- Errores de persistencia, red, correo y autorización tratados según su contrato.
- Evidencia de demostración y defectos pendientes registrados en Jira.
- No quedan defectos que bloqueen el flujo objetivo o permitan saltarse la autorización.

## Demostración de cierre

Crear una cuenta, comprobar que el acceso protegido falla, abrir el correo de pruebas y verificar. Comprobar después que el control de email permite continuar. Repetir con email duplicado, token vencido, token reutilizado y doble envío. Mostrar que la base guarda un hash y que las respuestas no contienen secretos.

## Seguimiento en Jira

Crear Sprint 1 en el tablero RSY y asignar las tareas seleccionadas solo cuando el equipo confirme su capacidad. Mantener la épica RSY-1 como agrupación; no añadirla como trabajo ejecutable del sprint.

Para RSY-18 y RSY-19, crear o reutilizar tareas independientes para el alcance de correo si se necesita cerrar incidencias completas en este sprint, dejando las tareas originales pendientes hasta incorporar OAuth. Evitar marcar ambas como terminadas por completar solo el correo.

El plan no cambia el estado ni crea el sprint automáticamente en Jira. La medida de registro menor a 60 segundos (RSY-21) se programa cuando esté definido si incluye espera de correo y cuando se evalúen las tres opciones de registro.

## Entregables y seguimiento de aceptación

| Entregable | Ubicación | Aceptación |
| --- | --- | --- |
| Interfaz de registro, sesión y verificación | `apps/web` | Revisar en escritorio y móvil y ejecutar recorrido de navegador |
| API, sesiones y controles de acceso | `apps/api/src` | Pruebas de servicio y comprobación HTTP |
| Modelo y migración inicial | `apps/api/migrations/001_auth.sql` | Aplicar y comprobar rollback/unicidad en PostgreSQL |
| Entorno local | `compose.yaml` y ejemplos de variables | Arranque reproducible de PostgreSQL y Mailpit |
| Contrato HTTP | `docs/API.md` | Frontend y pruebas usan las rutas documentadas |
| Evidencia de validación | `docs/sprints/VALIDACION-SPRINT-1.md` | Revisar resultados y límites antes de cerrar |

Estado del sprint: base implementada para revisión. Su cierre requiere demostración y aceptación del equipo; la existencia del código no sustituye esa aceptación.

## Continuidad propuesta

Sprint 2: Google y Apple (RSY-12, RSY-13 y RSY-14), completar RSY-18 y RSY-19, y añadir nivel y materias (RSY-23 a RSY-28) según capacidad. La medición RSY-21 depende del alcance y de los eventos acordados.
