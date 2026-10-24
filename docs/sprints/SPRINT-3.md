# Sprint 3: Torneos, recompensas y cursos

## Objetivo

La plataforma ofrece juego grupal y torneos, recompensas y tienda virtual, y cursos con acceso controlado.

## Capacidad y alcance

Propuesta de dos semanas, sin fechas ni responsables nominales confirmados. 27 tareas originales; 300 h de entrega, 36 h de integración y documentación, 24 h de reserva: **360 h totales**. Equivale aritméticamente a 6 personas con 60 h efectivas por sprint; las dependencias y especialidades deben validarse antes de comprometer el alcance. Las horas de subtareas ya están incluidas en su padre.

Entrada: aceptar las entregas requeridas de los sprints anteriores y confirmar capacidad y servicios externos.

## Backlog y estimaciones

| Incidencia | Entrega | Horas propuestas |
| --- | --- | --- |
| RSY-53 | Implementar sincronización de preguntas para todos los jugadores | 14 |
| RSY-54 | Implementar eliminación progresiva o ranking final | 10 |
| RSY-55 | Construir sala de espera con lista de jugadores | 10 |
| RSY-56 | Construir tabla de resultados en tiempo real | 8 |
| RSY-57 | Probar con el número máximo de jugadores simultáneos definido | 8 |
| RSY-110 | Implementar registro al torneo con control de cupo | 16 |
| RSY-111 | Implementar lógica de bracket o tabla de resultados | 18 |
| RSY-112 | Construir pantalla de inscripción y visualización del torneo en curso | 16 |
| RSY-103 | Implementar generación automática diaria/semanal | 9 |
| RSY-104 | Garantizar mínimo 3 misiones activas simultáneas | 5 |
| RSY-105 | Implementar entrega de monedas al completar misión | 9 |
| RSY-106 | Construir listado de misiones activas con progreso | 7 |
| RSY-107 | Implementar lógica de incremento/reinicio diario de racha | 8 |
| RSY-108 | Programar notificación antes de perder la racha | 7 |
| RSY-109 | Mostrar racha actual en el perfil | 5 |
| RSY-73 | Implementar job mensual de cierre de temporada | 18 |
| RSY-74 | Definir tabla de recompensas por rango alcanzado | 8 |
| RSY-75 | Implementar entrega automática de recompensas | 16 |
| RSY-76 | Construir pantalla de resumen con rango y recompensa obtenida | 8 |
| RSY-120 | Cargar mínimo 10 ítems cosméticos con precio | 10 |
| RSY-121 | Construir vitrina con vista previa antes de comprar | 12 |
| RSY-122 | Implementar lógica de compra y aplicación del cosmético | 18 |
| RSY-123 | Definir esquema de curso, docente responsable y estudiantes | 12 |
| RSY-124 | Implementar carga vía CSV | 12 |
| RSY-125 | Implementar enlace de invitación autogenerado | 7 |
| RSY-126 | Construir panel de gestión de cursos para administradores | 11 |
| RSY-127 | Implementar ranking interno visible solo dentro del curso | 8 |
| PL-S3-01 | Reconciliar movimientos de monedero e inventario y probar fallos de compra | 10 |

Las referencias PL son propuestas locales, sin clave Jira asignada. RSY-18 y RSY-19 incluyen aquí la suma del tramo de correo y el de OAuth; no se duplican como incidencias.

## Secuencia y criterios de aceptación

### 1. Duelos grupales

Jugar partidas con varios participantes desde un lobby hasta una clasificación final consistente.

Decisiones antes de iniciar: Cupo máximo; modo eliminación o ranking final; desempates, abandono y política ELO grupal. Por defecto no usar la fórmula 1v1 sin validarla.

