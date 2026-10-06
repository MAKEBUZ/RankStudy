# Sprint 12 Duelos grupales

Jugar partidas con varios participantes desde un lobby hasta una clasificación final consistente.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 7](SPRINT-7.md), [Sprint 8](SPRINT-8.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-53 | Implementar sincronización de preguntas para todos los jugadores | 14 | Backend |
| RSY-54 | Implementar eliminación progresiva o ranking final | 10 | Backend |
| RSY-55 | Construir sala de espera con lista de jugadores | 10 | Frontend |
| RSY-56 | Construir tabla de resultados en tiempo real | 8 | Frontend |
| RSY-57 | Probar con el número máximo de jugadores simultáneos definido | 8 | QA y desarrollo |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

## Subtareas asociadas

Sin subtareas adicionales identificadas en el CSV para este grupo. Desglosar dentro de las tareas si el equipo lo necesita.

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Lobby controla cupo y participantes; pregunta y plazo son comunes y autorizados.
2. Modo elegido tiene regla explícita de eliminación o resultado final y desempates.
3. Tabla en vivo coincide con servidor y no duplica jugadores ni puntajes al reconectar.
4. Prueba al máximo acordado y por encima del cupo verifica rendimiento y rechazo del excedente.
5. El ELO grupal queda desactivado salvo regla académica aprobada y probada; no se reutiliza accidentalmente el cierre 1v1.

## Criterios de las tareas originales

### RSY-53

- Pregunta y cierre sincronizados para todos.
- Participantes autenticados.
- Respuestas tardías excluidas.

### RSY-54

- Elegir eliminación o ranking mediante regla configurable.
- Empates resueltos de forma documentada.
- Cierre único.

### RSY-55

- Mostrar integrantes y estado listo.
- Altas/bajas actualizadas.
- Entrada y arranque sujetos a permisos y cupo.

### RSY-56

- Tabla consistente con puntuación del servidor.
- Actualización sin filas duplicadas.
- Definir desempate visible.

### RSY-57

- Fijar máximo de jugadores antes de prueba.
- Ejecutar al máximo y rechazar excedente.
- Registrar latencia y errores.

## Decisiones antes de iniciar

Cupo máximo; modo eliminación o ranking final; desempates, abandono y política ELO grupal. Por defecto no usar la fórmula 1v1 sin validarla.

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

El cupo afecta arquitectura y prueba; fijarlo antes de implementar, y no declarar escalabilidad sin evidencia.

Si la capacidad no alcanza: Entregar un solo modo aprobado; el segundo se replanifica si no cabe.

## Demostración de cierre

Llenar la sala, rechazar una entrada extra, jugar, reconectar un cliente y mostrar un cierre único.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
