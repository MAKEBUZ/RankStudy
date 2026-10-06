# Sprint 14 Misiones monedas y rachas

Mantener misiones activas y rachas y acreditar monedas por progreso verificado.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 8](SPRINT-8.md), [Sprint 9](SPRINT-9.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-103 | Implementar generación automática diaria/semanal | 9 | Backend |
| RSY-104 | Garantizar mínimo 3 misiones activas simultáneas | 5 | Backend |
| RSY-105 | Implementar entrega de monedas al completar misión | 9 | Backend |
| RSY-106 | Construir listado de misiones activas con progreso | 7 | Frontend |
| RSY-107 | Implementar lógica de incremento/reinicio diario de racha | 8 | Backend |
| RSY-108 | Programar notificación antes de perder la racha | 7 | Backend |
| RSY-109 | Mostrar racha actual en el perfil | 5 | Frontend |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

## Subtareas asociadas

| Padre | Subtarea existente propuesta |
| --- | --- |
| RSY-107 | Acordar día de corte y actividad que mantiene racha |

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Generación diaria/semanal idempotente mantiene al menos tres misiones activas y con vigencia.
2. Monedas se acreditan una sola vez por misión mediante transacción y registro de movimientos.
3. Racha aumenta a lo sumo una vez por día válido y se reinicia conforme al corte aprobado.
4. Recordatorio push respeta consentimiento y horario silencioso, no se duplica; gestionar permiso denegado y suscripción vencida.
5. Pantallas muestran progreso y saldo reales. La habilitación Web Push y sus credenciales están incluidas en RSY-108.

## Criterios de las tareas originales

### RSY-103

- Generar misiones diarias/semanales con zona horaria definida.
- Reglas versionadas.
- Job repetido no duplica misiones.

### RSY-104

- Al menos 3 misiones activas simultáneas.
- Vigencia y disponibilidad verificadas.
- Reposición sin duplicación.

### RSY-105

- Validar progreso en servidor.
- Acreditar monedas una sola vez por misión.
- Transacción y comprobante.

### RSY-106

- Mostrar misiones, progreso y vencimiento.
- Valor viene del servidor.
- Indicar recompensa entregada.

### RSY-107

- Definir actividad válida y día de corte.
- Incrementar una vez por día.
- Reiniciar solo ante día perdido.

### RSY-108

- Notificar antes del corte con consentimiento.
- Horario silencioso configurable.
- Evitar recordatorios duplicados.

### RSY-109

- Racha visible coincide con servidor.
- Explicación de actividad válida.
- Estado cero y día de corte claros.

## Decisiones antes de iniciar

Actividades válidas, zona horaria y día de corte; catálogo de misiones; reglas de saldo; consentimiento y canal de recordatorios.

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

Push añade configuración de navegador y servicio. Sin entrega comprobada en el navegador soportado, RSY-108 queda pendiente.

Si la capacidad no alcanza: Posponer recordatorio push si su habilitación consume capacidad; registrar RSY-108 como arrastre explícito.

## Demostración de cierre

Completar misión, repetir evento sin duplicar monedas y simular cambio de día con y sin actividad.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
