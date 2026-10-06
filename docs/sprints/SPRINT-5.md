# Sprint 5 Calibración y ELO inicial

Asignar un ELO inicial por materia mediante un test opcional o un valor por defecto aprobado.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 3](SPRINT-3.md), [Sprint 4](SPRINT-4.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-35 | Curar 10-15 preguntas por materia con dificultad etiquetada | 14 | Contenido y revisión académica |
| RSY-36 | Implementar fórmula de ELO inicial según aciertos/dificultad | 12 | Backend |
| RSY-37 | Definir ELO por defecto para quienes saltan el test | 4 | Backend |
| RSY-38 | Construir la UI del test con opción de saltar | 12 | Frontend |
| RSY-39 | Mostrar resultado y ELO asignado al finalizar | 8 | Frontend |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

## Subtareas asociadas

| Padre | Subtarea existente propuesta |
| --- | --- |
| RSY-36 | Acordar parámetros y ejemplos de calibración inicial |

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Cada materia piloto dispone de 10 a 15 preguntas de calibración con dificultad y explicación revisadas.
2. Resultado determinista con ejemplos calculados independientemente; saltar asigna un valor explícito y no deja ELO nulo.
3. Doble envío no duplica calibración ni modifica resultados ya aceptados sin una política de recalibración.
4. Pantalla de resultado coincide con ELO persistido y permite continuar al perfil.

## Criterios de las tareas originales

### RSY-35

- Curar entre 10 y 15 preguntas por materia.
- Dificultad, respuesta y explicación revisadas.
- Identificar versión del banco.

### RSY-36

- Fórmula y parámetros iniciales documentados.
- Misma entrada produce mismo ELO.
- Contemplar respuestas omitidas y límites.

### RSY-37

- Valor inicial configurable y documentado por materia.
- Omitir test no deja ELO nulo.
- No inventar el valor sin aprobación de producto.

### RSY-38

- Mostrar avance y permitir saltar.
- Doble envío no duplica resultado.
- Explicar efecto de omitir calibración.

### RSY-39

- Resultado muestra aciertos y ELO por materia.
- Coincide con cálculo persistido.
- Acceso posterior al perfil.

## Decisiones antes de iniciar

Fórmula y límites del ELO inicial; valor por defecto; tratamiento de preguntas omitidas; materias piloto y número de preguntas entre 10 y 15 por materia.

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

El esfuerzo de curación crece con las materias. Si el conjunto no cabe en 14 h, reducir materias piloto o reestimar, sin comprimir la revisión.

Si la capacidad no alcanza: Reducir materias piloto; mantener test opcional, persistencia y cálculo probado.

## Demostración de cierre

Terminar el test y mostrar ELO por materia; repetir con otra cuenta que lo omite y comprobar el valor por defecto.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
