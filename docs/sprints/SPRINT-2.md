# Sprint 2: Duelos individuales, progreso y comunidad

## Objetivo

Dos estudiantes completan un duelo con resultado y ELO consistentes, repasan errores y consultan grupos y rankings.

## Capacidad y alcance

Propuesta de dos semanas, sin fechas ni responsables nominales confirmados. 41 tareas originales; 300 h de entrega, 36 h de integración y documentación, 24 h de reserva: **360 h totales**. Equivale aritméticamente a 6 personas con 60 h efectivas por sprint; las dependencias y especialidades deben validarse antes de comprometer el alcance. Las horas de subtareas ya están incluidas en su padre.

Implementación local del Sprint 2 completada y validada. Consultar [estado de las 41 tareas](ESTADO-SPRINT-2.md) y [pendientes de aceptación](PENDIENTES-SPRINTS-1-Y-2.md). El banco real debe aprobarse para habilitar las partidas del piloto.

## Backlog y estimaciones

| Incidencia | Entrega | Horas propuestas |
| --- | --- | --- |
| RSY-40 | Definir la lógica de rango ± configurable | 7 |
| RSY-41 | Implementar ampliación de rango tras timeout | 5 |
| RSY-42 | Montar infraestructura de WebSockets | 10 |
| RSY-43 | Implementar timeout de 15s con fallback | 7 |
| RSY-44 | Construir UI de "buscando rival" con animación de espera | 5 |
| RSY-45 | Implementar botón de cancelar búsqueda | 4 |
| RSY-46 | Simular usuarios concurrentes en la cola de matchmaking | 8 |
| RSY-28 | Validar que los cambios se reflejen en matchmaking y contenido | 4 |
| RSY-47 | Sincronizar preguntas y respuestas entre ambos jugadores | 16 |
| RSY-48 | Manejar desconexiones y reconexión | 10 |
| RSY-49 | Implementar puntuación por corrección + bonus de velocidad | 7 |
| RSY-50 | Construir temporizador visible y opciones de respuesta | 9 |
| RSY-52 | Probar el duelo en condiciones de red variable | 8 |
| RSY-65 | Implementar cálculo de ELO tras cada duelo, por materia | 10 |
| RSY-66 | Escribir pruebas unitarias de la fórmula | 4 |
| RSY-67 | Registrar cada variación de ELO con fecha y duelo asociado | 4 |
| RSY-68 | Construir gráfico de ELO en el tiempo en el perfil | 6 |
| RSY-69 | Diseñar mínimo 5 tramos de rango con insignia distinta | 5 |
| RSY-70 | Implementar lógica de rango según ELO actual | 6 |
| RSY-71 | Disparar notificación al subir o bajar de rango | 4 |
| RSY-72 | Mostrar insignia en perfil y notificación in-app | 5 |
| RSY-51 | Construir pantalla de resultado con ganador y cambio de ELO | 6 |
| RSY-62 | Exponer endpoint con preguntas, respuesta correcta y explicación | 8 |
| RSY-63 | Construir listado de preguntas con explicaciones | 6 |
| RSY-64 | Implementar función de guardado y acceso posterior desde perfil | 7 |
| RSY-94 | Calcular evolución de ELO y desglose de aciertos/fallos por tema | 10 |
| RSY-95 | Construir gráfico de evolución y tabla de desglose por tema | 8 |
| RSY-96 | Calcular tasa de error por tema y ordenar por prioridad | 7 |
| RSY-97 | Mostrar los temas recomendados en el dashboard principal | 4 |
| RSY-58 | Generar enlace de invitación único | 6 |
| RSY-59 | Implementar búsqueda de usuario por nombre | 6 |
| RSY-60 | Implementar expiración automática a los 5 minutos | 4 |
| RSY-61 | Construir UI de envío de reto y notificación al receptor | 8 |
| RSY-100 | Definir esquema de grupo y código de invitación | 9 |
| RSY-101 | Construir pantalla de crear grupo e ingresar con código | 9 |
| RSY-102 | Implementar ranking visible solo para miembros | 8 |
| RSY-77 | Implementar filtros por ámbito (grupo/país/global) y materia | 13 |
| RSY-78 | Optimizar consultas para actualización casi en tiempo real | 12 |
| RSY-79 | Construir tabla con filtros interactivos | 11 |
| RSY-80 | Probar con gran volumen simulado de usuarios | 8 |
| RSY-34 | Exponer el avatar en perfil, ranking y pantalla de duelo | 6 |


