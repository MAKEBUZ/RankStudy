# Sprint 4: Herramientas docentes, IA, Plus y lanzamiento

## Objetivo

Los docentes gestionan bancos y torneos de aula; IA y Plus funcionan con controles y el candidato de lanzamiento puede operarse y recuperarse.

## Capacidad y alcance

El alcance se amplía con [materiales personales, estudio con IA y aprobación en dos instancias](../ESTUDIO-CON-IA.md). El módulo debe admitir estudiantes además de docentes. Las tareas IA-01 a IA-08 definen entregas y criterios; las que extienden tareas originales se integran en ellas para evitar duplicados. Las horas de la línea base que sigue deben reestimarse antes de comprometer esta ampliación.

Propuesta de dos semanas, sin fechas ni responsables nominales confirmados. 20 tareas originales; 300 h de entrega, 36 h de integración y documentación, 24 h de reserva: **360 h totales**. Equivale aritméticamente a 6 personas con 60 h efectivas por sprint; las dependencias y especialidades deben validarse antes de comprometer el alcance. Las horas de subtareas ya están incluidas en su padre.

Entrada: aceptar las entregas requeridas de los sprints anteriores y confirmar capacidad y servicios externos.

## Backlog y estimaciones

| Incidencia | Entrega | Horas propuestas |
| --- | --- | --- |
| RSY-128 | Implementar selector entre banco propio o público | 9 |
| RSY-129 | Filtrar preguntas de duelo según banco asignado al curso | 10 |
| RSY-130 | Construir UI del selector en el panel institucional | 7 |
| RSY-98 | Implementar exportación a CSV y PDF por curso/grupo | 16 |
| RSY-99 | Construir filtro de rango de fechas y botón de exportar | 8 |
| RSY-131 | Implementar inicio y cierre de torneo controlado por el docente | 18 |
| RSY-132 | Construir vista de resultados en tiempo real para pantalla grande | 16 |
| RSY-133 | Simular un torneo de aula completo de principio a fin | 16 |
| RSY-89 | Definir prompt de generación de preguntas de opción múltiple | 8 |
| RSY-90 | Implementar llamada a la API y parseo de la respuesta | 13 |
| RSY-91 | Implementar extracción de texto desde PDF | 11 |
| RSY-92 | Construir UI de edición/aprobación de las preguntas generadas | 10 |
| RSY-93 | Revisar muestra de preguntas generadas por materia | 8 |
| RSY-113 | Implementar límite configurable (ej. 5/día) por usuario gratuito | 12 |
| RSY-114 | Mostrar mensaje con CTA de upgrade al alcanzar el límite | 7 |
| RSY-115 | Integrar procesador de pago (tarjeta/plataforma móvil) | 20 |
| RSY-117 | Construir pantalla de checkout | 11 |
| RSY-116 | Implementar activación inmediata tras confirmación de pago | 14 |
| RSY-118 | Construir pantalla de gestión/cancelación de suscripción | 18 |
| RSY-119 | Probar pagos exitosos, fallidos y reembolsos en sandbox | 18 |
| PL-S4-01 | Recuperación de contraseña con token de un solo uso y revocación de sesiones | 12 |
| PL-S4-02 | Entorno de staging con HTTPS y configuración de secretos | 10 |
| PL-S4-03 | Backup y prueba de restauración de PostgreSQL | 8 |
| PL-S4-04 | Regresión de recorridos completos y corrección de bloqueantes | 12 |
| PL-S4-05 | Guía operativa y limpieza programada de sesiones y tokens vencidos | 8 |

Las referencias PL son propuestas locales, sin clave Jira asignada. RSY-18 y RSY-19 incluyen aquí la suma del tramo de correo y el de OAuth; no se duplican como incidencias.

## Secuencia y criterios de aceptación

### 1. Bancos por curso y reportes

Asignar bancos autorizados a cursos y exportar desempeño filtrado en CSV y PDF.

Decisiones antes de iniciar: Propiedad del banco institucional y visibilidad pública; mínimo de preguntas; intervalos y zona horaria de reportes; campos de exportación.

