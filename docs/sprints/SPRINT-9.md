# Sprint 9 Repaso y desempeño personal

Revisar errores del duelo, guardar preguntas y recibir recomendaciones basadas en desempeño real.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 7](SPRINT-7.md), [Sprint 8](SPRINT-8.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-62 | Exponer endpoint con preguntas, respuesta correcta y explicación | 8 | Backend |
| RSY-63 | Construir listado de preguntas con explicaciones | 6 | Frontend |
| RSY-64 | Implementar función de guardado y acceso posterior desde perfil | 7 | Backend |
| RSY-94 | Calcular evolución de ELO y desglose de aciertos/fallos por tema | 10 | Backend |
| RSY-95 | Construir gráfico de evolución y tabla de desglose por tema | 8 | Frontend |
| RSY-96 | Calcular tasa de error por tema y ordenar por prioridad | 7 | Backend |
| RSY-97 | Mostrar los temas recomendados en el dashboard principal | 4 | Frontend |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

## Subtareas asociadas

| Padre | Subtarea existente propuesta |
| --- | --- |
| RSY-62 | Probar autorización y ocultamiento de respuestas durante duelo |
| RSY-94 | Definir métricas y excluir resultados incompletos |

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Solo participantes consultan respuestas correctas de un duelo finalizado; un tercero o duelo en curso recibe rechazo.
2. Guardar repaso es propio y sin duplicados; las versiones históricas no cambian al editar el banco.
3. Gráfico y desglose se reconcilian con duelos cerrados; falta de datos se distingue de cero errores.
4. Recomendaciones muestran razón y muestra usada; no se inventa precisión con datos insuficientes.

## Criterios de las tareas originales

### RSY-62

- Solo participantes de duelo finalizado consultan respuestas y explicaciones.
- Duelo en curso nunca revela solución.

### RSY-63

- Listar pregunta, respuesta propia, correcta y explicación.
- Orden coincide con duelo.
- Estado vacío y errores contemplados.

### RSY-64

- Guardar pregunta para repaso solo del usuario actual.
- Evitar duplicados.
- Acceso desde perfil respetando disponibilidad.

### RSY-94

- Estadísticas solo de duelos cerrados.
- Agrupar materia/tema y fecha.
- Ceros diferenciados de falta de datos.

### RSY-95

- Gráfico y tabla coinciden con API.
- Filtros comunes.
- Mostrar muestra usada y estado sin actividad.

### RSY-96

- Tasa de error con numerador y denominador explícitos.
- Mínimo de muestra configurable.
- Desempate documentado.

### RSY-97

- Mostrar temas priorizados y razón de recomendación.
- Manejar muestra insuficiente.
- Actualizar tras nuevos resultados.

## Decisiones antes de iniciar

Definiciones de acierto/fallo y abandono; mínimo de muestra; filtros de fechas y materia; criterio de prioridad de temas.

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

Estadísticas incorrectas por resultados incompletos o preguntas editadas; usar historial versionado y conjunto de control.

Si la capacidad no alcanza: Reducir variedad de visualizaciones; conservar controles de acceso y definiciones de métricas.

## Demostración de cierre

Revisar un duelo, guardar una pregunta y mostrar cómo un resultado nuevo cambia el dashboard y las recomendaciones.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