Las horas son estimaciones de la línea base del planning, no horas registradas de ejecución. Las subtareas ya están incluidas en su padre.

## Secuencia y criterios de aceptación

### 1. Matchmaking y conexión en tiempo real

Emparejar estudiantes compatibles mediante una cola autenticada y cancelable con espera limitada.

Decisiones antes de iniciar: Rango inicial y ampliaciones de ELO; coordinación del timeout de 15 s; fallback sin rival; carga y latencia objetivo para el piloto.

- WebSocket autentica sesión y autoriza canales; una persona no entra en múltiples emparejamientos activos.
- Cola filtra nivel/materia, amplía rango según configuración y resuelve timeout a los 15 s sin crear rivales ficticios.
- Cancelación, emparejamiento y timeout compiten de forma controlada: un usuario obtiene a lo sumo una sala.
- RSY-28 verifica que preferencias cambiadas afecten búsquedas futuras y selección de contenido, sin alterar una sesión activa.
- La prueba de cola reporta volumen, latencia, errores y duplicados frente al objetivo acordado.

Demostración: Dos cuentas compatibles se encuentran; una incompatible vence espera; otra cancela mientras se intenta emparejar.

Riesgo: Carreras de eventos y sesiones caducadas. Diseñar contrato de eventos y estados antes de la UI y probar concurrencia desde el inicio.

Ajuste si falta capacidad: Posponer efectos visuales de búsqueda; mantener autorización, cancelación, timeout y evidencia de carga.

### 2. Motor de duelo individual

Jugar un duelo de dos personas con preguntas sincronizadas, puntuación autoritativa y recuperación de conexión.

Decisiones antes de iniciar: Cantidad de rondas y tiempo por pregunta; fórmula de corrección y velocidad; ventana de reconexión y abandono; cierre de sesión de duelo.

- Servidor controla pregunta, orden, apertura y cierre de ronda; no envía solución antes del cierre.
- Respuesta se acepta una sola vez y dentro del plazo; el tiempo del cliente no determina el bonus.
- Reconexión recupera el estado y el abandono sigue una regla acordada sin duplicar resultados.
- Probar latencia, pérdida de conexión y eventos fuera de orden con resultados consistentes en ambos clientes.
- Se persiste el resultado base; pantalla final con cambio de ELO se integra en Sprint 2 mediante RSY-51.

Demostración: Dos navegadores juegan una partida, uno se desconecta y vuelve, y ambos terminan con el mismo resultado base.

Riesgo: Este incremento aún no ofrece el recorrido competitivo completo; no anunciar beta PvP hasta integrar ELO y resultados en Sprint 2.

Ajuste si falta capacidad: Reducir animaciones y cantidad de rondas de demostración; no omitir sincronización ni reconexión.

### 3. Resultado de duelo y progresión por ELO

Cerrar el duelo con ganador, variación de ELO, historial y rango visible por materia.

Decisiones antes de iniciar: Factor de ajuste ELO y empates; cinco o más rangos y umbrales; comportamiento de abandono; identidad de la temporada inicial.

- Cierre actualiza ELO e historial atómicamente una sola vez por duelo, jugador y materia.
- Pruebas independientes cubren victoria, derrota, empate, extremos y reejecución.
- Al menos cinco rangos tienen insignias diferenciadas y reglas probadas en cada frontera.
- Pantalla final muestra ganador/empate, ELO anterior/nuevo y rango consistentes; el gráfico usa historial ordenado.
- Notificar únicamente un cambio real de rango y no repetirlo por reintentos.

Demostración: Completar un duelo, observar cambio de rango y repetir el evento de cierre sin cambiar saldo de ELO.

Riesgo: No sumar ni descontar ELO dos veces ante reconexión o cierre repetido; identificar operación por duelo/jugador/materia.

Ajuste si falta capacidad: Simplificar presentación del gráfico; mantener resultado, historial e idempotencia.

### 4. Repaso y desempeño personal

Revisar errores del duelo, guardar preguntas y recibir recomendaciones basadas en desempeño real.

Decisiones antes de iniciar: Definiciones de acierto/fallo y abandono; mínimo de muestra; filtros de fechas y materia; criterio de prioridad de temas.

- Solo participantes consultan respuestas correctas de un duelo finalizado; un tercero o duelo en curso recibe rechazo.
- Guardar repaso es propio y sin duplicados; las versiones históricas no cambian al editar el banco.
- Gráfico y desglose se reconcilian con duelos cerrados; falta de datos se distingue de cero errores.
- Recomendaciones muestran razón y muestra usada; no se inventa precisión con datos insuficientes.

