# Sprint 21 Cuota gratuita y checkout de Plus

Aplicar cuota gratuita y crear pagos de suscripción en sandbox sin activar beneficios por acciones del cliente.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 8](SPRINT-8.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-113 | Implementar límite configurable (ej. 5/día) por usuario gratuito | 12 | Backend |
| RSY-114 | Mostrar mensaje con CTA de upgrade al alcanzar el límite | 7 | Frontend |
| RSY-115 | Integrar procesador de pago (tarjeta/plataforma móvil) | 20 | Backend |
| RSY-117 | Construir pantalla de checkout | 11 | Frontend |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

## Subtareas asociadas

| Padre | Subtarea existente propuesta |
| --- | --- |
| RSY-113 | Definir y probar consumo concurrente de cuota diaria |
| RSY-115 | Procesar webhooks firmados y reconciliar pagos |

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Cuota diaria configurable se consume atómicamente en servidor y tiene zona horaria definida; concurrencia no supera el límite.
2. UI comunica agotamiento y renovación; CTA abre checkout con precio y moneda aprobados.
3. Servidor determina importe y valida firma de webhooks, IDs de evento y estados duplicados/desordenados.
4. Se persiste estado del pago. Activación, cancelación y reembolso se completan en Sprint 22; no se habilita cobro público todavía.

## Criterios de las tareas originales

### RSY-113

- Cuota diaria configurable.
- Validar consumo en servidor y zona horaria.
- Definir si cuentan abandonos y fallos.

### RSY-114

- Mostrar cuota agotada y próxima renovación.
- CTA lleva a Plus.
- No cobrar ni activar sin confirmación.

### RSY-115

- Pago creado desde servidor con importe validado.
- Webhook firmado.
- Eventos duplicados/reordenados no duplican operación.

### RSY-117

- Mostrar precio, moneda y condiciones aprobadas.
- Doble envío controlado.
- Informar estados de pago.

## Decisiones antes de iniciar

Proveedor y entorno sandbox; precio, moneda, impuestos y condiciones comerciales por aprobar; qué duelo consume cuota y cuándo se devuelve.

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

Un checkout sin ciclo de suscripción completo no debe usarse con dinero real; mantener sandbox hasta aceptar Sprint 22.

Si la capacidad no alcanza: Elegir un único proveedor y canal web; integración específica de tiendas móviles queda pendiente de confirmación de alcance.

## Demostración de cierre

Agotar cuota con solicitudes simultáneas y crear un pago sandbox; comprobar rechazo de webhook sin firma.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
