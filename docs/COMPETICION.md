# Competición de RankStudy

El Sprint 2 agrega duelos individuales, progresión por ELO, repaso, estadísticas, retos, grupos y clasificaciones. La pantalla está en `/competir`, accesible desde la cuenta verificada y desde el perfil.

## Preparar una partida

Aplicar `npm run db:migrate` y `npm run db:seed`. Conservar los `.env` locales; no reemplazarlos si ya contienen configuración. Iniciar infraestructura y `npm run dev` según el README.

Cada jugador necesita correo verificado, perfil guardado, la misma materia y nivel educativo que el rival, y calibración completada u omitida para esa materia. Omitir asigna ELO 1000. Deben existir al menos cinco preguntas aprobadas para jugar; el contenido piloto sigue sujeto a revisión académica.

Abrir dos cuentas en navegadores o perfiles separados. Entrar en Competir y buscar rival con la misma materia, o crear un enlace en Retos y grupos y aceptarlo con la otra cuenta. No se generan rivales artificiales cuando falta una persona.

## Reglas iniciales

| Regla | Valor implementado |
| --- | --- |
| Rondas | Cinco preguntas aprobadas y versionadas |
| Tiempo por pregunta | 20 segundos; avanza antes si ambos responden |
| Puntos | 100 por acierto más hasta 50 por velocidad; fallo o ausencia: cero |
| Tiempo válido | Recepción y plazo controlados por servidor; el reloj del cliente no puntúa |
| Matchmaking | Mismo nivel/materia, rango inicial ±100 ELO |
| Ampliación | ±200 tras 5 segundos y ±400 tras 10 segundos |
| Configuración del rango | `MATCH_INITIAL_RANGE`, entre 25 y 400; ampliaciones ×2 y ×4 |
| Espera máxima | 15 segundos, después permite reintentar o repasar |
| Reconexión | 20 segundos desde la última comunicación válida |
| Abandono explícito | Victoria del rival; ambos desaparecidos: cierre neutral sin variación de ELO |
| ELO | Cálculo base K=32 con variación máxima de −11 a +11 por partida; límites 400–2400; empate 0,5 y victoria 1 |
| Rangos | Bronce 400, Plata 900, Oro 1200, Platino 1500, Diamante 1800 |
| Reto | Token impredecible, un uso, cinco minutos; destinatario opcional |

El límite de −11 a +11 por partida y los rangos se conservan según la decisión del responsable. Con igual ELO, victoria +11, derrota −11 y empate 0; con distinto ELO, la variación depende del rival y se limita a ese intervalo. Un empate entre niveles diferentes puede modificar el rating. La puntuación por respuesta sigue siendo 100 por acierto más hasta 50 por velocidad. Los resultados históricos no se recalculan. Los demás parámetros del piloto siguen pendientes de aceptación. Las temporadas con reinicios y premios pertenecen al Sprint 3; el historial de este sprint mantiene una progresión continua.

## Persistencia y autorización

La migración 003 guarda cola, duelos, participantes, respuestas, historial de ELO, avisos, preguntas guardadas, retos y grupos. El snapshot de cada duelo conserva versión, respuesta y explicación originales. Durante el juego solo se exponen enunciado y opciones; el repaso exige ser participante y que el duelo haya terminado.

Un bloqueo transaccional de PostgreSQL coordina emparejar, cancelar, aceptar retos, avanzar rondas y cerrar duelos. Un índice impide que una persona tenga dos partidas activas. Responder exige ronda actual y plazo válido; cada respuesta tiene clave única. El cierre persiste resultado, ELO e historial una sola vez. La UI recupera la partida desde PostgreSQL al recargar.

Cambiar preferencias cancela una búsqueda anterior y las siguientes usan el perfil nuevo; una partida iniciada conserva nivel, materia y avatar de su inicio. Rankings y perfil reutilizan los seis assets de avatar originales con fallback.

Los grupos usan códigos aleatorios almacenados como hash. Solo sus miembros consultan integrantes y clasificación. Salir o ser retirado revoca acceso; el dueño puede renovar el código o eliminar el grupo. Una cuenta participa en un máximo de veinte grupos. Los rankings muestran nombre, avatar, ELO e insignia, sin correo. País es opcional y requiere declaración y consentimiento; no se infiere ubicación.

## Transporte y límites del piloto

Socket.IO se publica en `/api/realtime/socket.io`, con `addTrailingSlash:false` en servidor y cliente para conservar la ruta al pasar por Next.js. Exige sesión HttpOnly verificada y origen válido. El servidor decide qué estado recibe cada conexión; el cliente no elige salas de otros usuarios. La sesión se revalida durante la conexión. Hay límites de tres conexiones por cuenta, 200 conexiones en la instancia y veinte comandos por cinco segundos por conexión.

