# Sprint 13 Torneos y seguimiento en vivo

Inscribir participantes con cupo y ejecutar un torneo con fases y resultados visibles.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 8](SPRINT-8.md), [Sprint 12](SPRINT-12.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-110 | Implementar registro al torneo con control de cupo | 16 | Backend |
| RSY-111 | Implementar lógica de bracket o tabla de resultados | 18 | Backend |
| RSY-112 | Construir pantalla de inscripción y visualización del torneo en curso | 16 | Frontend |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

## Subtareas asociadas

| Padre | Subtarea existente propuesta |
| --- | --- |
| RSY-110 | Probar inscripción concurrente al último cupo |

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Inscripción reserva cupo atómicamente; solicitudes repetidas o simultáneas por última plaza no exceden el máximo.
2. Elegir un formato aprobado y documentar avance, empates y ausencias; reejecución no reconstruye resultados distintos.
3. La UI muestra inscripción propia, cupo y fase actual con actualizaciones autorizadas.
4. Inicio, avance y finalización producen resultados únicos y auditables.

## Criterios de las tareas originales

### RSY-110

- Cupo reservado atómicamente.
- Inscripción repetida no duplica plaza.
- Rechazar torneo cerrado o lleno.

### RSY-111

- Definir bracket o clasificación por configuración.
- Desempates y participantes impares documentados.
- Reejecución consistente.

### RSY-112

- Mostrar cupo, inscripción propia y fase actual.
- Actualización consistente.
- Impedir inscripción cuando cierra.

## Decisiones antes de iniciar

Bracket o tabla, reglas para participantes impares, ausencias, desempate y registro/cierre; modalidad de juego 1v1 o grupal.

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

Bracket y ranking son formatos distintos; no comprometer ambos con 18 h sin una nueva estimación.

Si la capacidad no alcanza: Seleccionar un único formato de torneo; mantener el flujo completo.

## Demostración de cierre

Inscribir usuarios, competir por el último cupo, iniciar torneo, completar fases y consultar resultado final.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
