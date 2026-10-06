# Sprint 18 Bancos por curso y reportes

Asignar bancos autorizados a cursos y exportar desempeño filtrado en CSV y PDF.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 4](SPRINT-4.md), [Sprint 7](SPRINT-7.md), [Sprint 9](SPRINT-9.md), [Sprint 17](SPRINT-17.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-128 | Implementar selector entre banco propio o público | 9 | Backend |
| RSY-129 | Filtrar preguntas de duelo según banco asignado al curso | 10 | Backend |
| RSY-130 | Construir UI del selector en el panel institucional | 7 | Frontend |
| RSY-98 | Implementar exportación a CSV y PDF por curso/grupo | 16 | Backend |
| RSY-99 | Construir filtro de rango de fechas y botón de exportar | 8 | Frontend |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

## Subtareas asociadas

| Padre | Subtarea existente propuesta |
| --- | --- |
| RSY-98 | Verificar privacidad y coherencia de exportaciones |
| RSY-128 | Validar banco utilizable antes de iniciar torneo |

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Curso selecciona banco propio o público autorizado; banco sin preguntas suficientes impide iniciar partida con motivo visible.
2. Duelo fija banco/versiones al iniciar; cambio posterior no altera partida activa ni mezcla instituciones.
3. CSV y PDF coinciden en fechas, materias y totales; filtros inclusivos/exclusivos se documentan.
4. Docente solo exporta cursos permitidos; textos CSV se neutralizan frente a fórmulas de hoja de cálculo.

## Criterios de las tareas originales

### RSY-128

- Elegir banco propio o público autorizado.
- Persistir selección por curso.
- Banco vacío informa bloqueo.

### RSY-129

- Solo preguntas aprobadas del banco asignado.
- Banco se fija al iniciar duelo.
- Nunca mezclar cursos por error.

### RSY-130

- Mostrar banco actual y opciones autorizadas.
- Guardar con confirmación.
- Manejar banco sin preguntas.

### RSY-98

- CSV y PDF con mismos filtros y totales.
- Docente accede solo a sus cursos.
- Escapar celdas peligrosas para CSV.

### RSY-99

- Validar intervalo y zona horaria.
- Exportar filtros activos.
- Informar carga y fallo de generación.

## Decisiones antes de iniciar

Propiedad del banco institucional y visibilidad pública; mínimo de preguntas; intervalos y zona horaria de reportes; campos de exportación.

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

RSY-129 necesita contexto de curso en la sesión de duelo; incluirlo en el contrato y en las pruebas de aislamiento.

Si la capacidad no alcanza: Simplificar diseño del PDF; conservar ambos formatos y filtros funcionales.

## Demostración de cierre

Asignar banco propio, jugar con su contenido y exportar un periodo; comparar totales y rechazar curso ajeno.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