- Curso selecciona banco propio o público autorizado; banco sin preguntas suficientes impide iniciar partida con motivo visible.
- Duelo fija banco/versiones al iniciar; cambio posterior no altera partida activa ni mezcla instituciones.
- CSV y PDF coinciden en fechas, materias y totales; filtros inclusivos/exclusivos se documentan.
- Docente solo exporta cursos permitidos; textos CSV se neutralizan frente a fórmulas de hoja de cálculo.

Demostración: Asignar banco propio, jugar con su contenido y exportar un periodo; comparar totales y rechazar curso ajeno.

Riesgo: RSY-129 necesita contexto de curso en la sesión de duelo; incluirlo en el contrato y en las pruebas de aislamiento.

Ajuste si falta capacidad: Simplificar diseño del PDF; conservar ambos formatos y filtros funcionales.

### 2. Torneo de aula y proyección

Permitir al docente ejecutar un torneo de aula y proyectar resultados en vivo.

Decisiones antes de iniciar: Modalidad, cupo, quién inicia/cierra y nombres visibles en proyección; control de desconexión de la pantalla.

- Solo docente autorizado controla inicio/cierre; se valida banco, curso, cupo e inscripciones.
- Proyección está autorizada y respeta visibilidad aprobada; no ofrece acceso público por URL predecible.
- Reconexión recupera snapshot sin filas ni puntos repetidos.
- Simulación completa incluye docente, estudiantes, preguntas, resultados y cierre único.

Demostración: Ejecutar torneo de aula completo, desconectar proyección, reconectar y cerrar con resumen consistente.

Riesgo: La pantalla compartida puede revelar nombres fuera del curso; aplicar la política de visibilidad antes de la demostración.

Ajuste si falta capacidad: Limitar variedad de vistas para pantalla grande; mantener el flujo completo y recuperación.

### 3. Generación de preguntas desde apuntes

Crear borradores de preguntas desde texto o PDF para revisión docente antes de publicar.

Decisiones antes de iniciar: Proveedor y modelo, presupuesto y cuotas; tamaño/páginas de PDF; tratamiento de PDF escaneado; rúbrica académica y uso de apuntes autorizados.

- Entrada es contenido, no instrucciones ejecutables; salida se valida por esquema y reglas académicas.
- Timeout, fallos, límites y gasto están controlados; no se exponen credenciales ni documentos entre usuarios.
- Extracción valida tipo, tamaño y texto legible y elimina temporales; PDF sin texto informa limitación de OCR.
- Preguntas siempre quedan pendientes hasta revisión humana; la muestra por materia se evalúa con rúbrica y criterios aprobados.

Demostración: Subir texto y PDF, revisar y corregir una pregunta, aprobarla al banco autorizado y rechazar un archivo inválido.

Riesgo: La generación puede producir respuestas erróneas; la revisión académica es parte de la entrega, no una tarea opcional posterior.

Ajuste si falta capacidad: Entregar PDF con texto seleccionable; OCR se excluye y se registra como evolución propuesta.

### 4. Cuota gratuita y checkout de Plus

Aplicar cuota gratuita y crear pagos de suscripción en sandbox sin activar beneficios por acciones del cliente.

Decisiones antes de iniciar: Proveedor y entorno sandbox; precio, moneda, impuestos y condiciones comerciales por aprobar; qué duelo consume cuota y cuándo se devuelve.

- Cuota diaria configurable se consume atómicamente en servidor y tiene zona horaria definida; concurrencia no supera el límite.
- UI comunica agotamiento y renovación; CTA abre checkout con precio y moneda aprobados.
- Servidor determina importe y valida firma de webhooks, IDs de evento y estados duplicados/desordenados.
- Se persiste estado del pago. Activación, cancelación y reembolso se completan en Sprint 4; no se habilita cobro público todavía.

Demostración: Agotar cuota con solicitudes simultáneas y crear un pago sandbox; comprobar rechazo de webhook sin firma.

Riesgo: Un checkout sin ciclo de suscripción completo no debe usarse con dinero real; mantener sandbox hasta aceptar Sprint 4.

Ajuste si falta capacidad: Elegir un único proveedor y canal web; integración específica de tiendas móviles queda pendiente de confirmación de alcance.

