# Validación del Sprint 2

Fecha local: 20 de octubre de 2026, America/Bogota. Entorno: Windows, Node.js 22.19, PostgreSQL 17 portable y Chromium. Se verificó implementación local con contenido y cuentas temporales de prueba; el contenido académico real no se aprobó por ejecutar estas pruebas.

## Servicio y transacciones

53 pruebas con PostgreSQL real aprobadas: registro y OAuth criptográfico del Sprint 1, perfil, moderación y calibración; fórmula y fronteras de ELO/rango; rangos de búsqueda; emparejamiento concurrente, cancelación/timeout, compatibilidad y preferencias; respuestas repetidas, anticipadas, tardías y de terceros; reconexión, recuperación con otra instancia de servicio y abandono; cierre idempotente, notificaciones, historial, repaso versionado, estadísticas, retos y permisos de grupos/país.

La suite sin PostgreSQL ejecuta 20 pruebas y omite 33 que requieren el motor real. Las dos suites se ejecutan en serie para evitar compartir simultáneamente cachés temporales de Vitest entre contextos de Windows.

## Navegador

Ocho recorridos aprobados, sin omisiones ni reintentos:

1. Registro, correo SMTP, verificación y cierre de sesión.
2. Rechazo de escritura desde origen ajeno.
3. Teclado y adaptación de acceso en escritorio/móvil.
4. Duelo real de dos navegadores con Socket.IO, respuesta de servidor, cierre/recarga de una página, recuperación de ronda, ELO, repaso, progreso y gráfico/insignia en perfil.
5. Grupo privado, ranking, revocación al salir, enlace de reto, notificación y país declarado.
6. Rechazo de conexiones Socket.IO sin sesión o desde origen ajeno.
7. Persistencia de perfil/seis avatares y ELO por omisión.
8. Solicitud docente, moderación, banco y calibración integrada.

La prueba de duelo configura 250 ms de latencia HTTP mediante Chromium y cierra/reabre una página durante una interrupción para comprobar recuperación con una conexión nueva. No representa pérdida de paquetes WebSocket sostenida ni redes de operadores reales. Casos de mensajes tardíos y fuera de orden se comprueban además en servicio.

Las fixtures de competición se eliminan al terminar, respetando claves foráneas. Las capturas y el informe completo local están en `.local/sprint2-browser-results` y `.local/sprint2-e2e.json`.

## Carga local

Medición UTC: 2026-10-21T01:03:15.672Z. Misma fecha local de esta validación. Base separada `rankstudy_load_test`; 10.000 usuarios sintéticos, 60 consultas de ranking repartidas entre global, país y grupo, y 64 solicitudes concurrentes de cola.

| Métrica | Medición | Objetivo inicial |
| --- | --- | --- |
| Ranking p50 | 30.1 ms | Informativo |
| Ranking p95 | 54.9 ms | <500 ms |
| Ranking máximo | 83.3 ms | Informativo |
| Completar 64 solicitudes de cola | 1372 ms | <15.000 ms |
| Duelo/jugadores activos | 32 / 64 | 32 / 64 |
| Errores / jugadores duplicados | 0 / 0 | 0 / 0 |

Los servicios se llaman directamente y no a través de un generador de tráfico de red. Antes de abrir el piloto bajo carga, medir HTTP/WebSocket, recursos, tiempo de emparejamiento percibido, estabilidad y latencia de confirmación en el hosting elegido. [Instrucciones para reproducir](../COMPETICION.md).

## Comprobaciones de compilación

`npm run typecheck`, pruebas, `npm run build` y comprobación de diff sin errores. La ejecución completa de CI en GitHub queda pendiente de subir los cambios; la verificación descrita se realizó localmente.