- Lobby controla cupo y participantes; pregunta y plazo son comunes y autorizados.
- Modo elegido tiene regla explícita de eliminación o resultado final y desempates.
- Tabla en vivo coincide con servidor y no duplica jugadores ni puntajes al reconectar.
- Prueba al máximo acordado y por encima del cupo verifica rendimiento y rechazo del excedente.
- El ELO grupal queda desactivado salvo regla académica aprobada y probada; no se reutiliza accidentalmente el cierre 1v1.

Demostración: Llenar la sala, rechazar una entrada extra, jugar, reconectar un cliente y mostrar un cierre único.

Riesgo: El cupo afecta arquitectura y prueba; fijarlo antes de implementar, y no declarar escalabilidad sin evidencia.

Ajuste si falta capacidad: Entregar un solo modo aprobado; el segundo se replanifica si no cabe.

### 2. Torneos y seguimiento en vivo

Inscribir participantes con cupo y ejecutar un torneo con fases y resultados visibles.

Decisiones antes de iniciar: Bracket o tabla, reglas para participantes impares, ausencias, desempate y registro/cierre; modalidad de juego 1v1 o grupal.

- Inscripción reserva cupo atómicamente; solicitudes repetidas o simultáneas por última plaza no exceden el máximo.
- Elegir un formato aprobado y documentar avance, empates y ausencias; reejecución no reconstruye resultados distintos.
- La UI muestra inscripción propia, cupo y fase actual con actualizaciones autorizadas.
- Inicio, avance y finalización producen resultados únicos y auditables.

Demostración: Inscribir usuarios, competir por el último cupo, iniciar torneo, completar fases y consultar resultado final.

Riesgo: Bracket y ranking son formatos distintos; no comprometer ambos con 18 h sin una nueva estimación.

Ajuste si falta capacidad: Seleccionar un único formato de torneo; mantener el flujo completo.

### 3. Misiones monedas y rachas

Mantener misiones activas y rachas y acreditar monedas por progreso verificado.

Decisiones antes de iniciar: Actividades válidas, zona horaria y día de corte; catálogo de misiones; reglas de saldo; consentimiento y canal de recordatorios.

- Generación diaria/semanal idempotente mantiene al menos tres misiones activas y con vigencia.
- Monedas se acreditan una sola vez por misión mediante transacción y registro de movimientos.
- Racha aumenta a lo sumo una vez por día válido y se reinicia conforme al corte aprobado.
- Recordatorio push respeta consentimiento y horario silencioso, no se duplica; gestionar permiso denegado y suscripción vencida.
- Pantallas muestran progreso y saldo reales. La habilitación Web Push y sus credenciales están incluidas en RSY-108.

Demostración: Completar misión, repetir evento sin duplicar monedas y simular cambio de día con y sin actividad.

Riesgo: Push añade configuración de navegador y servicio. Sin entrega comprobada en el navegador soportado, RSY-108 queda pendiente.

Ajuste si falta capacidad: Posponer recordatorio push si su habilitación consume capacidad; registrar RSY-108 como arrastre explícito.

### 4. Temporadas y recompensas

Cerrar temporadas mensuales con reinicio parcial y entrega única de recompensas.

Decisiones antes de iniciar: Calendario y zona horaria; fórmula de reinicio; tabla de recompensas por rango y elegibilidad; tratamiento de duelos que cruzan el cierre.

- Job mensual guarda checkpoint y permite recuperación; reejecución no reinicia ELO ni entrega premios dos veces.
- Recompensas aprobadas usan monedas ya existentes; cosméticos de temporada solo se habilitan tras disponer del catálogo.
- Cierre coordina con duelos en curso y conserva historial antes/después.
- Resumen muestra rango final y recompensa realmente otorgada, con tratamiento de errores.

Demostración: Simular cierre, interrumpir una entrega y reanudar; verificar exactamente un premio por usuario/temporada.

Riesgo: Cruce de partidas con cierre y fallos parciales; definir corte transaccional y probar recuperación antes de programar cron real.

