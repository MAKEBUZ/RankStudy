# Cobertura del backlog por sprint

Cada tarea original tiene un sprint principal de cierre propuesto. RSY-18 y RSY-19 conservan el tramo parcial de correo del Sprint 1 y completan OAuth en Sprint 2. La asignación no indica ejecución ni cierre real en Jira.

## Tareas originales

| Clave | Título original | Sprint principal | Nota |
| --- | --- | --- | --- |
| RSY-9 | Diseñar el modelo de usuario y tabla de credenciales | [1](SPRINT-1.md) | Base implementada; aceptación pendiente |
| RSY-10 | Implementar hashing seguro de contraseña (bcrypt/argon2) | [1](SPRINT-1.md) | Base implementada; aceptación pendiente |
| RSY-11 | Escribir pruebas unitarias del endpoint | [1](SPRINT-1.md) | Base implementada; aceptación pendiente |
| RSY-12 | Configurar credenciales OAuth en las consolas de Google y Apple | [2](SPRINT-2.md) | Plan propuesto |
| RSY-13 | Implementar el flujo de login social y creación de cuenta vinculada | [2](SPRINT-2.md) | Plan propuesto |
| RSY-14 | Probar el flujo end-to-end en ambos proveedores | [2](SPRINT-2.md) | Plan propuesto |
| RSY-15 | Generar y enviar token de verificación por correo | [1](SPRINT-1.md) | Base implementada; aceptación pendiente |
| RSY-16 | Implementar endpoint de validación de token | [1](SPRINT-1.md) | Base implementada; aceptación pendiente |
| RSY-17 | Bloquear acceso a funciones PvP hasta verificar el email | [1](SPRINT-1.md) | Base implementada; aceptación pendiente |
| RSY-18 | Diseñar la UI con las 3 opciones de registro | [2](SPRINT-2.md) | Correo parcial en S1; OAuth y cierre en S2 |
| RSY-19 | Conectar formulario a los endpoints de backend | [2](SPRINT-2.md) | Correo parcial en S1; OAuth y cierre en S2 |
| RSY-20 | Manejar y mostrar errores de validación | [1](SPRINT-1.md) | Base implementada; aceptación pendiente |
| RSY-21 | Medir el tiempo de registro end-to-end (<60s) | [2](SPRINT-2.md) | Plan propuesto |
| RSY-22 | Probar casos límite (email duplicado, contraseña débil) | [1](SPRINT-1.md) | Base implementada; aceptación pendiente |
| RSY-23 | Definir tabla de niveles educativos (secundaria/universidad/oposición) | [3](SPRINT-3.md) | Plan propuesto |
| RSY-24 | Definir catálogo de materias predefinidas | [3](SPRINT-3.md) | Plan propuesto |
| RSY-25 | Construir selector de nivel (single-select) | [3](SPRINT-3.md) | Plan propuesto |
| RSY-26 | Construir selector de materias (multi-select) | [3](SPRINT-3.md) | Plan propuesto |
| RSY-27 | Implementar PATCH de perfil para actualizar nivel/materias | [3](SPRINT-3.md) | Plan propuesto |
| RSY-28 | Validar que los cambios se reflejen en matchmaking y contenido | [6](SPRINT-6.md) | Plan propuesto |
| RSY-29 | Diseñar al menos 6 combinaciones gratuitas | [3](SPRINT-3.md) | Plan propuesto |
| RSY-30 | Exportar assets optimizados para web/móvil | [3](SPRINT-3.md) | Plan propuesto |
| RSY-31 | Construir carrusel/selector de combinaciones | [3](SPRINT-3.md) | Plan propuesto |
| RSY-32 | Guardar selección al finalizar onboarding | [3](SPRINT-3.md) | Plan propuesto |
| RSY-33 | Agregar campo de avatar al modelo de usuario | [3](SPRINT-3.md) | Plan propuesto |
| RSY-34 | Exponer el avatar en perfil, ranking y pantalla de duelo | [11](SPRINT-11.md) | Plan propuesto |
| RSY-35 | Curar 10-15 preguntas por materia con dificultad etiquetada | [5](SPRINT-5.md) | Plan propuesto |
| RSY-36 | Implementar fórmula de ELO inicial según aciertos/dificultad | [5](SPRINT-5.md) | Plan propuesto |
| RSY-37 | Definir ELO por defecto para quienes saltan el test | [5](SPRINT-5.md) | Plan propuesto |
| RSY-38 | Construir la UI del test con opción de saltar | [5](SPRINT-5.md) | Plan propuesto |
| RSY-39 | Mostrar resultado y ELO asignado al finalizar | [5](SPRINT-5.md) | Plan propuesto |
| RSY-40 | Definir la lógica de rango ± configurable | [6](SPRINT-6.md) | Plan propuesto |
| RSY-41 | Implementar ampliación de rango tras timeout | [6](SPRINT-6.md) | Plan propuesto |
| RSY-42 | Montar infraestructura de WebSockets | [6](SPRINT-6.md) | Plan propuesto |
| RSY-43 | Implementar timeout de 15s con fallback | [6](SPRINT-6.md) | Plan propuesto |
| RSY-44 | Construir UI de "buscando rival" con animación de espera | [6](SPRINT-6.md) | Plan propuesto |
| RSY-45 | Implementar botón de cancelar búsqueda | [6](SPRINT-6.md) | Plan propuesto |
| RSY-46 | Simular usuarios concurrentes en la cola de matchmaking | [6](SPRINT-6.md) | Plan propuesto |
| RSY-47 | Sincronizar preguntas y respuestas entre ambos jugadores | [7](SPRINT-7.md) | Plan propuesto |
| RSY-48 | Manejar desconexiones y reconexión | [7](SPRINT-7.md) | Plan propuesto |
| RSY-49 | Implementar puntuación por corrección + bonus de velocidad | [7](SPRINT-7.md) | Plan propuesto |
| RSY-50 | Construir temporizador visible y opciones de respuesta | [7](SPRINT-7.md) | Plan propuesto |
| RSY-51 | Construir pantalla de resultado con ganador y cambio de ELO | [8](SPRINT-8.md) | Plan propuesto |
| RSY-52 | Probar el duelo en condiciones de red variable | [7](SPRINT-7.md) | Plan propuesto |
| RSY-53 | Implementar sincronización de preguntas para todos los jugadores | [12](SPRINT-12.md) | Plan propuesto |
| RSY-54 | Implementar eliminación progresiva o ranking final | [12](SPRINT-12.md) | Plan propuesto |
| RSY-55 | Construir sala de espera con lista de jugadores | [12](SPRINT-12.md) | Plan propuesto |
| RSY-56 | Construir tabla de resultados en tiempo real | [12](SPRINT-12.md) | Plan propuesto |
| RSY-57 | Probar con el número máximo de jugadores simultáneos definido | [12](SPRINT-12.md) | Plan propuesto |
| RSY-58 | Generar enlace de invitación único | [10](SPRINT-10.md) | Plan propuesto |
| RSY-59 | Implementar búsqueda de usuario por nombre | [10](SPRINT-10.md) | Plan propuesto |
| RSY-60 | Implementar expiración automática a los 5 minutos | [10](SPRINT-10.md) | Plan propuesto |
| RSY-61 | Construir UI de envío de reto y notificación al receptor | [10](SPRINT-10.md) | Plan propuesto |
| RSY-62 | Exponer endpoint con preguntas, respuesta correcta y explicación | [9](SPRINT-9.md) | Plan propuesto |
| RSY-63 | Construir listado de preguntas con explicaciones | [9](SPRINT-9.md) | Plan propuesto |
| RSY-64 | Implementar función de guardado y acceso posterior desde perfil | [9](SPRINT-9.md) | Plan propuesto |
| RSY-65 | Implementar cálculo de ELO tras cada duelo, por materia | [8](SPRINT-8.md) | Plan propuesto |
| RSY-66 | Escribir pruebas unitarias de la fórmula | [8](SPRINT-8.md) | Plan propuesto |
| RSY-67 | Registrar cada variación de ELO con fecha y duelo asociado | [8](SPRINT-8.md) | Plan propuesto |
| RSY-68 | Construir gráfico de ELO en el tiempo en el perfil | [8](SPRINT-8.md) | Plan propuesto |
| RSY-69 | Diseñar mínimo 5 tramos de rango con insignia distinta | [8](SPRINT-8.md) | Plan propuesto |
| RSY-70 | Implementar lógica de rango según ELO actual | [8](SPRINT-8.md) | Plan propuesto |
| RSY-71 | Disparar notificación al subir o bajar de rango | [8](SPRINT-8.md) | Plan propuesto |
| RSY-72 | Mostrar insignia en perfil y notificación in-app | [8](SPRINT-8.md) | Plan propuesto |
| RSY-73 | Implementar job mensual de cierre de temporada | [15](SPRINT-15.md) | Plan propuesto |
| RSY-74 | Definir tabla de recompensas por rango alcanzado | [15](SPRINT-15.md) | Plan propuesto |
| RSY-75 | Implementar entrega automática de recompensas | [15](SPRINT-15.md) | Plan propuesto |
| RSY-76 | Construir pantalla de resumen con rango y recompensa obtenida | [15](SPRINT-15.md) | Plan propuesto |
| RSY-77 | Implementar filtros por ámbito (grupo/país/global) y materia | [11](SPRINT-11.md) | Plan propuesto |
| RSY-78 | Optimizar consultas para actualización casi en tiempo real | [11](SPRINT-11.md) | Plan propuesto |
| RSY-79 | Construir tabla con filtros interactivos | [11](SPRINT-11.md) | Plan propuesto |
| RSY-80 | Probar con gran volumen simulado de usuarios | [11](SPRINT-11.md) | Plan propuesto |
| RSY-81 | Definir esquema (materia, tema, dificultad, opciones, respuesta) | [4](SPRINT-4.md) | Plan propuesto |
| RSY-82 | Construir formulario de carga y edición de preguntas | [4](SPRINT-4.md) | Plan propuesto |
| RSY-83 | Bloquear guardado si falta materia, tema o dificultad | [4](SPRINT-4.md) | Plan propuesto |
| RSY-84 | Curar y cargar el set inicial de preguntas por materia | [4](SPRINT-4.md) | Plan propuesto |
| RSY-85 | Definir flujo de verificación (documento/institución) | [4](SPRINT-4.md) | Plan propuesto |
| RSY-86 | Implementar estados pendiente/aprobado/rechazado | [4](SPRINT-4.md) | Plan propuesto |
| RSY-87 | Construir formulario de carga para docentes | [4](SPRINT-4.md) | Plan propuesto |
| RSY-88 | Construir panel de moderación para administradores | [4](SPRINT-4.md) | Plan propuesto |
| RSY-89 | Definir prompt de generación de preguntas de opción múltiple | [20](SPRINT-20.md) | Plan propuesto |
| RSY-90 | Implementar llamada a la API y parseo de la respuesta | [20](SPRINT-20.md) | Plan propuesto |
| RSY-91 | Implementar extracción de texto desde PDF | [20](SPRINT-20.md) | Plan propuesto |
| RSY-92 | Construir UI de edición/aprobación de las preguntas generadas | [20](SPRINT-20.md) | Plan propuesto |
| RSY-93 | Revisar muestra de preguntas generadas por materia | [20](SPRINT-20.md) | Plan propuesto |
| RSY-94 | Calcular evolución de ELO y desglose de aciertos/fallos por tema | [9](SPRINT-9.md) | Plan propuesto |
| RSY-95 | Construir gráfico de evolución y tabla de desglose por tema | [9](SPRINT-9.md) | Plan propuesto |
| RSY-96 | Calcular tasa de error por tema y ordenar por prioridad | [9](SPRINT-9.md) | Plan propuesto |
| RSY-97 | Mostrar los temas recomendados en el dashboard principal | [9](SPRINT-9.md) | Plan propuesto |
| RSY-98 | Implementar exportación a CSV y PDF por curso/grupo | [18](SPRINT-18.md) | Plan propuesto |
| RSY-99 | Construir filtro de rango de fechas y botón de exportar | [18](SPRINT-18.md) | Plan propuesto |
| RSY-100 | Definir esquema de grupo y código de invitación | [10](SPRINT-10.md) | Plan propuesto |
| RSY-101 | Construir pantalla de crear grupo e ingresar con código | [10](SPRINT-10.md) | Plan propuesto |
| RSY-102 | Implementar ranking visible solo para miembros | [10](SPRINT-10.md) | Plan propuesto |
| RSY-103 | Implementar generación automática diaria/semanal | [14](SPRINT-14.md) | Plan propuesto |
| RSY-104 | Garantizar mínimo 3 misiones activas simultáneas | [14](SPRINT-14.md) | Plan propuesto |
| RSY-105 | Implementar entrega de monedas al completar misión | [14](SPRINT-14.md) | Plan propuesto |
| RSY-106 | Construir listado de misiones activas con progreso | [14](SPRINT-14.md) | Plan propuesto |
| RSY-107 | Implementar lógica de incremento/reinicio diario de racha | [14](SPRINT-14.md) | Plan propuesto |
| RSY-108 | Programar notificación antes de perder la racha | [14](SPRINT-14.md) | Plan propuesto |
| RSY-109 | Mostrar racha actual en el perfil | [14](SPRINT-14.md) | Plan propuesto |
| RSY-110 | Implementar registro al torneo con control de cupo | [13](SPRINT-13.md) | Plan propuesto |
| RSY-111 | Implementar lógica de bracket o tabla de resultados | [13](SPRINT-13.md) | Plan propuesto |
| RSY-112 | Construir pantalla de inscripción y visualización del torneo en curso | [13](SPRINT-13.md) | Plan propuesto |
| RSY-113 | Implementar límite configurable (ej. 5/día) por usuario gratuito | [21](SPRINT-21.md) | Plan propuesto |
| RSY-114 | Mostrar mensaje con CTA de upgrade al alcanzar el límite | [21](SPRINT-21.md) | Plan propuesto |
| RSY-115 | Integrar procesador de pago (tarjeta/plataforma móvil) | [21](SPRINT-21.md) | Plan propuesto |
| RSY-116 | Implementar activación inmediata tras confirmación de pago | [22](SPRINT-22.md) | Plan propuesto |
| RSY-117 | Construir pantalla de checkout | [21](SPRINT-21.md) | Plan propuesto |
| RSY-118 | Construir pantalla de gestión/cancelación de suscripción | [22](SPRINT-22.md) | Plan propuesto |
| RSY-119 | Probar pagos exitosos, fallidos y reembolsos en sandbox | [22](SPRINT-22.md) | Plan propuesto |
| RSY-120 | Cargar mínimo 10 ítems cosméticos con precio | [16](SPRINT-16.md) | Plan propuesto |
| RSY-121 | Construir vitrina con vista previa antes de comprar | [16](SPRINT-16.md) | Plan propuesto |
| RSY-122 | Implementar lógica de compra y aplicación del cosmético | [16](SPRINT-16.md) | Plan propuesto |
| RSY-123 | Definir esquema de curso, docente responsable y estudiantes | [17](SPRINT-17.md) | Plan propuesto |
| RSY-124 | Implementar carga vía CSV | [17](SPRINT-17.md) | Plan propuesto |
| RSY-125 | Implementar enlace de invitación autogenerado | [17](SPRINT-17.md) | Plan propuesto |
| RSY-126 | Construir panel de gestión de cursos para administradores | [17](SPRINT-17.md) | Plan propuesto |
| RSY-127 | Implementar ranking interno visible solo dentro del curso | [17](SPRINT-17.md) | Plan propuesto |
| RSY-128 | Implementar selector entre banco propio o público | [18](SPRINT-18.md) | Plan propuesto |
| RSY-129 | Filtrar preguntas de duelo según banco asignado al curso | [18](SPRINT-18.md) | Plan propuesto |
| RSY-130 | Construir UI del selector en el panel institucional | [18](SPRINT-18.md) | Plan propuesto |
| RSY-131 | Implementar inicio y cierre de torneo controlado por el docente | [19](SPRINT-19.md) | Plan propuesto |
| RSY-132 | Construir vista de resultados en tiempo real para pantalla grande | [19](SPRINT-19.md) | Plan propuesto |
| RSY-133 | Simular un torneo de aula completo de principio a fin | [19](SPRINT-19.md) | Plan propuesto |

