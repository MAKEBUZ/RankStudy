# Sprint 17 Cursos e instituciones

Gestionar cursos, docentes y estudiantes con aislamiento entre instituciones.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 4](SPRINT-4.md), [Sprint 10](SPRINT-10.md), [Sprint 11](SPRINT-11.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-123 | Definir esquema de curso, docente responsable y estudiantes | 12 | Backend |
| RSY-124 | Implementar carga vía CSV | 12 | Backend |
| RSY-125 | Implementar enlace de invitación autogenerado | 7 | Backend |
| RSY-126 | Construir panel de gestión de cursos para administradores | 11 | Frontend |
| RSY-127 | Implementar ranking interno visible solo dentro del curso | 8 | Backend |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

## Subtareas asociadas

| Padre | Subtarea existente propuesta |
| --- | --- |
| RSY-123 | Definir matriz de roles y aislamiento institucional |
| RSY-124 | Agregar prevalidación y reporte de errores de carga masiva |
| RSY-125 | Gestionar revocación y vencimiento de invitaciones de curso |

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Modelo de institución/curso aplica matriz de permisos y prueba accesos cruzados por ID.
2. Carga CSV tiene prevalidación, errores por fila y reintento sin duplicar estudiantes o membresías; no asigna privilegios por columnas manipuladas.
3. Invitación liga al curso, vence y puede revocarse; no concede rol docente.
4. Panel y ranking de curso solo son visibles a usuarios autorizados; retirar membresía corta acceso.

## Criterios de las tareas originales

### RSY-123

- Modelo de curso, institución, docente y estudiantes.
- Aislamiento entre instituciones.
- Roles y restricciones definidos.

### RSY-124

- Validar columnas y cada fila.
- Reporte de errores.
- Duplicados y reintentos no crean estudiantes repetidos.

### RSY-125

- Token de invitación ligado al curso con vencimiento configurable.
- Revocar acceso.
- No conceder rol docente.

### RSY-126

- Administradores autorizados gestionan cursos propios.
- Filtros y estados claros.
- No exponer institución ajena.

### RSY-127

- Ranking solo para miembros del curso.
- Retiro revoca consulta.
- Materia y desempate consistentes.

## Decisiones antes de iniciar

Roles administrativos/docentes, pertenencia y revocación; columnas CSV; importación parcial o atómica; TTL y usos de invitación.

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

Modelo institucional y grupos sociales no son equivalentes; reutilizar utilidades sin confundir límites de acceso.

Si la capacidad no alcanza: Limitar tamaño de lote del piloto, sin omitir prevalidación y aislamiento.

## Demostración de cierre

Crear dos instituciones, importar estudiantes, invitar a un curso y demostrar rechazo de acceso desde la otra institución.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
