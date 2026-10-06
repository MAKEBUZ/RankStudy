# Plan general de sprints de RankStudy

El backlog se organiza en 23 sprints, incluido el Sprint 1 existente: 22 planes restantes de dos semanas y 60 horas de capacidad propuesta por sprint. El recorrido prioriza identidad, contenido y duelo individual antes de añadir funciones sociales, instituciones, IA y monetización.

Los Sprints 2 a 22 cubren el trabajo original restante. Sprint 23 propone preparación de lanzamiento y recuperación de cuenta, que no estaban en el backlog original. Este orden conserva el stack acordado: Next.js, React, TypeScript y Tailwind CSS, API NestJS, PostgreSQL y Socket.IO para tiempo real.

## Capacidad y horizonte

Hipótesis de una persona con 6 horas efectivas al día: 50 horas de entrega, 6 de integración/revisión y 4 de reserva por sprint. El Sprint 1 conserva su distribución propia de 50, 6 y 4. Responsables, fechas y capacidad real se confirman en planning.

Los 22 sprints restantes representan 1100 horas de entrega y 1320 horas de capacidad incluyendo integración y reserva, o 44 semanas nominales con ejecución consecutiva. Con Sprint 1, el horizonte nominal suma 46 semanas y 1380 horas. No es una fecha de entrega: excluye festivos, ausencias, espera de terceros, cambios de alcance y correcciones superiores a la reserva. Reestimar el horizonte cada dos sprints; no convertir estas hipótesis en compromiso fijo.

## Secuencia propuesta

| Sprint | Objetivo | Tareas originales | Horas de entrega | Prerrequisitos |
| --- | --- | --- | --- | --- |
| [1](SPRINT-1.md) | Registro y verificación de correo | 8 de cierre propuesto y 2 parciales | 50 | Revisión de aceptación |
| [2](SPRINT-2.md) | Acceso con Google y Apple | RSY-12, RSY-13, RSY-14, RSY-18, RSY-19, RSY-21 | 50 | 1 |
| [3](SPRINT-3.md) | Preferencias académicas y avatar inicial | RSY-23, RSY-24, RSY-25, RSY-26, RSY-27, RSY-29, RSY-30, RSY-31, RSY-32, RSY-33 | 50 | 1 |
| [4](SPRINT-4.md) | Banco académico y moderación docente | RSY-81, RSY-82, RSY-83, RSY-84, RSY-85, RSY-86, RSY-87, RSY-88 | 50 | 1, 3 |
| [5](SPRINT-5.md) | Calibración y ELO inicial | RSY-35, RSY-36, RSY-37, RSY-38, RSY-39 | 50 | 3, 4 |
| [6](SPRINT-6.md) | Matchmaking y conexión en tiempo real | RSY-40, RSY-41, RSY-42, RSY-43, RSY-44, RSY-45, RSY-46, RSY-28 | 50 | 3, 4, 5 |
| [7](SPRINT-7.md) | Motor de duelo individual | RSY-47, RSY-48, RSY-49, RSY-50, RSY-52 | 50 | 4, 6 |
| [8](SPRINT-8.md) | Resultado de duelo y progresión por ELO | RSY-65, RSY-66, RSY-67, RSY-68, RSY-69, RSY-70, RSY-71, RSY-72, RSY-51 | 50 | 5, 7 |
| [9](SPRINT-9.md) | Repaso y desempeño personal | RSY-62, RSY-63, RSY-64, RSY-94, RSY-95, RSY-96, RSY-97 | 50 | 7, 8 |
| [10](SPRINT-10.md) | Retos directos y grupos privados | RSY-58, RSY-59, RSY-60, RSY-61, RSY-100, RSY-101, RSY-102 | 50 | 8 |
| [11](SPRINT-11.md) | Clasificaciones y avatar compartido | RSY-77, RSY-78, RSY-79, RSY-80, RSY-34 | 50 | 3, 8, 10 |
| [12](SPRINT-12.md) | Duelos grupales | RSY-53, RSY-54, RSY-55, RSY-56, RSY-57 | 50 | 7, 8 |
| [13](SPRINT-13.md) | Torneos y seguimiento en vivo | RSY-110, RSY-111, RSY-112 | 50 | 8, 12 |
| [14](SPRINT-14.md) | Misiones monedas y rachas | RSY-103, RSY-104, RSY-105, RSY-106, RSY-107, RSY-108, RSY-109 | 50 | 8, 9 |
| [15](SPRINT-15.md) | Temporadas y recompensas | RSY-73, RSY-74, RSY-75, RSY-76 | 50 | 8, 14 |
| [16](SPRINT-16.md) | Tienda y propiedad de cosméticos | RSY-120, RSY-121, RSY-122 | 50 | 3, 14 |
| [17](SPRINT-17.md) | Cursos e instituciones | RSY-123, RSY-124, RSY-125, RSY-126, RSY-127 | 50 | 4, 10, 11 |
| [18](SPRINT-18.md) | Bancos por curso y reportes | RSY-128, RSY-129, RSY-130, RSY-98, RSY-99 | 50 | 4, 7, 9, 17 |
| [19](SPRINT-19.md) | Torneo de aula y proyección | RSY-131, RSY-132, RSY-133 | 50 | 12, 13, 17, 18 |
| [20](SPRINT-20.md) | Generación de preguntas desde apuntes | RSY-89, RSY-90, RSY-91, RSY-92, RSY-93 | 50 | 4, 18 |
| [21](SPRINT-21.md) | Cuota gratuita y checkout de Plus | RSY-113, RSY-114, RSY-115, RSY-117 | 50 | 8 |
| [22](SPRINT-22.md) | Ciclo de suscripción y pruebas de pago | RSY-116, RSY-118, RSY-119 | 50 | 21 |
| [23](SPRINT-23.md) | Preparación de lanzamiento | 5 tareas PL nuevas propuestas | 50 | 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22 |

