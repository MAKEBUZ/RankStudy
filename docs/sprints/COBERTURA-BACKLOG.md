# Cobertura del backlog en cuatro sprints

Asignación propuesta de cierre, sin modificar estados Jira. Las 8 épicas conservan sus relaciones originales.

## Tareas originales

| Clave | Título original | Sprint principal |
| --- | --- | --- |
| RSY-9 | Diseñar el modelo de usuario y tabla de credenciales | [1](SPRINT-1.md) |
| RSY-10 | Implementar hashing seguro de contraseña (bcrypt/argon2) | [1](SPRINT-1.md) |
| RSY-11 | Escribir pruebas unitarias del endpoint | [1](SPRINT-1.md) |
| RSY-12 | Configurar credenciales OAuth en las consolas de Google y Apple | [1](SPRINT-1.md) |
| RSY-13 | Implementar el flujo de login social y creación de cuenta vinculada | [1](SPRINT-1.md) |
| RSY-14 | Probar el flujo end-to-end en ambos proveedores | [1](SPRINT-1.md) |
| RSY-15 | Generar y enviar token de verificación por correo | [1](SPRINT-1.md) |
| RSY-16 | Implementar endpoint de validación de token | [1](SPRINT-1.md) |
| RSY-17 | Bloquear acceso a funciones PvP hasta verificar el email | [1](SPRINT-1.md) |
| RSY-18 | Diseñar la UI con las 3 opciones de registro | [1](SPRINT-1.md) |
| RSY-19 | Conectar formulario a los endpoints de backend | [1](SPRINT-1.md) |
| RSY-20 | Manejar y mostrar errores de validación | [1](SPRINT-1.md) |
| RSY-21 | Medir el tiempo de registro end-to-end (<60s) | [1](SPRINT-1.md) |
| RSY-22 | Probar casos límite (email duplicado, contraseña débil) | [1](SPRINT-1.md) |
| RSY-23 | Definir tabla de niveles educativos (secundaria/universidad/oposición) | [1](SPRINT-1.md) |
| RSY-24 | Definir catálogo de materias predefinidas | [1](SPRINT-1.md) |
| RSY-25 | Construir selector de nivel (single-select) | [1](SPRINT-1.md) |
| RSY-26 | Construir selector de materias (multi-select) | [1](SPRINT-1.md) |
| RSY-27 | Implementar PATCH de perfil para actualizar nivel/materias | [1](SPRINT-1.md) |
| RSY-28 | Validar que los cambios se reflejen en matchmaking y contenido | [2](SPRINT-2.md) |
| RSY-29 | Diseñar al menos 6 combinaciones gratuitas | [1](SPRINT-1.md) |
| RSY-30 | Exportar assets optimizados para web/móvil | [1](SPRINT-1.md) |
| RSY-31 | Construir carrusel/selector de combinaciones | [1](SPRINT-1.md) |
| RSY-32 | Guardar selección al finalizar onboarding | [1](SPRINT-1.md) |
| RSY-33 | Agregar campo de avatar al modelo de usuario | [1](SPRINT-1.md) |
| RSY-34 | Exponer el avatar en perfil, ranking y pantalla de duelo | [2](SPRINT-2.md) |
| RSY-35 | Curar 10-15 preguntas por materia con dificultad etiquetada | [1](SPRINT-1.md) |
| RSY-36 | Implementar fórmula de ELO inicial según aciertos/dificultad | [1](SPRINT-1.md) |
| RSY-37 | Definir ELO por defecto para quienes saltan el test | [1](SPRINT-1.md) |
| RSY-38 | Construir la UI del test con opción de saltar | [1](SPRINT-1.md) |
| RSY-39 | Mostrar resultado y ELO asignado al finalizar | [1](SPRINT-1.md) |
| RSY-40 | Definir la lógica de rango ± configurable | [2](SPRINT-2.md) |
| RSY-41 | Implementar ampliación de rango tras timeout | [2](SPRINT-2.md) |
| RSY-42 | Montar infraestructura de WebSockets | [2](SPRINT-2.md) |
| RSY-43 | Implementar timeout de 15s con fallback | [2](SPRINT-2.md) |
| RSY-44 | Construir UI de "buscando rival" con animación de espera | [2](SPRINT-2.md) |
| RSY-45 | Implementar botón de cancelar búsqueda | [2](SPRINT-2.md) |
| RSY-46 | Simular usuarios concurrentes en la cola de matchmaking | [2](SPRINT-2.md) |
| RSY-47 | Sincronizar preguntas y respuestas entre ambos jugadores | [2](SPRINT-2.md) |
| RSY-48 | Manejar desconexiones y reconexión | [2](SPRINT-2.md) |
| RSY-49 | Implementar puntuación por corrección + bonus de velocidad | [2](SPRINT-2.md) |
| RSY-50 | Construir temporizador visible y opciones de respuesta | [2](SPRINT-2.md) |
| RSY-51 | Construir pantalla de resultado con ganador y cambio de ELO | [2](SPRINT-2.md) |
| RSY-52 | Probar el duelo en condiciones de red variable | [2](SPRINT-2.md) |
| RSY-53 | Implementar sincronización de preguntas para todos los jugadores | [3](SPRINT-3.md) |
| RSY-54 | Implementar eliminación progresiva o ranking final | [3](SPRINT-3.md) |
| RSY-55 | Construir sala de espera con lista de jugadores | [3](SPRINT-3.md) |
| RSY-56 | Construir tabla de resultados en tiempo real | [3](SPRINT-3.md) |
| RSY-57 | Probar con el número máximo de jugadores simultáneos definido | [3](SPRINT-3.md) |
| RSY-58 | Generar enlace de invitación único | [2](SPRINT-2.md) |
| RSY-59 | Implementar búsqueda de usuario por nombre | [2](SPRINT-2.md) |
| RSY-60 | Implementar expiración automática a los 5 minutos | [2](SPRINT-2.md) |
| RSY-61 | Construir UI de envío de reto y notificación al receptor | [2](SPRINT-2.md) |
| RSY-62 | Exponer endpoint con preguntas, respuesta correcta y explicación | [2](SPRINT-2.md) |
| RSY-63 | Construir listado de preguntas con explicaciones | [2](SPRINT-2.md) |
| RSY-64 | Implementar función de guardado y acceso posterior desde perfil | [2](SPRINT-2.md) |
| RSY-65 | Implementar cálculo de ELO tras cada duelo, por materia | [2](SPRINT-2.md) |
| RSY-66 | Escribir pruebas unitarias de la fórmula | [2](SPRINT-2.md) |
| RSY-67 | Registrar cada variación de ELO con fecha y duelo asociado | [2](SPRINT-2.md) |
| RSY-68 | Construir gráfico de ELO en el tiempo en el perfil | [2](SPRINT-2.md) |
| RSY-69 | Diseñar mínimo 5 tramos de rango con insignia distinta | [2](SPRINT-2.md) |
| RSY-70 | Implementar lógica de rango según ELO actual | [2](SPRINT-2.md) |
| RSY-71 | Disparar notificación al subir o bajar de rango | [2](SPRINT-2.md) |
| RSY-72 | Mostrar insignia en perfil y notificación in-app | [2](SPRINT-2.md) |
| RSY-73 | Implementar job mensual de cierre de temporada | [3](SPRINT-3.md) |
| RSY-74 | Definir tabla de recompensas por rango alcanzado | [3](SPRINT-3.md) |
| RSY-75 | Implementar entrega automática de recompensas | [3](SPRINT-3.md) |
| RSY-76 | Construir pantalla de resumen con rango y recompensa obtenida | [3](SPRINT-3.md) |
| RSY-77 | Implementar filtros por ámbito (grupo/país/global) y materia | [2](SPRINT-2.md) |
| RSY-78 | Optimizar consultas para actualización casi en tiempo real | [2](SPRINT-2.md) |
| RSY-79 | Construir tabla con filtros interactivos | [2](SPRINT-2.md) |
| RSY-80 | Probar con gran volumen simulado de usuarios | [2](SPRINT-2.md) |
| RSY-81 | Definir esquema (materia, tema, dificultad, opciones, respuesta) | [1](SPRINT-1.md) |
| RSY-82 | Construir formulario de carga y edición de preguntas | [1](SPRINT-1.md) |
| RSY-83 | Bloquear guardado si falta materia, tema o dificultad | [1](SPRINT-1.md) |
| RSY-84 | Curar y cargar el set inicial de preguntas por materia | [1](SPRINT-1.md) |
| RSY-85 | Definir flujo de verificación (documento/institución) | [1](SPRINT-1.md) |
| RSY-86 | Implementar estados pendiente/aprobado/rechazado | [1](SPRINT-1.md) |
| RSY-87 | Construir formulario de carga para docentes | [1](SPRINT-1.md) |
| RSY-88 | Construir panel de moderación para administradores | [1](SPRINT-1.md) |
| RSY-89 | Definir prompt de generación de preguntas de opción múltiple | [4](SPRINT-4.md) |
| RSY-90 | Implementar llamada a la API y parseo de la respuesta | [4](SPRINT-4.md) |
| RSY-91 | Implementar extracción de texto desde PDF | [4](SPRINT-4.md) |
| RSY-92 | Construir UI de edición/aprobación de las preguntas generadas | [4](SPRINT-4.md) |
| RSY-93 | Revisar muestra de preguntas generadas por materia | [4](SPRINT-4.md) |
| RSY-94 | Calcular evolución de ELO y desglose de aciertos/fallos por tema | [2](SPRINT-2.md) |
| RSY-95 | Construir gráfico de evolución y tabla de desglose por tema | [2](SPRINT-2.md) |
| RSY-96 | Calcular tasa de error por tema y ordenar por prioridad | [2](SPRINT-2.md) |
| RSY-97 | Mostrar los temas recomendados en el dashboard principal | [2](SPRINT-2.md) |
| RSY-98 | Implementar exportación a CSV y PDF por curso/grupo | [4](SPRINT-4.md) |
| RSY-99 | Construir filtro de rango de fechas y botón de exportar | [4](SPRINT-4.md) |
| RSY-100 | Definir esquema de grupo y código de invitación | [2](SPRINT-2.md) |
| RSY-101 | Construir pantalla de crear grupo e ingresar con código | [2](SPRINT-2.md) |
| RSY-102 | Implementar ranking visible solo para miembros | [2](SPRINT-2.md) |
| RSY-103 | Implementar generación automática diaria/semanal | [3](SPRINT-3.md) |
| RSY-104 | Garantizar mínimo 3 misiones activas simultáneas | [3](SPRINT-3.md) |
| RSY-105 | Implementar entrega de monedas al completar misión | [3](SPRINT-3.md) |
| RSY-106 | Construir listado de misiones activas con progreso | [3](SPRINT-3.md) |
| RSY-107 | Implementar lógica de incremento/reinicio diario de racha | [3](SPRINT-3.md) |
| RSY-108 | Programar notificación antes de perder la racha | [3](SPRINT-3.md) |
| RSY-109 | Mostrar racha actual en el perfil | [3](SPRINT-3.md) |
| RSY-110 | Implementar registro al torneo con control de cupo | [3](SPRINT-3.md) |
| RSY-111 | Implementar lógica de bracket o tabla de resultados | [3](SPRINT-3.md) |
| RSY-112 | Construir pantalla de inscripción y visualización del torneo en curso | [3](SPRINT-3.md) |
| RSY-113 | Implementar límite configurable (ej. 5/día) por usuario gratuito | [4](SPRINT-4.md) |
| RSY-114 | Mostrar mensaje con CTA de upgrade al alcanzar el límite | [4](SPRINT-4.md) |
| RSY-115 | Integrar procesador de pago (tarjeta/plataforma móvil) | [4](SPRINT-4.md) |
| RSY-116 | Implementar activación inmediata tras confirmación de pago | [4](SPRINT-4.md) |
| RSY-117 | Construir pantalla de checkout | [4](SPRINT-4.md) |
| RSY-118 | Construir pantalla de gestión/cancelación de suscripción | [4](SPRINT-4.md) |
| RSY-119 | Probar pagos exitosos, fallidos y reembolsos en sandbox | [4](SPRINT-4.md) |
| RSY-120 | Cargar mínimo 10 ítems cosméticos con precio | [3](SPRINT-3.md) |
| RSY-121 | Construir vitrina con vista previa antes de comprar | [3](SPRINT-3.md) |
| RSY-122 | Implementar lógica de compra y aplicación del cosmético | [3](SPRINT-3.md) |
| RSY-123 | Definir esquema de curso, docente responsable y estudiantes | [3](SPRINT-3.md) |
| RSY-124 | Implementar carga vía CSV | [3](SPRINT-3.md) |
| RSY-125 | Implementar enlace de invitación autogenerado | [3](SPRINT-3.md) |
| RSY-126 | Construir panel de gestión de cursos para administradores | [3](SPRINT-3.md) |
| RSY-127 | Implementar ranking interno visible solo dentro del curso | [3](SPRINT-3.md) |
| RSY-128 | Implementar selector entre banco propio o público | [4](SPRINT-4.md) |
| RSY-129 | Filtrar preguntas de duelo según banco asignado al curso | [4](SPRINT-4.md) |
| RSY-130 | Construir UI del selector en el panel institucional | [4](SPRINT-4.md) |
| RSY-131 | Implementar inicio y cierre de torneo controlado por el docente | [4](SPRINT-4.md) |
| RSY-132 | Construir vista de resultados en tiempo real para pantalla grande | [4](SPRINT-4.md) |
| RSY-133 | Simular un torneo de aula completo de principio a fin | [4](SPRINT-4.md) |

