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

## Referencias

- [Instalación de Next.js](https://nextjs.org/docs/app/getting-started/installation).
- [Tailwind CSS con Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs).
- [Primeros pasos de NestJS](https://docs.nestjs.com/first-steps).