## Hitos de producto

- Sprint 5: onboarding, contenido curado y calibración disponibles en un piloto limitado.
- Sprint 8: recorrido 1v1 con resultado y ELO; candidato a beta privada tras aceptación. El motor del Sprint 7 por sí solo no cierra el recorrido.
- Sprint 11: repaso, desempeño, grupos, retos y clasificaciones compartidas.
- Sprint 16: juego grupal, torneos, misiones, temporadas y tienda con moneda virtual.
- Sprint 19: cursos, bancos, exportaciones y torneo de aula.
- Sprint 20: generación asistida bajo revisión humana.
- Sprint 22: ciclo Plus probado en sandbox. No equivale a autorización para cobrar en producción.
- Sprint 23: candidato de lanzamiento validado en staging; publicación sujeta a decisión del responsable.

## Dependencias que cambian la secuencia

RSY-28 se valida en Sprint 6 porque necesita matchmaking; RSY-34 se cierra en Sprint 11 cuando ya existen las tres superficies de avatar. RSY-98 y RSY-99 esperan los cursos de Sprint 17. RSY-77 espera los grupos de Sprint 10 y contiene el dato de país necesario para sus filtros. RSY-131 espera torneos, cursos y bancos.

RSY-102 necesita una consulta privada de ranking en Sprint 10; no depende del endpoint público futuro de RSY-77. Esta corrección elimina la dependencia circular de la propuesta inicial. RSY-51 espera el cálculo ELO de Sprint 8; la pantalla final no se declara completa con el motor de Sprint 7.

RSY-18 y RSY-19 tienen dos tramos: correo en Sprint 1 y OAuth en Sprint 2, con cierre completo en Sprint 2. Las demás tareas originales tienen un único sprint principal de cierre.

## Cobertura y subtareas

La [matriz de cobertura](COBERTURA-BACKLOG.md) asigna las 125 tareas originales y las 28 subtareas propuestas del CSV. Las 8 épicas son agrupaciones y no horas de trabajo adicionales. Se reservan cinco referencias PL para el lanzamiento y una para reconciliación de tienda; no son claves Jira existentes.

Las subtareas permanecen con su padre y sus horas ya están incluidas. No volver a crearlas si fueron importadas. Conservar las claves asignadas por Jira al identificar sus títulos. Las cuatro subtareas complementarias del planning inicial del Sprint 1 siguen contenidas en aquel documento.

## Definicion comun de terminado

- Criterios funcionales y negativos demostrados y aceptados por el responsable.
- Cambios de API y datos documentados; migraciones reproducibles y recuperación definida cuando afecten datos persistidos.
- Pruebas de dominio, integración y navegador acordes al cambio aprobadas; rendimiento comparado con umbrales fijados antes de medir.
- Interfaz usable con teclado y en tamaños móvil/escritorio; estados de carga, vacío y error tratados.
- Autorización validada en servidor y sin exposición de secretos en respuestas o logs.
- Sin defectos que bloqueen el objetivo del sprint; los restantes tienen impacto y seguimiento explícitos.
- Commit atribuido al usuario, sin coautores, y evidencia de validación junto a las tareas.

## Gestión del planning

Al empezar cada sprint, revisar lo aceptado del anterior, capacidad real, servicios externos y decisiones listadas. Ajustar las horas con quienes harán el trabajo. El alcance futuro es propuesto: solo comprometer el sprint próximo.

Si un bloque no cabe, dividirlo en un incremento verificable y desplazar los dependientes. Un cambio de orden debe actualizar tanto los planes individuales como la matriz. La reserva absorbe defectos, no funcionalidad nueva. No marcar completado un sprint por tener su documento creado.

## Alcances que requieren acuerdo

La primera versión usa materias piloto y cantidades de contenido acordadas, un formato de torneo y un modo grupal aprobados. La tienda usa monedas virtuales. Checkout Plus se planifica inicialmente para web con un proveedor; una integración nativa de tiendas móviles requiere confirmar alcance y estimación antes de considerar completa RSY-115. OCR no está incluido en extracción de PDF con texto.

País, push, evidencias docentes, políticas de pago y proveedor de IA se deciden en los sprints correspondientes. No se inventan valores comerciales ni claves de terceros. Revisar estos puntos antes de confirmar la hoja de ruta completa.

## Referencia de trabajo

Backlog revisado de RankStudy: 161 registros, con 8 épicas, 125 tareas y 28 subtareas propuestas. Las claves y títulos originales se conservan en la matriz. Estos documentos son planificación; no crean sprints ni modifican estados en Jira.
