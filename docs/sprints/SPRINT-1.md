# Sprint 1: Bases, onboarding y contenido académico

## Objetivo

Un estudiante se registra, configura su perfil y obtiene un ELO inicial sobre contenido revisado.

## Capacidad y alcance

Propuesta de dos semanas, sin fechas ni responsables nominales confirmados. 37 tareas originales; 250 h de entrega, 30 h de integración y documentación, 20 h de reserva: **300 h totales**. Equivale aritméticamente a 5 personas con 60 h efectivas por sprint; las dependencias y especialidades deben validarse antes de comprometer el alcance. Las horas de subtareas ya están incluidas en su padre.

Registro, perfil, avatares, banco, moderación y calibración están implementados y validados localmente. OAuth tiene integración preparada y requiere credenciales y pruebas reales. El piloto académico necesita aprobación. Consultar el [estado por tarea y evidencia actual](ESTADO-SPRINT-1.md); el sprint no se declara cerrado sin esas aceptaciones.

## Backlog y estimaciones

| Incidencia | Entrega | Horas propuestas |
| --- | --- | --- |
| RSY-9 | Diseñar el modelo de usuario y tabla de credenciales | 8 |
| RSY-10 | Implementar hashing seguro de contraseña (bcrypt/argon2) | 3 |
| RSY-11 | Escribir pruebas unitarias del endpoint | 5 |
| RSY-15 | Generar y enviar token de verificación por correo | 6 |
| RSY-16 | Implementar endpoint de validación de token | 4 |
| RSY-17 | Bloquear acceso a funciones PvP hasta verificar el email | 5 |
| RSY-18 | Diseñar la UI con las 3 opciones de registro | 11 |
| RSY-19 | Conectar formulario a los endpoints de backend | 12 |
| RSY-20 | Manejar y mostrar errores de validación | 3 |
| RSY-22 | Probar casos límite (email duplicado, contraseña débil) | 5 |
| RSY-12 | Configurar credenciales OAuth en las consolas de Google y Apple | 8 |
| RSY-13 | Implementar el flujo de login social y creación de cuenta vinculada | 16 |
| RSY-14 | Probar el flujo end-to-end en ambos proveedores | 8 |
| RSY-21 | Medir el tiempo de registro end-to-end (<60s) | 6 |
| RSY-23 | Definir tabla de niveles educativos (secundaria/universidad/oposición) | 4 |
| RSY-24 | Definir catálogo de materias predefinidas | 5 |
| RSY-25 | Construir selector de nivel (single-select) | 4 |
| RSY-26 | Construir selector de materias (multi-select) | 5 |
| RSY-27 | Implementar PATCH de perfil para actualizar nivel/materias | 8 |
| RSY-29 | Diseñar al menos 6 combinaciones gratuitas | 6 |
| RSY-30 | Exportar assets optimizados para web/móvil | 4 |
| RSY-31 | Construir carrusel/selector de combinaciones | 6 |
| RSY-32 | Guardar selección al finalizar onboarding | 4 |
| RSY-33 | Agregar campo de avatar al modelo de usuario | 4 |
| RSY-81 | Definir esquema (materia, tema, dificultad, opciones, respuesta) | 7 |
| RSY-82 | Construir formulario de carga y edición de preguntas | 8 |
| RSY-83 | Bloquear guardado si falta materia, tema o dificultad | 4 |
| RSY-84 | Curar y cargar el set inicial de preguntas por materia | 7 |
| RSY-85 | Definir flujo de verificación (documento/institución) | 6 |
| RSY-86 | Implementar estados pendiente/aprobado/rechazado | 7 |
| RSY-87 | Construir formulario de carga para docentes | 5 |
| RSY-88 | Construir panel de moderación para administradores | 6 |
| RSY-35 | Curar 10-15 preguntas por materia con dificultad etiquetada | 14 |
| RSY-36 | Implementar fórmula de ELO inicial según aciertos/dificultad | 12 |
| RSY-37 | Definir ELO por defecto para quienes saltan el test | 4 |
| RSY-38 | Construir la UI del test con opción de saltar | 12 |
| RSY-39 | Mostrar resultado y ELO asignado al finalizar | 8 |


