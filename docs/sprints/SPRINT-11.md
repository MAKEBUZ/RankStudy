# Sprint 11 Clasificaciones y avatar compartido

Consultar rankings por materia y ámbito con respuesta estable y avatar consistente.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 3](SPRINT-3.md), [Sprint 8](SPRINT-8.md), [Sprint 10](SPRINT-10.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-77 | Implementar filtros por ámbito (grupo/país/global) y materia | 13 | Backend |
| RSY-78 | Optimizar consultas para actualización casi en tiempo real | 12 | Backend |
| RSY-79 | Construir tabla con filtros interactivos | 11 | Frontend |
| RSY-80 | Probar con gran volumen simulado de usuarios | 8 | QA y desarrollo |
| RSY-34 | Exponer el avatar en perfil, ranking y pantalla de duelo | 6 | Backend |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

## Subtareas asociadas

Sin subtareas adicionales identificadas en el CSV para este grupo. Desglosar dentro de las tareas si el equipo lo necesita.

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Filtros grupo/país/global se combinan con materia; solo miembros consultan el ámbito privado.
2. País es un dato declarado y validado bajo política acordada, no una inferencia silenciosa de ubicación.
3. Paginación y desempates son estables; cambios de ELO invalidan datos según frescura definida.
4. RSY-34 comprueba el mismo avatar en perfil, ranking y duelo con fallback ante asset ausente.
5. Pruebas con volumen representativo informan percentiles de latencia y errores y cumplen los umbrales acordados.

## Criterios de las tareas originales

### RSY-77

- Combinar materia y ámbito autorizado.
- Paginar y ordenar con desempate estable.
- Grupo restringido a miembros.

### RSY-78

- Medir consultas sobre volumen representativo.
- Índice/caché documentados.
- Invalidación y frescura por acordar.

### RSY-79

- Filtros conservan selección.
- Paginación consistente.
- Estados vacío, error y carga accesibles.

### RSY-80

- Dataset de gran volumen reproducible.
- Registrar latencia y errores.
- Umbral de rendimiento se acuerda antes de ejecutar.

### RSY-34

- Avatar consistente en perfil, ranking y duelo.
- Fallback si falta asset.
- Respuesta pública excluye datos privados.

## Decisiones antes de iniciar

Origen y visibilidad del país; tratamiento de país no declarado; desempates; volumen y frescura objetivo; política de caché.

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

Un ranking rápido pero incorrecto por caché desactualizada; reconciliar contra consultas fuente y medir latencia.

Si la capacidad no alcanza: Limitar volumen del piloto según capacidad validada; no prometer escala no demostrada.

## Demostración de cierre

Filtrar rankings, cambiar ELO mediante duelo y comprobar actualización y avatar en las tres superficies.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