## Subtareas propuestas del CSV

Estas 28 filas no incluían Issue Key nuevo. Se identifican por título y padre, sin fabricar claves. Su sprint sigue al padre y sus horas no se suman por separado.

| Padre | Subtarea | Sprint |
| --- | --- | --- |
| RSY-9 | Implementar creación transaccional de cuenta y endpoint de registro | [1](SPRINT-1.md) |
| RSY-15 | Definir vencimiento y reenvío seguro de verificación | [1](SPRINT-1.md) |
| RSY-27 | Versionar contrato de preferencias para los consumidores | [3](SPRINT-3.md) |
| RSY-36 | Acordar parámetros y ejemplos de calibración inicial | [5](SPRINT-5.md) |
| RSY-43 | Definir fallback y resolver carreras al vencer la espera | [6](SPRINT-6.md) |
| RSY-47 | Diseñar máquina de estados y contrato de eventos del duelo | [7](SPRINT-7.md) |
| RSY-48 | Definir abandono y recuperación de sesión | [7](SPRINT-7.md) |
| RSY-49 | Validar tiempos de respuesta sin confiar en el cliente | [7](SPRINT-7.md) |
| RSY-62 | Probar autorización y ocultamiento de respuestas durante duelo | [9](SPRINT-9.md) |
| RSY-65 | Asegurar actualización atómica e idempotente del ELO | [8](SPRINT-8.md) |
| RSY-73 | Definir calendario y recuperación del cierre de temporada | [15](SPRINT-15.md) |
| RSY-81 | Agregar versión y trazabilidad de preguntas utilizadas | [4](SPRINT-4.md) |
| RSY-86 | Registrar auditoría de publicación y revisión de contenido | [4](SPRINT-4.md) |
| RSY-90 | Controlar entradas, validación y coste de generación asistida | [20](SPRINT-20.md) |
| RSY-91 | Validar archivos y limpiar temporales de extracción | [20](SPRINT-20.md) |
| RSY-94 | Definir métricas y excluir resultados incompletos | [9](SPRINT-9.md) |
| RSY-98 | Verificar privacidad y coherencia de exportaciones | [18](SPRINT-18.md) |
| RSY-107 | Acordar día de corte y actividad que mantiene racha | [14](SPRINT-14.md) |
| RSY-110 | Probar inscripción concurrente al último cupo | [13](SPRINT-13.md) |
| RSY-113 | Definir y probar consumo concurrente de cuota diaria | [21](SPRINT-21.md) |
| RSY-115 | Procesar webhooks firmados y reconciliar pagos | [21](SPRINT-21.md) |
| RSY-118 | Definir efectos de cancelación y reembolso sobre beneficios | [22](SPRINT-22.md) |
| RSY-122 | Probar atomicidad de compra y propiedad del cosmético | [16](SPRINT-16.md) |
| RSY-123 | Definir matriz de roles y aislamiento institucional | [17](SPRINT-17.md) |
| RSY-124 | Agregar prevalidación y reporte de errores de carga masiva | [17](SPRINT-17.md) |
| RSY-125 | Gestionar revocación y vencimiento de invitaciones de curso | [17](SPRINT-17.md) |
| RSY-128 | Validar banco utilizable antes de iniciar torneo | [18](SPRINT-18.md) |
| RSY-132 | Recuperar vista de proyección tras interrupción de red | [19](SPRINT-19.md) |

