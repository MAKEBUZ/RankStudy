# Planning de RankStudy en cuatro sprints

El backlog completo queda dividido en **4 sprints totales**, incluyendo Sprint 1. Conserva 125 tareas originales, 28 subtareas y 6 tareas adicionales propuestas; las 8 épicas mantienen sus padres. Esta planificación sustituye la distribución anterior y no modifica Jira.

## Hoja de ruta

| Sprint | Objetivo | Tareas originales | Entrega | Integración | Reserva | Total |
| --- | --- | --- | --- | --- | --- | --- |
| [Sprint 1](SPRINT-1.md) | Bases, onboarding y contenido académico | 37 | 250 h | 30 h | 20 h | 300 h |
| [Sprint 2](SPRINT-2.md) | Duelos individuales, progreso y comunidad | 41 | 300 h | 36 h | 24 h | 360 h |
| [Sprint 3](SPRINT-3.md) | Torneos, recompensas y cursos | 27 | 300 h | 36 h | 24 h | 360 h |
| [Sprint 4](SPRINT-4.md) | Herramientas docentes, IA, Plus y lanzamiento | 20 | 300 h | 36 h | 24 h | 360 h |
| Total | Backlog completo | 125 | 1150 h | 138 h | 92 h | 1380 h |

## Duración y capacidad

Se propone una cadencia de dos semanas por sprint, ocho semanas en total, condicionada a capacidad confirmada. Con 60 horas efectivas por persona y sprint, la carga equivale a 5 personas en Sprint 1 y 6 en cada sprint restante. No es una garantía de plazo: hay dependencias internas y revisión académica, QA y configuración externa que limitan el paralelismo. Con una sola persona y esa disponibilidad el alcance completo no cabe en cuatro sprints de dos semanas. Confirmar equipo o reducir alcance antes de comprometer fechas.

Se conservan las estimaciones anteriores; el registro ya implementado permanece en la línea base de 1150 h de entrega. Estas horas no representan todo trabajo pendiente ni horas reales consumidas. Reestimar lo restante tras aceptar el incremento existente. Responsables nominales y fechas quedan por acordar.

## Dependencias y orden

1. Sprint 1: identidad → perfil → contenido revisado → calibración. OAuth requiere credenciales reales de Google y Apple.
2. Sprint 2: matchmaking → motor de duelo → ELO y resultado → repaso, estadísticas y comunidad → ranking. RSY-28 se valida con matchmaking; RSY-34 con perfil, duelo y ranking. RSY-102 usa consulta privada mínima antes del filtro general RSY-77.
3. Sprint 3: juego grupal → torneos; misiones y monedero antes de recompensas de temporada y tienda. Cursos reutilizan identidad, contenido y rankings anteriores. No aplicar automáticamente ELO individual al modo grupal.
4. Sprint 4: cursos y banco antes de asignación de preguntas, reportes y torneo de aula; contenido moderado antes de IA; checkout antes de suscripciones y conciliación. Regresión y recuperación cierran el candidato de lanzamiento.

Los paquetes dentro de cada documento son secuencias de trabajo del mismo sprint. No son sprints adicionales. Reducir alcance exige mover también sus dependientes y actualizar la [matriz de cobertura](COBERTURA-BACKLOG.md).

## Estado actual

Ampliación solicitada: [estudio con materiales propios y preguntas asistidas por IA](../ESTUDIO-CON-IA.md). Añade biblioteca privada para estudiantes, práctica, validación automática y dos instancias de aprobación. Se integra en el Sprint 4 y requiere reestimar capacidad; las 1380 h anteriores son la línea base, no una estimación del alcance ampliado. El ajuste del Sprint 2 limita el cambio de ELO a −11/+11 por partida; conserva rangos y puntuación por respuesta.

Sprint 1 tiene registro, perfil, avatares, banco, moderación y calibración implementados y probados localmente. Su cierre requiere validación OAuth real y aceptación académica/producto. Consultar [estado y evidencia](ESTADO-SPRINT-1.md). El [Sprint 2](ESTADO-SPRINT-2.md) también tiene implementación local y validación; sus condiciones de aceptación están en la [guía de cierre](PENDIENTES-SPRINTS-1-Y-2.md). Los sprints 3 y 4 siguen planificados.

## Definición común de terminado

- Criterios funcionales y negativos aceptados con evidencia reproducible.
- API, datos y migraciones documentados; permisos comprobados en servidor.
- Pruebas de dominio, integración y navegador acordes al cambio aprobadas; rendimiento medido contra objetivos acordados.
- Interfaz adaptable, operable con teclado, con estados de carga, vacío y error.
- Sin defectos bloqueantes ni secretos expuestos; recuperación definida para cambios persistentes.
- Revisión y retrospectiva registradas; commits con la identidad del usuario y sin coautores.

## Decisiones de producto pendientes

Confirmar materias piloto y revisión académica, reglas de ELO y torneos, país y privacidad, push, proveedor de IA y políticas comerciales. Tienda con monedas virtuales; Plus inicialmente web con un proveedor. OCR y pagos nativos móviles requieren alcance y estimación propios. Configurar staging y pruebas de pago no equivale a publicar producción ni efectuar cobros reales.