## Subtareas del CSV

Las horas están incluidas en su padre. No fabricar claves ni duplicar subtareas ya importadas.

| Padre | Subtarea | Sprint |
| --- | --- | --- |
| RSY-9 | Implementar creación transaccional de cuenta y endpoint de registro | [1](SPRINT-1.md) |
| RSY-15 | Definir vencimiento y reenvío seguro de verificación | [1](SPRINT-1.md) |
| RSY-27 | Versionar contrato de preferencias para los consumidores | [1](SPRINT-1.md) |
| RSY-36 | Acordar parámetros y ejemplos de calibración inicial | [1](SPRINT-1.md) |
| RSY-43 | Definir fallback y resolver carreras al vencer la espera | [2](SPRINT-2.md) |
| RSY-47 | Diseñar máquina de estados y contrato de eventos del duelo | [2](SPRINT-2.md) |
| RSY-48 | Definir abandono y recuperación de sesión | [2](SPRINT-2.md) |
| RSY-49 | Validar tiempos de respuesta sin confiar en el cliente | [2](SPRINT-2.md) |
| RSY-62 | Probar autorización y ocultamiento de respuestas durante duelo | [2](SPRINT-2.md) |
| RSY-65 | Asegurar actualización atómica e idempotente del ELO | [2](SPRINT-2.md) |
| RSY-73 | Definir calendario y recuperación del cierre de temporada | [3](SPRINT-3.md) |
| RSY-81 | Agregar versión y trazabilidad de preguntas utilizadas | [1](SPRINT-1.md) |
| RSY-86 | Registrar auditoría de publicación y revisión de contenido | [1](SPRINT-1.md) |
| RSY-90 | Controlar entradas, validación y coste de generación asistida | [4](SPRINT-4.md) |
| RSY-91 | Validar archivos y limpiar temporales de extracción | [4](SPRINT-4.md) |
| RSY-94 | Definir métricas y excluir resultados incompletos | [2](SPRINT-2.md) |
| RSY-98 | Verificar privacidad y coherencia de exportaciones | [4](SPRINT-4.md) |
| RSY-107 | Acordar día de corte y actividad que mantiene racha | [3](SPRINT-3.md) |
| RSY-110 | Probar inscripción concurrente al último cupo | [3](SPRINT-3.md) |
| RSY-113 | Definir y probar consumo concurrente de cuota diaria | [4](SPRINT-4.md) |
| RSY-115 | Procesar webhooks firmados y reconciliar pagos | [4](SPRINT-4.md) |
| RSY-118 | Definir efectos de cancelación y reembolso sobre beneficios | [4](SPRINT-4.md) |
| RSY-122 | Probar atomicidad de compra y propiedad del cosmético | [3](SPRINT-3.md) |
| RSY-123 | Definir matriz de roles y aislamiento institucional | [3](SPRINT-3.md) |
| RSY-124 | Agregar prevalidación y reporte de errores de carga masiva | [3](SPRINT-3.md) |
| RSY-125 | Gestionar revocación y vencimiento de invitaciones de curso | [3](SPRINT-3.md) |
| RSY-128 | Validar banco utilizable antes de iniciar torneo | [4](SPRINT-4.md) |
| RSY-132 | Recuperar vista de proyección tras interrupción de red | [4](SPRINT-4.md) |

