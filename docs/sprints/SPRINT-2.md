# Sprint 2 Acceso con Google y Apple

Crear y vincular cuentas con Google y Apple y completar las tres opciones de registro.

Estado: plan propuesto, pendiente de estimación y aceptación del equipo. La planificación no implica implementación ni cierre en Jira.

## Entrada y dependencias

Requiere las entregas aceptadas de [Sprint 1](SPRINT-1.md). Revisar contratos, migraciones y criterios de las tareas antes de comprometer el sprint.

## Duración y capacidad

Dos semanas o diez días laborables efectivos. Hipótesis: una persona con 6 horas efectivas diarias, 60 horas en total. Se proponen 50 horas de entrega, 6 de integración, documentación y revisión, y 4 de reserva para defectos. Las pruebas específicas de cada tarea están incluidas en sus horas; la integración valida el conjunto.

Fechas y responsables nominales por confirmar. Los perfiles no representan personas asignadas. Las estimaciones son hipótesis de esfuerzo y no horas ya invertidas; reestimar tras conocer la velocidad y el alcance definitivo.

## Backlog y esfuerzo propuesto

| Incidencia | Trabajo | Horas | Perfil responsable |
| --- | --- | --- | --- |
| RSY-12 | Configurar credenciales OAuth en las consolas de Google y Apple | 8 | Backend |
| RSY-13 | Implementar el flujo de login social y creación de cuenta vinculada | 16 | Backend |
| RSY-14 | Probar el flujo end-to-end en ambos proveedores | 8 | Backend |
| RSY-18 | Diseñar la UI con las 3 opciones de registro | 6 | Frontend |
| RSY-19 | Conectar formulario a los endpoints de backend | 6 | Frontend |
| RSY-21 | Medir el tiempo de registro end-to-end (<60s) | 6 | QA y desarrollo |
| Transversal | Integración, documentación, revisión y retrospectiva | 6 | Desarrollo y QA |
| Reserva | Corrección de defectos e incertidumbre | 4 | Desarrollo |
| Total | Capacidad propuesta | 60 | Por asignar |

RSY-18 y RSY-19 tienen trabajo parcial de correo en Sprint 1. Estas horas estiman solo OAuth pendiente; el cierre completo se propone aquí.

## Subtareas asociadas

Sin subtareas adicionales identificadas en el CSV para este grupo. Desglosar dentro de las tareas si el equipo lo necesita.

Reutilizar por título y padre si estas subtareas ya fueron importadas. Sus claves nuevas no se conocen en el CSV de origen. Están incluidas en las horas del padre y no suman capacidad adicional.

## Criterios de aceptación del incremento

1. Validar state, nonce, firma y destinatario de los tokens en servidor; el rechazo del consentimiento no crea cuentas parciales.
2. Vincular una identidad existente exige prueba de titularidad; no fusionar cuentas solo por coincidencia de email.
3. RSY-18 y RSY-19 completan aquí el alcance OAuth pendiente; se conserva la funcionalidad de correo del Sprint 1.
4. Medir cada proveedor con inicio y fin definidos, muestra y entorno registrados; informar separadamente la espera de correo y resolver cualquier incumplimiento del objetivo <60 s.

## Criterios de las tareas originales

### RSY-12

- Redirect URI por entorno y proveedor.
- Secretos fuera del código.
- Configuración reproducible documentada.

### RSY-13

- Validar identidad del proveedor en servidor.
- Evitar cuentas duplicadas.
- Vinculación requiere prueba de titularidad.

### RSY-14

- Probar Google y Apple: éxito, rechazo de consentimiento y callback inválido.
- Comprobar identidad y sesión resultante.

### RSY-18

- Mostrar email/contraseña, Google y Apple.
- Navegación por teclado.
- Mensajes y estados de carga definidos.

### RSY-19

- Enviar datos al contrato acordado.
- Gestionar carga y éxito.
- Impedir envíos duplicados.

### RSY-21

- Medir inicio y fin con eventos definidos.
- Registrar entorno y muestra.
- Reportar cumplimiento de <60 s y aclarar si incluye entrega del correo.

## Decisiones antes de iniciar

Credenciales y dominios de callback; cuentas de prueba para ambos proveedores; política de vinculación con cuenta existente; criterio exacto de medición menor de 60 segundos.

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

Apple puede exigir configuración de dominio y cuenta de desarrollador. Sin acceso real a ambos proveedores, RSY-14 no se cierra con mocks.

Si la capacidad no alcanza: Posponer RSY-21 si el acceso a proveedores consume la reserva; conservar el objetivo como pendiente y no declarar completas las tres opciones.

## Demostración de cierre

Registrar una cuenta por cada proveedor, rechazar consentimiento y repetir el acceso con una cuenta ya vinculada; presentar la medición de registro.

Adjuntar resultados de pruebas y escenarios fallidos relevantes; no marcar terminado un ítem sin su criterio completo. Aplicar la [definición común de terminado](PLAN-GENERAL.md#definicion-comun-de-terminado).

## Seguimiento en Jira

Agrupar bajo las épicas originales, asignar tareas al sprint y mantener subtareas ligadas al padre. No añadir épicas como trabajo ejecutable. Las dependencias propuestas son referencias para refinar, no enlaces Blocks creados automáticamente.

Las tareas que se pospongan conservan estado pendiente y se reasignan tras revisar capacidad. Ningún archivo de este plan cambia el tablero ni crea sprints en Jira.
