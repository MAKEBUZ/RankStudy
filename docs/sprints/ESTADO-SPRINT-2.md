# Estado del Sprint 2

Actualización del 20 de octubre de 2026. **Las 41 tareas tienen implementación local y evidencia de pruebas.** El cierre de aceptación requiere contenido publicado, reglas confirmadas y validación del piloto en su entorno real. No se modificaron estados Jira ni se publicó producción.

## Funciones disponibles

En [Competir](http://localhost:3000/competir): búsqueda de rival, cola cancelable, duelos sincronizados, reconexión, puntuación, ganador y cambios de ELO; historial, gráfico e insignia también en el perfil; avisos de cambio de rango; repaso con explicaciones y preguntas guardadas; métricas por tema y recomendaciones; retos, búsqueda por nombre, grupos y rankings por materia/país/grupo.

El ranking abierto y los avisos se refrescan cada diez segundos; el duelo recibe estado aproximadamente cada segundo. Las preguntas y reglas competitivas las controla el servidor.

## Validación

| Comprobación | Resultado |
| --- | --- |
| TypeScript y tipos de rutas | Aprobados |
| Suite local sin PostgreSQL | 20 aprobadas; 33 casos reservados al motor real |
| Suite completa con PostgreSQL dedicado | 53 aprobadas, 0 omitidas |
| Navegador Chromium | 8 recorridos aprobados, 0 fallos |
| Compilación de API y frontend | Aprobada |
| Revisión visual | Duelo, progreso, perfil y móvil sin desbordamiento |
| Ranking con 10.000 usuarios sintéticos | 60 consultas; p50 30.1 ms, p95 54.9 ms, máximo 83.3 ms |
| Cola con 64 búsquedas simultáneas | 32 duelos en 1.37 s; 64 jugadores, 0 errores y 0 duplicados |

La carga usa servicios directos y PostgreSQL local; no es una prueba de tráfico HTTP/WebSocket masivo ni capacidad de producción. Umbrales provisionales: p95 de ranking <500 ms y cola <15 s. Resultados y reproducción en [validación detallada](VALIDACION-SPRINT-2.md).

## Cobertura de tareas

| Clave | Tarea original | Implementación | Estado técnico |
| --- | --- | --- | --- |
| RSY-40 | Definir la lógica de rango ± configurable | Cola, compatibilidad y transporte autenticado | Implementado y validado localmente |
| RSY-41 | Implementar ampliación de rango tras timeout | Cola, compatibilidad y transporte autenticado | Implementado y validado localmente |
| RSY-42 | Montar infraestructura de WebSockets | Cola, compatibilidad y transporte autenticado | Implementado y validado localmente |
| RSY-43 | Implementar timeout de 15s con fallback | Cola, compatibilidad y transporte autenticado | Implementado y validado localmente |
| RSY-44 | Construir UI de "buscando rival" con animación de espera | Cola, compatibilidad y transporte autenticado | Implementado y validado localmente |
| RSY-45 | Implementar botón de cancelar búsqueda | Cola, compatibilidad y transporte autenticado | Implementado y validado localmente |
| RSY-46 | Simular usuarios concurrentes en la cola de matchmaking | Cola, compatibilidad y transporte autenticado | Implementado y medido localmente; capacidad real por aceptar |
| RSY-28 | Validar que los cambios se reflejen en matchmaking y contenido | Cola, compatibilidad y transporte autenticado | Implementado y validado localmente |
| RSY-47 | Sincronizar preguntas y respuestas entre ambos jugadores | Duelo autoritativo, temporizador y recuperación | Implementado y validado localmente |
| RSY-48 | Manejar desconexiones y reconexión | Duelo autoritativo, temporizador y recuperación | Implementado y validado localmente |
| RSY-49 | Implementar puntuación por corrección + bonus de velocidad | Duelo autoritativo, temporizador y recuperación | Implementado y validado localmente |
| RSY-50 | Construir temporizador visible y opciones de respuesta | Duelo autoritativo, temporizador y recuperación | Implementado y validado localmente |
| RSY-52 | Probar el duelo en condiciones de red variable | Duelo autoritativo, temporizador y recuperación | Recuperación y latencia simulada comprobadas; red real pendiente |
| RSY-65 | Implementar cálculo de ELO tras cada duelo, por materia | ELO, historial, gráfico, rangos y avisos | Implementado y validado localmente |
| RSY-66 | Escribir pruebas unitarias de la fórmula | ELO, historial, gráfico, rangos y avisos | Implementado y validado localmente |
| RSY-67 | Registrar cada variación de ELO con fecha y duelo asociado | ELO, historial, gráfico, rangos y avisos | Implementado y validado localmente |
| RSY-68 | Construir gráfico de ELO en el tiempo en el perfil | ELO, historial, gráfico, rangos y avisos | Implementado y validado localmente |
| RSY-69 | Diseñar mínimo 5 tramos de rango con insignia distinta | ELO, historial, gráfico, rangos y avisos | Implementado y validado localmente |
| RSY-70 | Implementar lógica de rango según ELO actual | ELO, historial, gráfico, rangos y avisos | Implementado y validado localmente |
| RSY-71 | Disparar notificación al subir o bajar de rango | ELO, historial, gráfico, rangos y avisos | Implementado y validado localmente |
| RSY-72 | Mostrar insignia en perfil y notificación in-app | ELO, historial, gráfico, rangos y avisos | Implementado y validado localmente |
| RSY-51 | Construir pantalla de resultado con ganador y cambio de ELO | Duelo autoritativo, temporizador y recuperación | Implementado y validado localmente |
| RSY-62 | Exponer endpoint con preguntas, respuesta correcta y explicación | Repaso privado y guardado versionado | Implementado y validado localmente |
| RSY-63 | Construir listado de preguntas con explicaciones | Repaso privado y guardado versionado | Implementado y validado localmente |
| RSY-64 | Implementar función de guardado y acceso posterior desde perfil | Repaso privado y guardado versionado | Implementado y validado localmente |
| RSY-94 | Calcular evolución de ELO y desglose de aciertos/fallos por tema | Estadísticas, gráfico y recomendaciones | Implementado y validado localmente |
| RSY-95 | Construir gráfico de evolución y tabla de desglose por tema | Estadísticas, gráfico y recomendaciones | Implementado y validado localmente |
| RSY-96 | Calcular tasa de error por tema y ordenar por prioridad | Estadísticas, gráfico y recomendaciones | Implementado y validado localmente |
| RSY-97 | Mostrar los temas recomendados en el dashboard principal | Estadísticas, gráfico y recomendaciones | Implementado y validado localmente |
| RSY-58 | Generar enlace de invitación único | Retos de un uso, búsqueda y notificación | Implementado y validado localmente |
| RSY-59 | Implementar búsqueda de usuario por nombre | Retos de un uso, búsqueda y notificación | Implementado y validado localmente |
| RSY-60 | Implementar expiración automática a los 5 minutos | Retos de un uso, búsqueda y notificación | Implementado y validado localmente |
| RSY-61 | Construir UI de envío de reto y notificación al receptor | Retos de un uso, búsqueda y notificación | Implementado y validado localmente |
| RSY-100 | Definir esquema de grupo y código de invitación | Grupos, membresía y clasificación privada | Implementado y validado localmente |
| RSY-101 | Construir pantalla de crear grupo e ingresar con código | Grupos, membresía y clasificación privada | Implementado y validado localmente |
| RSY-102 | Implementar ranking visible solo para miembros | Grupos, membresía y clasificación privada | Implementado y validado localmente |
| RSY-77 | Implementar filtros por ámbito (grupo/país/global) y materia | Ranking, filtros, actualización e índices | Implementado y validado localmente |
| RSY-78 | Optimizar consultas para actualización casi en tiempo real | Ranking, filtros, actualización e índices | Implementado y validado localmente |
| RSY-79 | Construir tabla con filtros interactivos | Ranking, filtros, actualización e índices | Implementado y validado localmente |
| RSY-80 | Probar con gran volumen simulado de usuarios | Ranking, filtros, actualización e índices | Implementado y medido localmente; capacidad real por aceptar |
| RSY-34 | Exponer el avatar en perfil, ranking y pantalla de duelo | Avatar común en perfil, duelo y ranking | Implementado y validado localmente |

Las subtareas del planning están incluidas en sus padres: resolución de carreras, máquina de estados, recuperación, tiempos de servidor, ocultamiento de soluciones, cierre atómico y métricas de duelos completos.

## Condiciones de aceptación pendientes

Aprobar el banco académico del Sprint 1 para que cuentas reales puedan jugar. Aceptar parámetros de ELO, velocidad, abandono, rango y reconexión. Ejecutar piloto bajo HTTPS con dispositivos/redes reales y confirmar capacidad prevista, privacidad y experiencia de los participantes. Ver [pendientes y recomendaciones de ambos sprints](PENDIENTES-SPRINTS-1-Y-2.md).