Las referencias PL son propuestas locales, sin clave Jira asignada. RSY-18 y RSY-19 incluyen aquí la suma del tramo de correo y el de OAuth; no se duplican como incidencias.

## Secuencia y criterios de aceptación

### 1. Registro por correo y verificación

Crear cuentas por correo, verificar identidad y proteger el acceso.

Decisiones antes de iniciar: Conservar los contratos y controles documentados en API y arquitectura.

- Registro transaccional, contraseña Argon2id y correo único normalizado.
- Verificación temporal de un solo uso, reenvío limitado y sesión protegida.
- Validar errores, permisos, teclado y recorrido completo.

Demostración: Registrar, verificar, iniciar y cerrar sesión; rechazar tokens usados y acceso sin verificar.

Riesgo: La evidencia existente cubre este incremento, no todo el nuevo Sprint 1.

Ajuste si falta capacidad: Conservar el flujo integrado de correo.

### 2. Acceso con Google y Apple

Crear y vincular cuentas con Google y Apple y completar las tres opciones de registro.

Decisiones antes de iniciar: Credenciales y dominios de callback; cuentas de prueba para ambos proveedores; política de vinculación con cuenta existente; criterio exacto de medición menor de 60 segundos.

- Validar state, nonce, firma y destinatario de los tokens en servidor; el rechazo del consentimiento no crea cuentas parciales.
- Vincular una identidad existente exige prueba de titularidad; no fusionar cuentas solo por coincidencia de email.
- RSY-18 y RSY-19 completan aquí el alcance OAuth pendiente; se conserva la funcionalidad de correo del Sprint 1.
- Medir cada proveedor con inicio y fin definidos, muestra y entorno registrados; informar separadamente la espera de correo y resolver cualquier incumplimiento del objetivo <60 s.

Demostración: Registrar una cuenta por cada proveedor, rechazar consentimiento y repetir el acceso con una cuenta ya vinculada; presentar la medición de registro.

Riesgo: Apple puede exigir configuración de dominio y cuenta de desarrollador. Sin acceso real a ambos proveedores, RSY-14 no se cierra con mocks.

Ajuste si falta capacidad: Posponer RSY-21 si el acceso a proveedores consume la reserva; conservar el objetivo como pendiente y no declarar completas las tres opciones.

### 3. Preferencias académicas y avatar inicial

Guardar nivel educativo, materias y avatar gratuito desde un onboarding que puede retomarse.

Decisiones antes de iniciar: Catálogo inicial y relación nivel/materia; obligatoriedad de selecciones; seis combinaciones de avatar y licencias de los assets.

- Un nivel y varias materias compatibles se validan en servidor y persisten tras recarga.
- PATCH modifica solo el perfil propio y devuelve errores concretos para IDs inválidos o inactivos.
- Al menos seis combinaciones gratuitas tienen referencia estable, assets optimizados y selección accesible por teclado y móvil.
- RSY-28 se acepta en Sprint 2 al existir matchmaking; RSY-34 se programa en Sprint 2 cuando perfil, duelo y ranking estén disponibles.

Demostración: Completar onboarding, volver a entrar, cambiar preferencias y verificar persistencia y rechazo de una materia incompatible.

Riesgo: Catálogos o assets sin aprobación pueden bloquear la experiencia; usar un conjunto pequeño aprobado sin inventar materias como definitivas.

Ajuste si falta capacidad: Reducir variedad de materias manteniendo un catálogo compatible; no recortar las seis combinaciones exigidas por RSY-29.

### 4. Banco académico y moderación docente

Disponer de preguntas aprobadas y versionadas y un flujo docente con revisión administrativa.

Decisiones antes de iniciar: Materias piloto y cantidad inicial; rúbrica académica; evidencia mínima docente y retención; matriz de permisos y alta administrativa controlada.

