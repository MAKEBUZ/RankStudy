# Sprint 10 Retos directos y grupos privados

Invitar a un amigo a duelo y organizar grupos con clasificación privada.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 8](SPRINT-8.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-58 | Generar enlace de invitación único | 6 | Backend |
| RSY-59 | Implementar búsqueda de usuario por nombre | 6 | Backend |
| RSY-60 | Implementar expiración automática a los 5 minutos | 4 | Backend |
| RSY-61 | Construir UI de envío de reto y notificación al receptor | 8 | Frontend |
| RSY-100 | Definir esquema de grupo y código de invitación | 9 | Backend |
| RSY-101 | Construir pantalla de crear grupo e ingresar con código | 9 | Frontend |
| RSY-102 | Implementar ranking visible solo para miembros | 8 | Backend |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

## Subtareas asociadas

Sin subtareas adicionales identificadas en el CSV para este grupo. Desglosar dentro de las tareas si el equipo lo necesita.

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Reto usa token impredecible de un solo uso y vence a los cinco minutos; carrera aceptación/expiración no crea dos salas.
2. Búsqueda paginada por nombre evita exponer correo u otros datos privados.
3. Crear/unirse al grupo valida código y evita duplicar membresía; salir o ser retirado revoca acceso.
4. Ranking de grupo funciona con consulta interna autorizada; filtros públicos y optimización llegan en Sprint 11.

## Criterios de las tareas originales

### RSY-58

- Enlace con token impredecible ligado al reto.
- Destinatario y estado verificados.
- Consumo de un solo uso.

### RSY-59

- Búsqueda autenticada y paginada por nombre.
- Excluir datos privados.
- Controlar consultas abusivas.

### RSY-60

- Invitación deja de ser aceptable a los 5 minutos.
- Validar vencimiento en servidor.
- Carrera aceptación/expiración resuelta.

### RSY-61

- Enviar, aceptar o rechazar con estados visibles.
- Mostrar expiración.
- No iniciar dos duelos por doble clic.

### RSY-100

- Grupo con ID, membresías, roles y código único.
- Ciclo de vida de invitación definido.
- Integridad de pertenencia.

### RSY-101

- Crear grupo y unirse con código válido.
- Informar inválido/vencido.
- Unión repetida no duplica membresía.

### RSY-102

- Solo miembros consultan ranking interno.
- Revocación de membresía corta acceso.
- Orden estable.

## Decisiones antes de iniciar

Códigos de grupo, rol de dueño y expulsión; política de descubrimiento por nombre; aceptación y expiración de retos.

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

La recomendación antigua enlazaba ranking interno con endpoint público posterior. Se implementa aquí su consulta mínima y se reutiliza en RSY-77, sin una dependencia circular.

Si la capacidad no alcanza: Reducir búsqueda avanzada y personalización del grupo; mantener invitaciones y privacidad.

## Demostración de cierre

Invitar a un amigo, aceptar una vez, entrar a un grupo y comprobar que una cuenta ajena no ve su ranking.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