## Trabajo adicional

Referencias locales, no incidencias Jira existentes. Se muestra su referencia anterior para trazabilidad.

| Referencia | Referencia anterior | Trabajo | Sprint | Horas |
| --- | --- | --- | --- | --- |
| PL-S3-01 | PL-S16-01 | Reconciliar movimientos de monedero e inventario y probar fallos de compra | [3](SPRINT-3.md) | 10 |
| PL-S4-01 | PL-S23-01 | Recuperación de contraseña con token de un solo uso y revocación de sesiones | [4](SPRINT-4.md) | 12 |
| PL-S4-02 | PL-S23-02 | Entorno de staging con HTTPS y configuración de secretos | [4](SPRINT-4.md) | 10 |
| PL-S4-03 | PL-S23-03 | Backup y prueba de restauración de PostgreSQL | [4](SPRINT-4.md) | 8 |
| PL-S4-04 | PL-S23-04 | Regresión de recorridos completos y corrección de bloqueantes | [4](SPRINT-4.md) | 12 |
| PL-S4-05 | PL-S23-05 | Guía operativa y limpieza programada de sesiones y tokens vencidos | [4](SPRINT-4.md) | 8 |

## Control de cobertura

125 tareas originales, sin omisiones ni duplicados de sprint principal; 28 subtareas vinculadas al padre; 6 tareas adicionales propuestas. RSY-18 y RSY-19 consolidan correo y OAuth en Sprint 1. El desglose técnico del registro existente permanece en ese plan. Total: 1150 h de entrega y 1380 h de capacidad base.
