# Sprint 19 Torneo de aula y proyección

Permitir al docente ejecutar un torneo de aula y proyectar resultados en vivo.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 12](SPRINT-12.md), [Sprint 13](SPRINT-13.md), [Sprint 17](SPRINT-17.md), [Sprint 18](SPRINT-18.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-131 | Implementar inicio y cierre de torneo controlado por el docente | 18 | Backend |
| RSY-132 | Construir vista de resultados en tiempo real para pantalla grande | 16 | Frontend |
| RSY-133 | Simular un torneo de aula completo de principio a fin | 16 | QA y desarrollo |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

## Subtareas asociadas

| Padre | Subtarea existente propuesta |
| --- | --- |
| RSY-132 | Recuperar vista de proyección tras interrupción de red |

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Solo docente autorizado controla inicio/cierre; se valida banco, curso, cupo e inscripciones.
2. Proyección está autorizada y respeta visibilidad aprobada; no ofrece acceso público por URL predecible.
3. Reconexión recupera snapshot sin filas ni puntos repetidos.
4. Simulación completa incluye docente, estudiantes, preguntas, resultados y cierre único.

## Criterios de las tareas originales

### RSY-131

- Solo docente autorizado inicia/cierra torneo.
- Validar cupo y banco.
- Reintentos no duplican cierre ni resultados.

### RSY-132

- Vista de proyección usa datos autorizados.
- Actualización en vivo.
- Nombres visibles según política del curso.

### RSY-133

- Simular creación, inscripción, inicio, juego y cierre.
- Verificar resultados y permisos con docente/estudiantes.

## Decisiones antes de iniciar

Modalidad, cupo, quién inicia/cierra y nombres visibles en proyección; control de desconexión de la pantalla.

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

La pantalla compartida puede revelar nombres fuera del curso; aplicar la política de visibilidad antes de la demostración.

Si la capacidad no alcanza: Limitar variedad de vistas para pantalla grande; mantener el flujo completo y recuperación.

## Demostración de cierre

Ejecutar torneo de aula completo, desconectar proyección, reconectar y cerrar con resumen consistente.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
