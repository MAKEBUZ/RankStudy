# Sprint 16 Tienda y propiedad de cosméticos

Comprar y aplicar cosméticos usando monedas virtuales con inventario consistente.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 3](SPRINT-3.md), [Sprint 14](SPRINT-14.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-120 | Cargar mínimo 10 ítems cosméticos con precio | 10 | Backend |
| RSY-121 | Construir vitrina con vista previa antes de comprar | 12 | Frontend |
| RSY-122 | Implementar lógica de compra y aplicación del cosmético | 18 | Backend |
| PL-S16-01 | Reconciliar movimientos de monedero e inventario y probar fallos de compra | 10 | Backend y QA |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

Los identificadores PL son referencias locales de planificación, no claves Jira. Crear incidencias solo tras confirmar alcance y reemplazar las referencias por sus claves reales.

## Subtareas asociadas

| Padre | Subtarea existente propuesta |
| --- | --- |
| RSY-122 | Probar atomicidad de compra y propiedad del cosmético |

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Catálogo contiene al menos diez ítems con precio y referencia estable; vista previa coincide con la aplicación.
2. Servidor valida precio, saldo y propiedad; débito y entrega son atómicos e idempotentes.
3. No puede aplicarse un ítem ajeno ni producir saldo negativo mediante compras concurrentes.
4. Movimientos del monedero e inventario se reconcilian. La moneda virtual no implica compra con dinero real en este sprint.

## Criterios de las tareas originales

### RSY-120

- Al menos 10 cosméticos con ID, precio y moneda.
- Catálogo versionado.
- Distinguir gratuitos y comprables.

### RSY-121

- Vista previa coincide con cosmético.
- Precio visible.
- Confirmar compra y manejar saldo insuficiente.

### RSY-122

- Validar precio y saldo en servidor.
- Debitar y otorgar atómicamente.
- Aplicar solo cosméticos propios.

## Decisiones antes de iniciar

Al menos diez ítems, precios en moneda virtual y licencias; política de propiedad/duplicados; relación entre combinaciones y cosméticos.

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

Confundir moneda virtual con pagos reales ampliaría el alcance. Pagos de Plus se planifican en Sprints 21 y 22.

Si la capacidad no alcanza: Reducir efectos visuales y filtros; mantener diez ítems, atomicidad y propiedad.

## Demostración de cierre

Comprar, repetir solicitud, simular fallo de persistencia y aplicar un cosmético propio sin afectar otra cuenta.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
