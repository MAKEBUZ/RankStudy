# Cierre de los sprints 1 y 2

La aplicación permite preparar el perfil y jugar duelos individuales con progreso, repaso y comunidad. Para cerrar ambos sprints se necesita aceptar el contenido y las reglas del piloto, habilitar los proveedores externos del Sprint 1 y validar la experiencia en el entorno donde se usará. No hay que esperar a OAuth para probar duelos con cuentas verificadas por correo.

## Orden recomendado

1. Publicar contenido revisado: es el requisito que habilita los duelos para cuentas reales.
2. Jugar el recorrido completo con dos personas y aceptar las reglas competitivas.
3. Configurar Google y Apple y completar su validación externa.
4. Probar el piloto bajo HTTPS con redes y dispositivos reales antes de fijar una apertura pública.

## Pendientes del Sprint 1

| Pendiente | Qué hacer | Cómo se acepta |
| --- | --- | --- |
| Banco inicial y calibración, RSY-84 y RSY-35 | Revisar las 24 preguntas, dificultad, explicación, idoneidad y licencia en Moderación. Designar la cuenta responsable y habilitarla con `npm run admin:grant -- correo@ejemplo.com` desde el servidor. | Publicar al menos cinco preguntas por materia para duelos y diez para test; el set piloto trae doce por materia. Conservar auditoría de revisión. |
| Google y Apple, RSY-12 y RSY-14 | Crear clientes reales y configurar secretos solo en `.env`/servidor. Google puede probarse en localhost; Apple requiere dominio HTTPS y configuración Developer. | Cuenta nueva, segundo acceso, cancelación y vinculación funcionan en cada proveedor; no fusionar por correo. |
| Tiempo de registro, RSY-21 | Medir ambos proveedores en el entorno real, separando espera humana, consentimiento y correo. | Registrar muestra, inicio/fin y verificar el objetivo de menos de 60 segundos según el criterio acordado. |
| Parámetros académicos | Aceptar niveles/materias piloto y fórmula inicial 600–1400; omitir asigna 1000. | Registrar aprobación de producto y revisión académica, o ajustar parámetros y repetir casos. |

La revisión técnica de respuestas aritméticas ya está automatizada. La validación académica del contenido y su adecuación al público siguen a cargo de quien aprueba su publicación. Instrucciones en [contenido piloto](../CONTENIDO-PILOTO.md) y [OAuth](../OAUTH.md).

## Pendientes de aceptación del Sprint 2

| Prioridad | Punto | Acción concreta |
| --- | --- | --- |
| Alta | Contenido aprobado heredado del Sprint 1 | Publicar el banco revisado; los tests usan fixtures temporales que no sustituyen ese banco. |
| Alta | Reglas de juego y ELO | Confirmar cinco preguntas, 20 s/ronda, bonus de velocidad, K=32, cinco rangos, límites y penalización de abandono. Si cambian, actualizar pruebas y documentación. |
| Alta | Matchmaking y reconexión | Aceptar rango inicial ±100 y ampliación, espera máxima de 15 s y ventana de reconexión de 20 s desde la última comunicación. Probar con dos personas del mismo nivel/materia. |
| Alta antes de publicar | Validación del entorno real | Configurar HTTPS y proxy con WebSocket, SMTP real y observación de errores. Probar dos redes/dispositivos, recarga, pérdida de conexión, cierre de sesión y permisos. |
| Media | Rendimiento esperado | Confirmar concurrencia objetivo y umbrales. La carga local de servicios no demuestra capacidad pública ni sustituye una prueba sostenida de HTTP/WebSocket. |
| Media | Privacidad y comunidad | Aceptar país opcional con consentimiento, nombre público en rankings, reglas para compartir/renovar códigos y quién puede retirar integrantes. |
| Media | Aceptación funcional | Revisar resultado/ELO, aviso de cambio de rango, gráfico, explicación histórica, pregunta guardada, invitación y clasificación privada; registrar incidencias reales y resolver bloqueantes. |

## Recorrido de aceptación con dos cuentas

1. Registrar y verificar dos cuentas; guardar mismo nivel y materia, seleccionar avatares y completar u omitir calibración.
2. Entrar en `/competir` y buscar rival desde ambas. Completar cinco preguntas; ambos deben ver el mismo ganador y cambios de ELO consistentes.
3. Recargar una página durante una ronda y volver dentro de la ventana. Comprobar que no cambie de sala ni pueda responder dos veces.
4. Abrir Repaso; verificar explicación, guardar una pregunta y recuperarla después. En Mi progreso, contrastar ELO y aciertos/fallos con la partida.
5. Crear grupo, unir segunda cuenta y consultar ranking privado. Salir y comprobar que se rechaza el acceso posterior.
6. Crear/aceptar reto; probar uno vencido y otro ya usado. Verificar que solo se genere una partida.
7. Declarar país únicamente si se acepta su uso en la clasificación. Cambiar el filtro de país, materia y grupo y verificar resultados.

## Recomendaciones para continuar

Mantener un piloto pequeño con contenido académico revisado antes de ampliar materias. Registrar las reglas aceptadas para poder interpretar cambios de ELO. Priorizar calidad de las preguntas y claridad de los resultados antes de añadir recompensas.

Antes de varias instancias, planificar balanceo y afinidad de polling, coordinación del worker, límites compartidos y prueba sostenida de conexiones. En una red real medir tiempo hasta emparejar, latencia de confirmación, desconexiones y duplicados; no usar solo el tiempo de consulta SQL como experiencia completa.

El Sprint 3 contiene temporadas, torneos, recompensas, tienda y cursos. El Sprint 4 contiene IA, pagos y lanzamiento. Esas funciones no son faltantes de los sprints 1 y 2.