### 5. Ciclo de suscripción y pruebas de pago

Activar, mantener y cancelar Plus según el estado verificado del proveedor y probar reembolsos.

Decisiones antes de iniciar: Vigencia al cancelar, renovación, impago, reembolso y revocación de beneficios; reconciliación con proveedor; política comercial aprobada.

- Activación ocurre tras confirmación autenticada del proveedor, una sola vez; pago fallido no concede beneficios.
- Reconciliar eventos fuera de orden con estado del proveedor; renovación e impago no dejan permisos incoherentes.
- UI muestra plan, próximo cobro, cancelación y fecha efectiva de fin de beneficios.
- Sandbox cubre éxito, fallo, duplicados, reembolso, cancelación y reintento; sin transacciones reales.

Demostración: Pagar en sandbox, activar Plus, repetir webhook, cancelar y reembolsar y comprobar permisos y cuota resultantes.

Riesgo: El proveedor entrega eventos repetidos y no siempre ordenados; persistir IDs y registrar fallos recuperables.

Ajuste si falta capacidad: No recortar casos de pago; replanificar el sprint si no cabe la validación del ciclo completo.

### 6. Preparación de lanzamiento

Preparar un candidato de lanzamiento que pueda operarse, recuperarse y validarse en staging.

Decisiones antes de iniciar: Alcance del lanzamiento; hosting, dominio y SMTP; objetivos operativos, responsables de soporte y criterios de rollback.

- Recuperación no permite enumerar cuentas y usa enlace temporal de un solo uso; cambiar contraseña revoca sesiones según política definida.
- Staging usa HTTPS y servicios reales de prueba; secretos fuera de Git y cookies Secure verificadas.
- Backup restaurado en base aislada y procedimiento de rollback demostrado.
- Recorridos aceptados pasan regresión; bloqueantes corregidos; documentación permite arranque y recuperación por otra persona.
- Publicar producción requiere decisión explícita del responsable; este plan no autoriza despliegues ni cobros reales.

Demostración: Recuperar una cuenta, restaurar backup en entorno aislado y ejecutar el recorrido integrado sobre staging.

Riesgo: Estas son tareas adicionales propuestas y aún no tienen clave Jira. Si despliegue o correcciones superan el presupuesto, reestimar antes de fijar fecha de lanzamiento.

Ajuste si falta capacidad: Reducir alcance del lanzamiento manteniendo integridad de datos y recuperación; no usar la reserva para agregar funciones.

## Organización de las dos semanas

Días 1 y 2: confirmar decisiones, contratos, datos y permisos; distribuir paquetes según dependencias. Días 3 a 7: implementar y validar incrementos en el orden indicado, permitiendo trabajo paralelo cuando no dependa de otro paquete. Días 8 y 9: integrar recorridos y resolver defectos. Día 10: demostrar criterios, revisar resultados y registrar retrospectiva. Esta secuencia es una hipótesis a contrastar con el equipo.

## Subtareas asociadas

| Padre | Subtarea del backlog |
| --- | --- |
| RSY-90 | Controlar entradas, validación y coste de generación asistida |
| RSY-91 | Validar archivos y limpiar temporales de extracción |
| RSY-98 | Verificar privacidad y coherencia de exportaciones |
| RSY-113 | Definir y probar consumo concurrente de cuota diaria |
| RSY-115 | Procesar webhooks firmados y reconciliar pagos |
| RSY-118 | Definir efectos de cancelación y reembolso sobre beneficios |
| RSY-128 | Validar banco utilizable antes de iniciar torneo |
| RSY-132 | Recuperar vista de proyección tras interrupción de red |

Reutilizar las subtareas ya importadas y sus claves asignadas. Desglosar cada tarea adicional PL en contrato/datos, implementación y validación dentro de sus horas, sin duplicar estimaciones.

## Condición de cierre

Aceptar los criterios de cada paquete y adjuntar evidencia; pruebas pertinentes aprobadas, permisos verificados en servidor, interfaz accesible y documentación actualizada. Resolver defectos bloqueantes. Los recortes se registran como pendientes y desplazan sus dependientes; no se declara completo un sprint por crear este documento.
