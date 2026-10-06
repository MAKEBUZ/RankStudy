# Sprint 23 Preparación de lanzamiento

Preparar un candidato de lanzamiento que pueda operarse, recuperarse y validarse en staging.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 2](SPRINT-2.md), [Sprint 3](SPRINT-3.md), [Sprint 4](SPRINT-4.md), [Sprint 5](SPRINT-5.md), [Sprint 6](SPRINT-6.md), [Sprint 7](SPRINT-7.md), [Sprint 8](SPRINT-8.md), [Sprint 9](SPRINT-9.md), [Sprint 10](SPRINT-10.md), [Sprint 11](SPRINT-11.md), [Sprint 12](SPRINT-12.md), [Sprint 13](SPRINT-13.md), [Sprint 14](SPRINT-14.md), [Sprint 15](SPRINT-15.md), [Sprint 16](SPRINT-16.md), [Sprint 17](SPRINT-17.md), [Sprint 18](SPRINT-18.md), [Sprint 19](SPRINT-19.md), [Sprint 20](SPRINT-20.md), [Sprint 21](SPRINT-21.md), [Sprint 22](SPRINT-22.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| PL-S23-01 | Recuperación de contraseña con token de un solo uso y revocación de sesiones | 12 | Backend y frontend |
| PL-S23-02 | Entorno de staging con HTTPS y configuración de secretos | 10 | Desarrollo y operaciones |
| PL-S23-03 | Backup y prueba de restauración de PostgreSQL | 8 | Operaciones |
| PL-S23-04 | Regresión de recorridos completos y corrección de bloqueantes | 12 | QA y desarrollo |
| PL-S23-05 | Guía operativa y limpieza programada de sesiones y tokens vencidos | 8 | Desarrollo y operaciones |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

Los identificadores PL son referencias locales de planificación, no claves Jira. Crear incidencias solo tras confirmar alcance y reemplazar las referencias por sus claves reales.

## Subtareas asociadas

Sin subtareas adicionales identificadas en el CSV para este grupo. Desglosar dentro de las tareas si el equipo lo necesita.

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Recuperación no permite enumerar cuentas y usa enlace temporal de un solo uso; cambiar contraseña revoca sesiones según política definida.
2. Staging usa HTTPS y servicios reales de prueba; secretos fuera de Git y cookies Secure verificadas.
3. Backup restaurado en base aislada y procedimiento de rollback demostrado.
4. Recorridos aceptados pasan regresión; bloqueantes corregidos; documentación permite arranque y recuperación por otra persona.
5. Publicar producción requiere decisión explícita del responsable; este plan no autoriza despliegues ni cobros reales.

## Criterios de las tareas originales

Las tareas de preparación de lanzamiento se aceptan con los criterios del incremento y evidencia de sus recorridos.

## Decisiones antes de iniciar

Alcance del lanzamiento; hosting, dominio y SMTP; objetivos operativos, responsables de soporte y criterios de rollback.

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

Estas son tareas adicionales propuestas y aún no tienen clave Jira. Si despliegue o correcciones superan el presupuesto, reestimar antes de fijar fecha de lanzamiento.

Si la capacidad no alcanza: Reducir alcance del lanzamiento manteniendo integridad de datos y recuperación; no usar la reserva para agregar funciones.

## Demostración de cierre

Recuperar una cuenta, restaurar backup en entorno aislado y ejecutar el recorrido integrado sobre staging.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