Ajuste si falta capacidad: Reducir variedad de recompensas, sin recortar recuperación o historial.

### 5. Tienda y propiedad de cosméticos

Comprar y aplicar cosméticos usando monedas virtuales con inventario consistente.

Decisiones antes de iniciar: Al menos diez ítems, precios en moneda virtual y licencias; política de propiedad/duplicados; relación entre combinaciones y cosméticos.

- Catálogo contiene al menos diez ítems con precio y referencia estable; vista previa coincide con la aplicación.
- Servidor valida precio, saldo y propiedad; débito y entrega son atómicos e idempotentes.
- No puede aplicarse un ítem ajeno ni producir saldo negativo mediante compras concurrentes.
- Movimientos del monedero e inventario se reconcilian. La moneda virtual no implica compra con dinero real en este sprint.

Demostración: Comprar, repetir solicitud, simular fallo de persistencia y aplicar un cosmético propio sin afectar otra cuenta.

Riesgo: Confundir moneda virtual con pagos reales ampliaría el alcance. Pagos de Plus se planifican en Sprints 21 y 22.

Ajuste si falta capacidad: Reducir efectos visuales y filtros; mantener diez ítems, atomicidad y propiedad.

### 6. Cursos e instituciones

Gestionar cursos, docentes y estudiantes con aislamiento entre instituciones.

Decisiones antes de iniciar: Roles administrativos/docentes, pertenencia y revocación; columnas CSV; importación parcial o atómica; TTL y usos de invitación.

- Modelo de institución/curso aplica matriz de permisos y prueba accesos cruzados por ID.
- Carga CSV tiene prevalidación, errores por fila y reintento sin duplicar estudiantes o membresías; no asigna privilegios por columnas manipuladas.
- Invitación liga al curso, vence y puede revocarse; no concede rol docente.
- Panel y ranking de curso solo son visibles a usuarios autorizados; retirar membresía corta acceso.

Demostración: Crear dos instituciones, importar estudiantes, invitar a un curso y demostrar rechazo de acceso desde la otra institución.

Riesgo: Modelo institucional y grupos sociales no son equivalentes; reutilizar utilidades sin confundir límites de acceso.

Ajuste si falta capacidad: Limitar tamaño de lote del piloto, sin omitir prevalidación y aislamiento.

## Organización de las dos semanas

Días 1 y 2: confirmar decisiones, contratos, datos y permisos; distribuir paquetes según dependencias. Días 3 a 7: implementar y validar incrementos en el orden indicado, permitiendo trabajo paralelo cuando no dependa de otro paquete. Días 8 y 9: integrar recorridos y resolver defectos. Día 10: demostrar criterios, revisar resultados y registrar retrospectiva. Esta secuencia es una hipótesis a contrastar con el equipo.

## Subtareas asociadas

| Padre | Subtarea del backlog |
| --- | --- |
| RSY-73 | Definir calendario y recuperación del cierre de temporada |
| RSY-107 | Acordar día de corte y actividad que mantiene racha |
| RSY-110 | Probar inscripción concurrente al último cupo |
| RSY-122 | Probar atomicidad de compra y propiedad del cosmético |
| RSY-123 | Definir matriz de roles y aislamiento institucional |
| RSY-124 | Agregar prevalidación y reporte de errores de carga masiva |
| RSY-125 | Gestionar revocación y vencimiento de invitaciones de curso |

Reutilizar las subtareas ya importadas y sus claves asignadas. Desglosar cada tarea adicional PL en contrato/datos, implementación y validación dentro de sus horas, sin duplicar estimaciones.

## Condición de cierre

Aceptar los criterios de cada paquete y adjuntar evidencia; pruebas pertinentes aprobadas, permisos verificados en servidor, interfaz accesible y documentación actualizada. Resolver defectos bloqueantes. Los recortes se registran como pendientes y desplazan sus dependientes; no se declara completo un sprint por crear este documento.