Se envía estado aproximadamente cada segundo y el cliente confirma presencia cada dos segundos. Si se pierde el transporte, la interfaz reintenta y puede consultar el estado por HTTP. Los comandos HTTP mantienen validación de Origin, sesión y permisos. Ante una confirmación perdida se sincroniza el estado, sin repetir automáticamente una respuesta de forma ciega.

La carga medida corresponde a una instancia local. Antes de distribuir servidores hay que comprobar balanceo, afinidad si se usa polling, comunicación entre instancias, límites compartidos y capacidad del bloqueo de coordinación. La documentación de [Socket.IO para múltiples nodos](https://socket.io/docs/v4/using-multiple-nodes/) explica los requisitos de balanceo y afinidad.

## Métricas y recomendaciones

El gráfico de ELO se construye con historial persistido. Las estadísticas permiten periodos de 7, 30 y 90 días en interfaz, y de 1 a 365 por API. El desglose por tema incluye solo duelos finalizados normalmente: una pregunta no respondida cuenta como fallo. Abandono y desconexión se muestran como interrupciones y quedan fuera del desglose de temas.

Una recomendación necesita al menos tres preguntas del tema y un error. Se ordena por tasa de error, tamaño de muestra y nombre; muestra el motivo y la cantidad observada. Falta de datos no se presenta como precisión perfecta.

El ranking consulta PostgreSQL directamente, con índices por materia/ELO e integrantes. Tiene 25 filas por página y desempate por UUID estable; no usa caché que pueda conservar permisos retirados o ELO anterior. Refrescar el ranking obtiene el estado confirmado más reciente.

## Contrato HTTP

Todas estas rutas están bajo `/api/competition` y exigen cuenta verificada, salvo el catálogo de países.

| Método | Ruta | Propósito |
| --- | --- | --- |
| GET | `/state` | Estado propio, cola, duelo, reloj y reglas |
| POST | `/queue` | Buscar con `{subjectId}` |
| POST | `/queue/cancel` | Cancelar búsqueda pendiente |
| POST | `/duels/:id/answer` | `{roundIndex,optionIndex}`; una respuesta por ronda |
| POST | `/duels/:id/abandon` | Abandono del participante |
| GET | `/history` | Últimos 50 duelos cerrados propios |
| GET | `/duels/:id/review` | Preguntas y explicaciones de un duelo propio cerrado |
| POST | `/duels/:id/saved` | `{roundIndex,saved}` para guardar/quitar repaso |
| GET | `/saved` | Últimas 100 preguntas guardadas propias |
| GET | `/stats?subjectId=…&days=30` | ELO, gráfico, temas y recomendaciones |
| GET | `/people?q=…&page=0` | Búsqueda por nombre, 20 filas, sin correo |
| POST | `/challenges` | `{subjectId,recipientId?}`; devuelve enlace/token una vez |
| GET | `/challenges` | Retos recibidos vigentes |
| POST | `/challenges/accept` | `{token}` o `{challengeId}` recibido |
| GET / POST | `/groups` | Mis grupos / crear con `{name}` |
| POST | `/groups/join` | Entrar con `{code}` |
| GET | `/groups/:id/members` | Integrantes, solo miembros |
| DELETE | `/groups/:id/members/:userId` | Salir o retirar como dueño |
| POST | `/groups/:id/code` | Renovar código, solo dueño |
| DELETE | `/groups/:id` | Eliminar grupo, solo dueño |
| GET | `/ranking` | `subjectId`, `scope=global/country/group`, `country`, `groupId`, `page` |
| GET / POST | `/countries` / `/country` | Catálogo / declaración `{country,publish}` |
| GET | `/notifications` | Últimos 50 avisos propios |
| POST | `/notifications/:id/read` | Marcar aviso propio como leído |

WebSocket acepta `sync`, `queue:join`, `queue:cancel`, `duel:answer` y `duel:abandon`; responde por callback `{ok,data}` o `{ok:false,message}`. Para responder/abandonar se agrega `duelId` al payload. Publica `competition:state` únicamente con el estado del usuario autenticado y `session:expired` al perder autorización.

## Repetir las pruebas de carga

Usar exclusivamente una base local separada llamada `rankstudy_load_test`, con credenciales de desarrollo. El script rechaza otras bases y limpia sus propias tablas de prueba al preparar el conjunto.

```powershell
$env:TEST_DATABASE_URL='postgresql://rankstudy:rankstudy_local@localhost:55432/rankstudy_load_test'
npm.cmd run test:load -w @rankstudy/api
Remove-Item Env:TEST_DATABASE_URL
```

La base debe existir. El script registra en `.local/sprint2-load.json` latencias de ranking para 10.000 usuarios sintéticos, 60 muestras y 64 búsquedas simultáneas por servicios directos. Los objetivos iniciales son p95 de ranking menor de 500 ms, cola menor de 15 segundos y cero jugadores duplicados. Esto no mide tráfico HTTP/WebSocket masivo ni una red de producción.
