# Sprint 7 Motor de duelo individual

Jugar un duelo de dos personas con preguntas sincronizadas, puntuación autoritativa y recuperación de conexión.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 4](SPRINT-4.md), [Sprint 6](SPRINT-6.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-47 | Sincronizar preguntas y respuestas entre ambos jugadores | 16 | Backend |
| RSY-48 | Manejar desconexiones y reconexión | 10 | Backend |
| RSY-49 | Implementar puntuación por corrección + bonus de velocidad | 7 | Backend |
| RSY-50 | Construir temporizador visible y opciones de respuesta | 9 | Frontend |
| RSY-52 | Probar el duelo en condiciones de red variable | 8 | QA y desarrollo |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

## Subtareas asociadas

| Padre | Subtarea existente propuesta |
| --- | --- |
| RSY-47 | Diseñar máquina de estados y contrato de eventos del duelo |
| RSY-48 | Definir abandono y recuperación de sesión |
| RSY-49 | Validar tiempos de respuesta sin confiar en el cliente |

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Servidor controla pregunta, orden, apertura y cierre de ronda; no envía solución antes del cierre.
2. Respuesta se acepta una sola vez y dentro del plazo; el tiempo del cliente no determina el bonus.
3. Reconexión recupera el estado y el abandono sigue una regla acordada sin duplicar resultados.
4. Probar latencia, pérdida de conexión y eventos fuera de orden con resultados consistentes en ambos clientes.
5. Se persiste el resultado base; pantalla final con cambio de ELO se integra en Sprint 8 mediante RSY-51.

## Criterios de las tareas originales

### RSY-47

- Ambos jugadores reciben misma pregunta y orden.
- Servidor valida respuestas.
- Corrección oculta hasta cierre de ronda.

### RSY-48

- Ventana de reconexión configurable.
- Recuperar estado autoritativo.
- Abandono y resultado aplicados una sola vez.

### RSY-49

- Fórmula de acierto y bonus documentada.
- Tiempo validado en servidor.
- Mismo evento no suma dos veces.

### RSY-50

- Temporizador usa fecha de cierre del servidor.
- Bloquear respuesta después del cierre.
- Mostrar selección confirmada.

### RSY-52

- Simular latencia, pérdida y reconexión.
- Comprobar orden de eventos y resultado consistente en ambos clientes.

## Decisiones antes de iniciar

Cantidad de rondas y tiempo por pregunta; fórmula de corrección y velocidad; ventana de reconexión y abandono; cierre de sesión de duelo.

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

Este incremento aún no ofrece el recorrido competitivo completo; no anunciar beta PvP hasta integrar ELO y resultados en Sprint 8.

Si la capacidad no alcanza: Reducir animaciones y cantidad de rondas de demostración; no omitir sincronización ni reconexión.

## Demostración de cierre

Dos navegadores juegan una partida, uno se desconecta y vuelve, y ambos terminan con el mismo resultado base.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
