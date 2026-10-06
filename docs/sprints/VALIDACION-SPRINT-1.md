# Validación del Sprint 1

Fecha: 6 de octubre de 2026. Entorno: Windows, Node.js 22.19, PostgreSQL 17.10 portable, Chromium de Playwright y buzón SMTP local.

## Resultados

| Comprobación | Resultado | Cobertura |
| --- | --- | --- |
| `npm run typecheck` | Aprobada | TypeScript de frontend y API |
| `npm test` | 10 aprobadas y 2 omitidas | Servicio con pg-mem; concurrencia reservada al motor real |
| `TEST_DATABASE_URL=… npm test` | 12 aprobadas | Persistencia, rollback, unicidad y consumo concurrente de token con PostgreSQL real |
| `npm run test:e2e` | 3 aprobadas | Registro, SMTP, verificación, autorización, logout, origen ajeno, teclado y tamaños móvil/escritorio |
| `npm run build` | Aprobada | Compilación NestJS y build de producción Next.js |
| `npm audit` | 0 vulnerabilidades reportadas al instalar las versiones finales | Dependencias directas y transitivas fijadas en el lockfile |

Las capturas de escritorio (1440 px) y móvil (390 px) se revisaron visualmente: campos legibles, foco visible y ausencia de desbordamiento horizontal. Playwright guarda las capturas en `test-results`, excluido de Git.

## Escenarios comprobados

- Email normalizado y duplicado rechazado sin crear filas adicionales.
- Contraseña Argon2id, tokens persistidos como hash y usuario público sin secretos.
- Fallo de creación de credenciales revierte el usuario.
- Cuenta sin verificar recibe 403 en acceso PvP; la verificada supera ese control.
- Token alterado, vencido o reutilizado rechazado.
- Cooldown de reenvío e invalidación del enlace anterior.
- Login con contraseña incorrecta rechazado; logout y vencimiento invalidan sesión.
- Fallo SMTP conserva la cuenta e informa que el envío no se completó.
- Dos registros concurrentes dejan una sola cuenta; dos verificaciones concurrentes consumen el token una sola vez.
- El navegador recibe correo mediante SMTP, abre el enlace con fragmento y confirma por POST.
- Solicitud de escritura con Origin ajeno rechazada.

## Límites de aceptación

Docker Compose está configurado, pero su motor no terminó de estar disponible en esta máquina durante la validación. Se usó la alternativa `infra:local` con PostgreSQL real y SMTP; no un reemplazo en memoria para el recorrido de navegador. Windows rechazó enlazar PostgreSQL al puerto 5432, por lo que la alternativa portable usa 55432.

La revisión de teclado y tamaños de pantalla no constituye una auditoría completa de accesibilidad. La CI está configurada, pero su ejecución en GitHub requiere publicar los cambios y revisar el resultado del workflow.

La aceptación del equipo, la asignación de personas, las fechas definitivas y la actualización de Jira siguen pendientes. No se han probado SMTP de producción, despliegue HTTPS, OAuth ni duelos reales; están fuera del alcance entregado.
