# Sprint 4 Banco académico y moderación docente

Disponer de preguntas aprobadas y versionadas y un flujo docente con revisión administrativa.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 1](SPRINT-1.md), [Sprint 3](SPRINT-3.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-81 | Definir esquema (materia, tema, dificultad, opciones, respuesta) | 7 | Backend |
| RSY-82 | Construir formulario de carga y edición de preguntas | 8 | Frontend |
| RSY-83 | Bloquear guardado si falta materia, tema o dificultad | 4 | Backend |
| RSY-84 | Curar y cargar el set inicial de preguntas por materia | 7 | Contenido y revisión académica |
| RSY-85 | Definir flujo de verificación (documento/institución) | 6 | Backend |
| RSY-86 | Implementar estados pendiente/aprobado/rechazado | 7 | Backend |
| RSY-87 | Construir formulario de carga para docentes | 5 | Frontend |
| RSY-88 | Construir panel de moderación para administradores | 6 | Frontend |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

## Subtareas asociadas

| Padre | Subtarea existente propuesta |
| --- | --- |
| RSY-81 | Agregar versión y trazabilidad de preguntas utilizadas |
| RSY-86 | Registrar auditoría de publicación y revisión de contenido |

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Modelo y validaciones incluyen materia, tema, dificultad, opciones, una respuesta correcta y explicación.
2. Solo preguntas aprobadas entran en juegos; pendiente, aprobado y rechazado tienen transiciones autorizadas y auditadas.
3. Docente y administrador no pueden atribuirse permisos desde el cliente; implementar roles y bootstrap administrativo como parte de RSY-85/86.
4. El set inicial se revisa por materia, registra fuente/licencia y preserva versión de las preguntas usadas.

## Criterios de las tareas originales

### RSY-81

- Esquema incluye materia, tema, dificultad, opciones, respuesta y explicación.
- IDs y versión.
- Exactamente una opción correcta.

### RSY-82

- Crear/editar preguntas con permisos administrativos.
- Conservar borrador.
- Validar opciones y metadatos antes de guardar.

### RSY-83

- Servidor rechaza ausencia de materia, tema o dificultad.
- Error por campo.
- No persistir pregunta incompleta.

### RSY-84

- Set inicial por materia con revisión académica.
- Cantidad por acordar.
- Sin duplicados y con fuentes/licencias registradas.

### RSY-85

- Definir evidencia mínima y revisión de cuenta docente.
- Acceso limitado a documentos.
- Retención y aprobación por acordar.

### RSY-86

- Transiciones pendiente/aprobado/rechazado autorizadas y auditadas.
- Solo aprobadas aparecen en juegos.
- Rechazo con motivo.

### RSY-87

- Docente autorizado envía pregunta como pendiente.
- Ver validación y estado propio.
- Edición no evita moderación.

### RSY-88

- Administrador revisa pregunta y decide con motivo.
- Registrar actor y fecha.
- Edición concurrente no pierde cambios.

## Decisiones antes de iniciar

Materias piloto y cantidad inicial; rúbrica académica; evidencia mínima docente y retención; matriz de permisos y alta administrativa controlada.

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

La curación depende de disponibilidad de revisión académica. Limitar materias piloto antes de fijar cantidades, no aprobar contenido sin revisar.

Si la capacidad no alcanza: Reducir el número de materias piloto aprobado; conservar revisión y permisos en todos los casos.

## Demostración de cierre

Enviar una pregunta como docente, rechazarla con motivo, corregirla, aprobarla y comprobar su disponibilidad para consumo.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
