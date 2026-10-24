# Arquitectura inicial de RankStudy

El monorepo separa interfaz y API y usa TypeScript en ambas. Next.js publica la interfaz y reenvía `/api` a NestJS. El navegador conserva la sesión mediante una cookie del mismo origen. PostgreSQL almacena usuarios, credenciales, sesiones y verificaciones.

## Persistencia e identidad

`users` almacena perfil y estado de verificación. `credentials` guarda el hash Argon2id, separado de las respuestas públicas. Registro crea usuario, credencial, token de verificación y sesión en una transacción. El índice único de email resuelve duplicados incluso en solicitudes concurrentes.

Las sesiones usan un secreto aleatorio cuyo hash se guarda en la base; conocer el UUID del usuario no autoriza acceso. Vencimiento y eliminación al cerrar se comprueban en servidor. La verificación consume el token de forma atómica y el reenvío bloquea la fila de usuario para coordinar el cooldown.

## Correo y recuperación

SMTP se invoca después del commit para no sostener una transacción mientras se conecta al proveedor. Si falla, el usuario conserva cuenta y sesión y puede reenviar. Un reenvío reemplaza el token anterior incluso si falla el envío; la interfaz lo informa. Una cola persistente de correo y reintentos automáticos se reservan para una evolución posterior.

## Límites operativos

La API escucha en loopback para desarrollo y su proxy local. Para contenedores o despliegue remoto, ajustar interfaz de escucha y red privada de forma explícita. Producción requiere HTTPS, SMTP real y cookies Secure. No se configura despliegue en este sprint.

El límite por IP está en memoria y sirve para una instancia. Antes de escalar, usar almacenamiento compartido y configurar proxies de confianza. Programar además limpieza periódica de sesiones y tokens vencidos antes del lanzamiento público.

Las versiones resueltas se fijan en `package-lock.json`. Las actualizaciones se aplican con revisión y pruebas. Las variables reales permanecen fuera de Git.

## Perfil, contenido y calibración

La migración 002 agrega catálogo de niveles/materias compatibles, seis referencias de avatar, perfil propio y versión del contrato de preferencias. Roles student/teacher/admin viven en servidor. El bootstrap administrativo exige acceso a terminal y una cuenta verificada; la solicitud docente exige aprobación independiente.

Las preguntas conservan versiones inmutables y auditoría de envío, edición y moderación. Editar devuelve a pendiente. Solo una versión aprobada entra en calibración; el test guarda una copia privada de los datos y claves originales para evitar que ediciones posteriores alteren su corrección. Inicio/cierre bloquean usuario; cierre y rating se guardan atómicamente y son idempotentes por usuario/materia. El ELO inicial es una fórmula provisional documentada, separada del futuro cálculo PvP.

La referencia institucional vence a los 30 días. La API la purga al arrancar, por hora y antes de mostrar moderación. La purga horaria exige proceso activo. El banco piloto requiere revisión académica; se carga pendiente por defecto.

## Identidad social

OAuth usa código, state de un solo uso asociado a cookie HttpOnly, nonce y PKCE para Google. jose valida firmas y claims con JWKS de endpoints fijos. Apple usa client secret ES256 temporal y callback form_post con cookies Secure/SameSite=None. La cuenta social tiene identidad provider/subject única; coincidencia de email no fusiona cuentas. No se guardan tokens de acceso del proveedor. Los secretos permanecen solo en servidor. Ver [configuración y pruebas externas](OAUTH.md).

## Competición y comunidad

La migración 003 incorpora duelos persistentes, cola, respuestas únicas, ELO histórico, avisos, repaso guardado, retos y grupos privados. Las operaciones competitivas se coordinan con un bloqueo transaccional de PostgreSQL y un índice único por jugador activo. El servidor valida ronda y tiempo; resultado, rating e historial cierran atómicamente. La instancia recupera el estado desde la base; no depende de una sala guardada solo en memoria.

Socket.IO comparte servidor HTTP con NestJS. Next.js publica la ruta de tiempo real sin barra final, con cookies del mismo origen. Cada socket recibe solo el estado de su cuenta; la sesión se verifica al entrar y durante la conexión. El frontend recibe estado cada segundo, confirma presencia y tiene recuperación HTTP. Grupos y ranking privado comprueban membresía; rankings consultan la fuente sin caché de permisos. Detalles y límites en [Competición](COMPETICION.md).

## Referencias del stack

- [Instalación de Next.js](https://nextjs.org/docs/app/getting-started/installation).
- [Tailwind CSS con Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs).
- [Primeros pasos de NestJS](https://docs.nestjs.com/first-steps).
