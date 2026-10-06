# Sprint 15 Temporadas y recompensas

Cerrar temporadas mensuales con reinicio parcial y entrega única de recompensas.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 8](SPRINT-8.md), [Sprint 14](SPRINT-14.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-73 | Implementar job mensual de cierre de temporada | 18 | Backend |
| RSY-74 | Definir tabla de recompensas por rango alcanzado | 8 | Backend |
| RSY-75 | Implementar entrega automática de recompensas | 16 | Backend |
| RSY-76 | Construir pantalla de resumen con rango y recompensa obtenida | 8 | Frontend |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

## Subtareas asociadas

| Padre | Subtarea existente propuesta |
| --- | --- |
| RSY-73 | Definir calendario y recuperación del cierre de temporada |

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Job mensual guarda checkpoint y permite recuperación; reejecución no reinicia ELO ni entrega premios dos veces.
2. Recompensas aprobadas usan monedas ya existentes; cosméticos de temporada solo se habilitan tras disponer del catálogo.
3. Cierre coordina con duelos en curso y conserva historial antes/después.
4. Resumen muestra rango final y recompensa realmente otorgada, con tratamiento de errores.

## Criterios de las tareas originales

### RSY-73

- Cierre mensual con zona horaria definida.
- Reinicio parcial configurable.
- Reejecución no altera cierre ya aplicado.

### RSY-74

- Tabla versionada por temporada/rango.
- Recompensas y elegibilidad documentadas.
- Aprobación de producto antes de entrega.

### RSY-75

- Entrega única por usuario y temporada.
- Actualizar saldo/inventario de forma atómica.
- Guardar comprobante consultable.

### RSY-76

- Mostrar temporada, rango final y recompensa realmente otorgada.
- Reclamar error sin duplicar premio.

## Decisiones antes de iniciar

Calendario y zona horaria; fórmula de reinicio; tabla de recompensas por rango y elegibilidad; tratamiento de duelos que cruzan el cierre.

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

Cruce de partidas con cierre y fallos parciales; definir corte transaccional y probar recuperación antes de programar cron real.

Si la capacidad no alcanza: Reducir variedad de recompensas, sin recortar recuperación o historial.

## Demostración de cierre

Simular cierre, interrumpir una entrega y reanudar; verificar exactamente un premio por usuario/temporada.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
