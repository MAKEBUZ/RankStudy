# Rank Study

Rank Study es una plataforma de aprendizaje competitivo con duelos académicos, clasificación por materia y seguimiento del progreso.

## Stack

Next.js y React con TypeScript y Tailwind CSS para la interfaz; NestJS con TypeScript para la API; PostgreSQL para persistencia. La comunicación de duelos con Socket.IO queda para el sprint de PvP.

## Requisitos

Node.js 22.19 o posterior, npm y Docker Desktop con el motor Linux activo. Los puertos 3000, 3001, 5432, 1025 y 8025 deben estar disponibles.

## Ejecutar en Windows

Desde la raíz del repositorio, en PowerShell:

```powershell
npm.cmd ci
Copy-Item apps/api/.env.example apps/api/.env
Copy-Item apps/web/.env.example apps/web/.env.local
npm.cmd run infra:up
npm.cmd run db:migrate
npm.cmd run dev
```

Copiar los ejemplos solo la primera vez; conservar las variables locales ya configuradas. Abrir [RankStudy](http://localhost:3000). Los correos llegan a [Mailpit](http://localhost:8025). La API escucha en `127.0.0.1:3001` y Next.js publica sus rutas mediante `/api`.

El flujo incluye registro, inicio y cierre de sesión, correo de verificación, reenvío y comprobación de acceso PvP. Un fallo SMTP no elimina la cuenta: iniciar sesión y solicitar un reenvío cuando el correo vuelva a estar disponible.

`npm.cmd run infra:down` detiene la infraestructura y conserva el volumen de datos. Los servicios y credenciales de Compose son solo para desarrollo y se enlazan a localhost.

### Alternativa cuando Docker no está disponible

En una terminal aparte, ejecutar `npm.cmd run infra:local`. Inicia PostgreSQL 17 portable y un buzón SMTP local; no instala servicios del sistema. Conserva la base en `.local/postgres`, fuera de Git. Crea las bases `rankstudy` y `rankstudy_test`.

Configurar en `apps/api/.env` el puerto portable: `DATABASE_URL=postgresql://rankstudy:rankstudy_local@localhost:55432/rankstudy`. Usar después los mismos comandos `db:migrate` y `dev` en otra terminal. Para pruebas reales, usar también 55432 en `TEST_DATABASE_URL`.

El buzón en `http://localhost:8025` muestra mensajes en JSON con su texto y enlace de verificación. Solo conserva los últimos 100 correos en memoria. Detener con Ctrl+C. No ejecutar esta alternativa a la vez que Compose porque comparten puertos SMTP y buzón. `LOCAL_PG_PORT` permite cambiar el puerto de PostgreSQL portable.

## Validar

```powershell
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npx.cmd playwright install chromium
npm.cmd run test:e2e
```

Para `test:e2e`, PostgreSQL y Mailpit deben estar activos y la migración aplicada. Playwright inicia web y API si no están ejecutándose. La suite de servicio usa pg-mem por defecto y no necesita Docker. Para comprobar persistencia y transacciones reales, usar una base PostgreSQL dedicada, con nombre terminado en `_test`:

```powershell
$env:TEST_DATABASE_URL = 'postgresql://rankstudy:rankstudy_local@localhost:5432/rankstudy_test'
npm.cmd test
Remove-Item Env:TEST_DATABASE_URL
```

Crear primero esa base dedicada. La suite limpia sus tablas; nunca usar la base de la aplicación ni una base de producción. Las pruebas de navegador crean cuentas con correo único en la base de desarrollo.

## Estructura

```text
apps/web          Interfaz Next.js y Tailwind CSS
apps/api          API NestJS, migración SQL y pruebas de servicio
tests/e2e         Recorrido de navegador con Playwright
docs              Planning, contrato y evidencia de validación
compose.yaml      PostgreSQL y Mailpit locales
```

## Planificación

- [Plan general de los 23 sprints](docs/sprints/PLAN-GENERAL.md): orden de entrega, dependencias, capacidad e hitos.
- [Cobertura del backlog](docs/sprints/COBERTURA-BACKLOG.md): asignación de las 125 tareas y las 28 subtareas propuestas.
- [Sprint 1](docs/sprints/SPRINT-1.md): registro por correo y verificación de cuenta.
- Los planes individuales de Sprint 2 a Sprint 23 están enlazados desde el plan general.

El plan usa las claves del backlog del proyecto Jira RSY. OAuth, recuperación de contraseña, selección de materias, matchmaking, pagos y generación de preguntas quedan fuera del Sprint 1.

- [Contrato de la API](docs/API.md).
- [Decisiones de arquitectura](docs/ARQUITECTURA.md).
- [Resultados de validación](docs/sprints/VALIDACION-SPRINT-1.md).
