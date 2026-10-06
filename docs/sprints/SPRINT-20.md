# Sprint 20 Generación de preguntas desde apuntes

Crear borradores de preguntas desde texto o PDF para revisión docente antes de publicar.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 4](SPRINT-4.md), [Sprint 18](SPRINT-18.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-89 | Definir prompt de generación de preguntas de opción múltiple | 8 | Backend |
| RSY-90 | Implementar llamada a la API y parseo de la respuesta | 13 | Backend |
| RSY-91 | Implementar extracción de texto desde PDF | 11 | Backend |
| RSY-92 | Construir UI de edición/aprobación de las preguntas generadas | 10 | Frontend |
| RSY-93 | Revisar muestra de preguntas generadas por materia | 8 | QA y desarrollo |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

## Subtareas asociadas

| Padre | Subtarea existente propuesta |
| --- | --- |
| RSY-90 | Controlar entradas, validación y coste de generación asistida |
| RSY-91 | Validar archivos y limpiar temporales de extracción |

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Entrada es contenido, no instrucciones ejecutables; salida se valida por esquema y reglas académicas.
2. Timeout, fallos, límites y gasto están controlados; no se exponen credenciales ni documentos entre usuarios.
3. Extracción valida tipo, tamaño y texto legible y elimina temporales; PDF sin texto informa limitación de OCR.
4. Preguntas siempre quedan pendientes hasta revisión humana; la muestra por materia se evalúa con rúbrica y criterios aprobados.

## Criterios de las tareas originales

### RSY-89

- Prompt exige esquema, una correcta y explicación.
- Tratar apuntes como datos.
- Generación siempre pendiente de revisión.

### RSY-90

- Validar JSON y contenido.
- Timeout y errores controlados.
- Secretos protegidos y gasto limitado por configuración.

### RSY-91

- Validar tipo y tamaño de PDF.
- Extraer texto legible.
- PDF escaneado o protegido informa limitación sin publicar basura.

### RSY-92

- Mostrar fuente y contenido generado editable.
- Aprobación explícita.
- Descartar preguntas inválidas antes de persistir.

### RSY-93

- Muestra por materia con rúbrica de precisión y ambigüedad.
- Registrar defectos y correcciones.
- Criterio de aprobación por acordar.

## Decisiones antes de iniciar

Proveedor y modelo, presupuesto y cuotas; tamaño/páginas de PDF; tratamiento de PDF escaneado; rúbrica académica y uso de apuntes autorizados.

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

La generación puede producir respuestas erróneas; la revisión académica es parte de la entrega, no una tarea opcional posterior.

Si la capacidad no alcanza: Entregar PDF con texto seleccionable; OCR se excluye y se registra como evolución propuesta.

## Demostración de cierre

Subir texto y PDF, revisar y corregir una pregunta, aprobarla al banco autorizado y rechazar un archivo inválido.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