Demostración: Revisar un duelo, guardar una pregunta y mostrar cómo un resultado nuevo cambia el dashboard y las recomendaciones.

Riesgo: Estadísticas incorrectas por resultados incompletos o preguntas editadas; usar historial versionado y conjunto de control.

Ajuste si falta capacidad: Reducir variedad de visualizaciones; conservar controles de acceso y definiciones de métricas.

### 5. Retos directos y grupos privados

Invitar a un amigo a duelo y organizar grupos con clasificación privada.

Decisiones antes de iniciar: Códigos de grupo, rol de dueño y expulsión; política de descubrimiento por nombre; aceptación y expiración de retos.

- Reto usa token impredecible de un solo uso y vence a los cinco minutos; carrera aceptación/expiración no crea dos salas.
- Búsqueda paginada por nombre evita exponer correo u otros datos privados.
- Crear/unirse al grupo valida código y evita duplicar membresía; salir o ser retirado revoca acceso.
- Ranking de grupo funciona con consulta interna autorizada; filtros públicos y optimización llegan en Sprint 2.

Demostración: Invitar a un amigo, aceptar una vez, entrar a un grupo y comprobar que una cuenta ajena no ve su ranking.

Riesgo: La recomendación antigua enlazaba ranking interno con endpoint público posterior. Se implementa aquí su consulta mínima y se reutiliza en RSY-77, sin una dependencia circular.

Ajuste si falta capacidad: Reducir búsqueda avanzada y personalización del grupo; mantener invitaciones y privacidad.

### 6. Clasificaciones y avatar compartido

Consultar rankings por materia y ámbito con respuesta estable y avatar consistente.

Decisiones antes de iniciar: Origen y visibilidad del país; tratamiento de país no declarado; desempates; volumen y frescura objetivo; política de caché.

- Filtros grupo/país/global se combinan con materia; solo miembros consultan el ámbito privado.
- País es un dato declarado y validado bajo política acordada, no una inferencia silenciosa de ubicación.
- Paginación y desempates son estables; cambios de ELO invalidan datos según frescura definida.
- RSY-34 comprueba el mismo avatar en perfil, ranking y duelo con fallback ante asset ausente.
- Pruebas con volumen representativo informan percentiles de latencia y errores y cumplen los umbrales acordados.

Demostración: Filtrar rankings, cambiar ELO mediante duelo y comprobar actualización y avatar en las tres superficies.

Riesgo: Un ranking rápido pero incorrecto por caché desactualizada; reconciliar contra consultas fuente y medir latencia.

Ajuste si falta capacidad: Limitar volumen del piloto según capacidad validada; no prometer escala no demostrada.

## Organización de las dos semanas

Días 1 y 2: confirmar decisiones, contratos, datos y permisos; distribuir paquetes según dependencias. Días 3 a 7: implementar y validar incrementos en el orden indicado, permitiendo trabajo paralelo cuando no dependa de otro paquete. Días 8 y 9: integrar recorridos y resolver defectos. Día 10: demostrar criterios, revisar resultados y registrar retrospectiva. Esta secuencia es una hipótesis a contrastar con el equipo.

## Subtareas asociadas

| Padre | Subtarea del backlog |
| --- | --- |
| RSY-43 | Definir fallback y resolver carreras al vencer la espera |
| RSY-47 | Diseñar máquina de estados y contrato de eventos del duelo |
| RSY-48 | Definir abandono y recuperación de sesión |
| RSY-49 | Validar tiempos de respuesta sin confiar en el cliente |
| RSY-62 | Probar autorización y ocultamiento de respuestas durante duelo |
| RSY-65 | Asegurar actualización atómica e idempotente del ELO |
| RSY-94 | Definir métricas y excluir resultados incompletos |

Reutilizar las subtareas ya importadas y sus claves asignadas. Desglosar cada tarea adicional PL en contrato/datos, implementación y validación dentro de sus horas, sin duplicar estimaciones.

## Condición de cierre

Aceptar los criterios de cada paquete y adjuntar evidencia; pruebas pertinentes aprobadas, permisos verificados en servidor, interfaz accesible y documentación actualizada. Resolver defectos bloqueantes. Los recortes se registran como pendientes y desplazan sus dependientes; no se declara completo un sprint por crear este documento.