## Trabajo adicional propuesto

Las referencias PL son locales; no existen como incidencias Jira por crear este documento.

| Referencia local | Trabajo | Sprint | Horas propuestas |
| --- | --- | --- | --- |
| PL-S16-01 | Reconciliar movimientos de monedero e inventario y probar fallos de compra | [16](SPRINT-16.md) | 10 |
| PL-S23-01 | Recuperación de contraseña con token de un solo uso y revocación de sesiones | [23](SPRINT-23.md) | 12 |
| PL-S23-02 | Entorno de staging con HTTPS y configuración de secretos | [23](SPRINT-23.md) | 10 |
| PL-S23-03 | Backup y prueba de restauración de PostgreSQL | [23](SPRINT-23.md) | 8 |
| PL-S23-04 | Regresión de recorridos completos y corrección de bloqueantes | [23](SPRINT-23.md) | 12 |
| PL-S23-05 | Guía operativa y limpieza programada de sesiones y tokens vencidos | [23](SPRINT-23.md) | 8 |

## Agrupación por épica

Las épicas RSY-1 a RSY-8 mantienen los padres originales. No se crean épicas nuevas ni se asignan épicas enteras al sprint como sustitución de sus tareas. Una épica puede cruzar varios sprints.

## Control de cobertura

125 tareas originales cubiertas, 0 omitidas y 0 con más de un sprint principal; 28 subtareas asociadas al padre y 6 tareas adicionales propuestas. Hay 2 arrastres parciales explícitos de Sprint 1 a Sprint 2. Cada sprint restante suma 50 horas de entrega más 6 de integración y 4 de reserva.
