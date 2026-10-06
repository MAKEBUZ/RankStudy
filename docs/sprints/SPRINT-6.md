# Sprint 6 Matchmaking y conexión en tiempo real

Emparejar estudiantes compatibles mediante una cola autenticada y cancelable con espera limitada.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 3](SPRINT-3.md), [Sprint 4](SPRINT-4.md), [Sprint 5](SPRINT-5.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-40 | Definir la lógica de rango ± configurable | 7 | Backend |
| RSY-41 | Implementar ampliación de rango tras timeout | 5 | Backend |
| RSY-42 | Montar infraestructura de WebSockets | 10 | Backend |
| RSY-43 | Implementar timeout de 15s con fallback | 7 | Backend |
| RSY-44 | Construir UI de "buscando rival" con animación de espera | 5 | Frontend |
| RSY-45 | Implementar botón de cancelar búsqueda | 4 | Frontend |
| RSY-46 | Simular usuarios concurrentes en la cola de matchmaking | 8 | QA y desarrollo |
| RSY-28 | Validar que los cambios se reflejen en matchmaking y contenido | 4 | Backend |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

## Subtareas asociadas

| Padre | Subtarea existente propuesta |
| --- | --- |
| RSY-43 | Definir fallback y resolver carreras al vencer la espera |

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. WebSocket autentica sesión y autoriza canales; una persona no entra en múltiples emparejamientos activos.
2. Cola filtra nivel/materia, amplía rango según configuración y resuelve timeout a los 15 s sin crear rivales ficticios.
3. Cancelación, emparejamiento y timeout compiten de forma controlada: un usuario obtiene a lo sumo una sala.
4. RSY-28 verifica que preferencias cambiadas afecten búsquedas futuras y selección de contenido, sin alterar una sesión activa.
5. La prueba de cola reporta volumen, latencia, errores y duplicados frente al objetivo acordado.

## Criterios de las tareas originales

### RSY-40

- Rango inicial de ELO configurable.
- Filtrar materia y nivel compatible.
- No emparejar usuario consigo mismo.

### RSY-41

- Ampliación de rango respeta etapas y límite acordados.
- Temporizador compartido con timeout de 15 s.
- No duplicar sesiones.

### RSY-42

- Autenticar conexión y autorizar canales.
- Heartbeat y cierre de conexiones.
- Eventos con IDs y esquema documentados.

### RSY-43

- A los 15 s ejecutar fallback acordado.
- Cancelar limpia la cola.
- Nunca crear duelo contra bot sin regla aprobada.

### RSY-44

- Mostrar búsqueda, espera y resultado.
- Informar timeout y fallback.
- Salir no deja búsqueda activa.

### RSY-45

- Cancelación confirmada por servidor.
- Resolver carrera cancelación/emparejamiento.
- Usuario sale de cola una sola vez.

### RSY-46

- Carga con usuarios autenticados y compatibles.
- Medir latencia, errores y duplicados.
- Volumen y objetivo por acordar.

### RSY-28

- Cambios nuevos afectan siguientes búsquedas y preguntas.
- Duelo activo mantiene configuración.
- Probar compatibilidades.

## Decisiones antes de iniciar

Rango inicial y ampliaciones de ELO; coordinación del timeout de 15 s; fallback sin rival; carga y latencia objetivo para el piloto.

Confirmar además disponibilidad del equipo, acceso a servicios y dataset de prueba. Reabrir la estimación si una decisión cambia el alcance.

## Secuencia de trabajo

| Días | Trabajo | Evidencia |
| --- | --- | --- |
| 1 y 2 | Resolver decisiones, revisar contratos y preparar datos; empezar las dependencias de backend | Contratos y reglas revisados |
| 3 a 5 | Implementar dominio, persistencia y controles; desarrollar interfaz contra el contrato | Tareas de dominio verificables |
| 6 a 8 | Conectar interfaz, servicios y consumidores; ejecutar pruebas específicas | Incremento integrado y escenarios negativos |
| 9 | Ejecutar recorrido completo y corregir bloqueantes | Evidencia de aceptación |
| 10 | Demostrar, revisar aceptación, registrar arrastres y retrospectiva | Cierre o pendientes explícitos |

Es una secuencia de actividades, no trabajo simultáneo atribuido a una sola persona. Con varios perfiles se puede coordinar en paralelo sin multiplicar capacidad sin confirmación.

## Riesgo principal y ajuste de alcance

Carreras de eventos y sesiones caducadas. Diseñar contrato de eventos y estados antes de la UI y probar concurrencia desde el inicio.

Si la capacidad no alcanza: Posponer efectos visuales de búsqueda; mantener autorización, cancelación, timeout y evidencia de carga.

## Demostración de cierre

Dos cuentas compatibles se encuentran; una incompatible vence espera; otra cancela mientras se intenta emparejar.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
