# Sprint 3 Preferencias académicas y avatar inicial

Guardar nivel educativo, materias y avatar gratuito desde un onboarding que puede retomarse.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 1](SPRINT-1.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-23 | Definir tabla de niveles educativos (secundaria/universidad/oposición) | 4 | Backend |
| RSY-24 | Definir catálogo de materias predefinidas | 5 | Backend |
| RSY-25 | Construir selector de nivel (single-select) | 4 | Frontend |
| RSY-26 | Construir selector de materias (multi-select) | 5 | Frontend |
| RSY-27 | Implementar PATCH de perfil para actualizar nivel/materias | 8 | Backend |
| RSY-29 | Diseñar al menos 6 combinaciones gratuitas | 6 | Diseño y frontend |
| RSY-30 | Exportar assets optimizados para web/móvil | 4 | Diseño y frontend |
| RSY-31 | Construir carrusel/selector de combinaciones | 6 | Frontend |
| RSY-32 | Guardar selección al finalizar onboarding | 4 | Frontend |
| RSY-33 | Agregar campo de avatar al modelo de usuario | 4 | Backend |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

## Subtareas asociadas

| Padre | Subtarea existente propuesta |
| --- | --- |
| RSY-27 | Versionar contrato de preferencias para los consumidores |

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Un nivel y varias materias compatibles se validan en servidor y persisten tras recarga.
2. PATCH modifica solo el perfil propio y devuelve errores concretos para IDs inválidos o inactivos.
3. Al menos seis combinaciones gratuitas tienen referencia estable, assets optimizados y selección accesible por teclado y móvil.
4. RSY-28 se acepta en Sprint 6 al existir matchmaking; RSY-34 se programa en Sprint 11 cuando perfil, duelo y ranking estén disponibles.

## Criterios de las tareas originales

### RSY-23

- Catálogo incluye secundaria, universidad y oposición.
- IDs estables y estado activo.
- Cambios no invalidan perfiles previos.

### RSY-24

- Cada materia tiene ID único y niveles compatibles.
- No se muestran materias inactivas.
- Evitar duplicados.

### RSY-25

- Solo un nivel seleccionable.
- Validación de selección requerida.
- Valor se conserva al navegar.

### RSY-26

- Permitir múltiples materias compatibles con el nivel.
- Rechazar IDs inválidos.
- Conservar selecciones al volver.

### RSY-27

- Actualizar solo perfil propio.
- Validar nivel y materias conjuntamente.
- Respuesta devuelve preferencias persistidas.

### RSY-29

- Entregar al menos 6 combinaciones gratuitas identificadas.
- Licencia de uso registrada.
- Diseño consistente en tamaños pequeños.

### RSY-30

- Assets con dimensiones y peso documentados.
- Transparencia correcta.
- Comprobar visualización en web y móvil.

### RSY-31

- Mostrar combinaciones disponibles y selección actual.
- Interacción táctil y teclado.
- Vista previa coincide con catálogo.

### RSY-32

- Persistir avatar seleccionado en perfil propio.
- Recarga conserva elección.
- Error ofrece reintento.

### RSY-33

- Guardar referencia estable al catálogo.
- Migrar perfiles existentes con avatar por defecto.
- Rechazar cosméticos no disponibles.

## Decisiones antes de iniciar

Catálogo inicial y relación nivel/materia; obligatoriedad de selecciones; seis combinaciones de avatar y licencias de los assets.

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

Catálogos o assets sin aprobación pueden bloquear la experiencia; usar un conjunto pequeño aprobado sin inventar materias como definitivas.

Si la capacidad no alcanza: Reducir variedad de materias manteniendo un catálogo compatible; no recortar las seis combinaciones exigidas por RSY-29.

## Demostración de cierre

Completar onboarding, volver a entrar, cambiar preferencias y verificar persistencia y rechazo de una materia incompatible.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