- Modelo y validaciones incluyen materia, tema, dificultad, opciones, una respuesta correcta y explicación.
- Solo preguntas aprobadas entran en juegos; pendiente, aprobado y rechazado tienen transiciones autorizadas y auditadas.
- Docente y administrador no pueden atribuirse permisos desde el cliente; implementar roles y bootstrap administrativo como parte de RSY-85/86.
- El set inicial se revisa por materia, registra fuente/licencia y preserva versión de las preguntas usadas.

Demostración: Enviar una pregunta como docente, rechazarla con motivo, corregirla, aprobarla y comprobar su disponibilidad para consumo.

Riesgo: La curación depende de disponibilidad de revisión académica. Limitar materias piloto antes de fijar cantidades, no aprobar contenido sin revisar.

Ajuste si falta capacidad: Reducir el número de materias piloto aprobado; conservar revisión y permisos en todos los casos.

### 5. Calibración y ELO inicial

Asignar un ELO inicial por materia mediante un test opcional o un valor por defecto aprobado.

Decisiones antes de iniciar: Fórmula y límites del ELO inicial; valor por defecto; tratamiento de preguntas omitidas; materias piloto y número de preguntas entre 10 y 15 por materia.

- Cada materia piloto dispone de 10 a 15 preguntas de calibración con dificultad y explicación revisadas.
- Resultado determinista con ejemplos calculados independientemente; saltar asigna un valor explícito y no deja ELO nulo.
- Doble envío no duplica calibración ni modifica resultados ya aceptados sin una política de recalibración.
- Pantalla de resultado coincide con ELO persistido y permite continuar al perfil.

Demostración: Terminar el test y mostrar ELO por materia; repetir con otra cuenta que lo omite y comprobar el valor por defecto.

Riesgo: El esfuerzo de curación crece con las materias. Si el conjunto no cabe en 14 h, reducir materias piloto o reestimar, sin comprimir la revisión.

Ajuste si falta capacidad: Reducir materias piloto; mantener test opcional, persistencia y cálculo probado.

## Organización de las dos semanas

Días 1 y 2: confirmar decisiones, contratos, datos y permisos; distribuir paquetes según dependencias. Días 3 a 7: implementar y validar incrementos en el orden indicado, permitiendo trabajo paralelo cuando no dependa de otro paquete. Días 8 y 9: integrar recorridos y resolver defectos. Día 10: demostrar criterios, revisar resultados y registrar retrospectiva. Esta secuencia es una hipótesis a contrastar con el equipo.

## Subtareas asociadas

| Padre | Subtarea del backlog |
| --- | --- |
| RSY-9 | Implementar creación transaccional de cuenta y endpoint de registro |
| RSY-15 | Definir vencimiento y reenvío seguro de verificación |
| RSY-27 | Versionar contrato de preferencias para los consumidores |
| RSY-36 | Acordar parámetros y ejemplos de calibración inicial |
| RSY-81 | Agregar versión y trazabilidad de preguntas utilizadas |
| RSY-86 | Registrar auditoría de publicación y revisión de contenido |

Reutilizar las subtareas ya importadas y sus claves asignadas. Desglosar cada tarea adicional PL en contrato/datos, implementación y validación dentro de sus horas, sin duplicar estimaciones.

## Condición de cierre

Aceptar los criterios de cada paquete y adjuntar evidencia; pruebas pertinentes aprobadas, permisos verificados en servidor, interfaz accesible y documentación actualizada. Resolver defectos bloqueantes. Los recortes se registran como pendientes y desplazan sus dependientes; no se declara completo un sprint por crear este documento.

## Desglose técnico del registro existente

Conservar bajo RSY-9 la creación transaccional y documentación de contrato/migración; bajo RSY-15 el vencimiento y reenvío seguro; bajo RSY-17 la identidad mínima y restricción de acceso; bajo RSY-19 la confirmación y reenvío; bajo RSY-22 el recorrido integrado. Reutilizar el trabajo y las subtareas existentes. Las decisiones vigentes están en [API](../API.md) y [arquitectura](../ARQUITECTURA.md).
