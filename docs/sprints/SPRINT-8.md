# Sprint 8 Resultado de duelo y progresión por ELO

Cerrar el duelo con ganador, variación de ELO, historial y rango visible por materia.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 5](SPRINT-5.md), [Sprint 7](SPRINT-7.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-65 | Implementar cálculo de ELO tras cada duelo, por materia | 10 | Backend |
| RSY-66 | Escribir pruebas unitarias de la fórmula | 4 | Backend |
| RSY-67 | Registrar cada variación de ELO con fecha y duelo asociado | 4 | Backend |
| RSY-68 | Construir gráfico de ELO en el tiempo en el perfil | 6 | Frontend |
| RSY-69 | Diseñar mínimo 5 tramos de rango con insignia distinta | 5 | Diseño y frontend |
| RSY-70 | Implementar lógica de rango según ELO actual | 6 | Backend |
| RSY-71 | Disparar notificación al subir o bajar de rango | 4 | Backend |
| RSY-72 | Mostrar insignia en perfil y notificación in-app | 5 | Frontend |
| RSY-51 | Construir pantalla de resultado con ganador y cambio de ELO | 6 | Frontend |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

## Subtareas asociadas

| Padre | Subtarea existente propuesta |
| --- | --- |
| RSY-65 | Asegurar actualización atómica e idempotente del ELO |

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Cierre actualiza ELO e historial atómicamente una sola vez por duelo, jugador y materia.
2. Pruebas independientes cubren victoria, derrota, empate, extremos y reejecución.
3. Al menos cinco rangos tienen insignias diferenciadas y reglas probadas en cada frontera.
4. Pantalla final muestra ganador/empate, ELO anterior/nuevo y rango consistentes; el gráfico usa historial ordenado.
5. Notificar únicamente un cambio real de rango y no repetirlo por reintentos.

## Criterios de las tareas originales

### RSY-65

- ELO por materia actualizado al cerrar duelo.
- Parámetros y empate documentados.
- Transacción idempotente.

### RSY-66

- Probar victoria, derrota, empate, límites y ejecución repetida.
- Comparar valores con ejemplos calculados independientemente.

### RSY-67

- Registrar ELO antes/después, materia, fecha y duelo.
- Una variación por jugador/materia/duelo.
- Acceso propio autorizado.

### RSY-68

- Gráfico por materia con fechas ordenadas.
- Corresponde al historial.
- Explicar ausencia de partidas.

### RSY-69

- Al menos 5 rangos con insignias diferenciables.
- Nombres y umbrales por acordar.
- Assets legibles y accesibles.

### RSY-70

- Asignación usa tabla de umbrales aprobada.
- Cubrir valores exactamente en cada frontera.
- Resultado por materia.

### RSY-71

- Emitir evento solo cuando cambia rango.
- Identificar ascenso/descenso.
- No repetir notificación por reintento.

### RSY-72

- Insignia corresponde al rango actual.
- Notificación muestra cambio.
- Icono con alternativa textual.

### RSY-51

- Mostrar ganador o empate y ELO anterior/nuevo por materia.
- Resultado coincide con servidor.
- No duplicar cierre.

## Decisiones antes de iniciar

Factor de ajuste ELO y empates; cinco o más rangos y umbrales; comportamiento de abandono; identidad de la temporada inicial.

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

No sumar ni descontar ELO dos veces ante reconexión o cierre repetido; identificar operación por duelo/jugador/materia.

Si la capacidad no alcanza: Simplificar presentación del gráfico; mantener resultado, historial e idempotencia.

## Demostración de cierre

Completar un duelo, observar cambio de rango y repetir el evento de cierre sin cambiar saldo de ELO.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
