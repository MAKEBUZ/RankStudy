# Estado del Sprint 1

Fecha: 6 de octubre de 2026. **Implementación local ampliada y validada; cierre formal pendiente de OAuth real y aceptación académica/producto.** Este documento no modifica estados Jira.

## Entregado

Registro y verificación por correo; integración OAuth de Google/Apple con protección de identidad; perfil con nivel/materias compatibles y seis avatares originales; solicitud y aprobación docente; banco con permisos, versiones y auditoría; moderación; calibración opcional con ELO persistido e idempotencia. La aplicación local tiene migraciones y catálogos cargados.

## Verificación

| Comprobación | Resultado |
| --- | --- |
| TypeScript y tipos de rutas Next.js | Aprobado |
| Suite sin servicios externos | 17 aprobadas, 13 omitidas por requerir PostgreSQL real |
| Suite con PostgreSQL dedicado | 30 aprobadas, 0 omitidas |
| Navegador Chromium | 5 aprobadas, 0 fallos, 0 reintentos |
| Compilación de producción de API y web | Aprobada |
| Revisión visual escritorio 1440 px / móvil 390 px | Sin desbordamiento; seis avatares y controles visibles |
| Registro por correo automatizado, SMTP y PostgreSQL local | Una muestra de 903 ms hasta verificar; no incluye espera humana |

La prueba de navegador demuestra solicitud docente, aprobación administrativa, carga/publicación de contenido y test de 12 preguntas con ELO 1400. Las fixtures de contenido y administración se eliminan al terminar; el contenido inicial sigue pendiente de revisión. Pruebas de OAuth usan firmas RSA de prueba y servicios simulados; no se presentarán como acceso real a Google o Apple.

## Tareas del backlog

| Clave | Tarea | Estado técnico | Evidencia |
| --- | --- | --- | --- |
| RSY-9 | Diseñar el modelo de usuario y tabla de credenciales | Implementado y validado localmente | API de autenticación/OAuth, firma de tokens y navegador |
| RSY-10 | Implementar hashing seguro de contraseña (bcrypt/argon2) | Implementado y validado localmente | API de autenticación/OAuth, firma de tokens y navegador |
| RSY-11 | Escribir pruebas unitarias del endpoint | Implementado y validado localmente | API de autenticación/OAuth, firma de tokens y navegador |
| RSY-15 | Generar y enviar token de verificación por correo | Implementado y validado localmente | API de autenticación/OAuth, firma de tokens y navegador |
| RSY-16 | Implementar endpoint de validación de token | Implementado y validado localmente | API de autenticación/OAuth, firma de tokens y navegador |
| RSY-17 | Bloquear acceso a funciones PvP hasta verificar el email | Implementado y validado localmente | API de autenticación/OAuth, firma de tokens y navegador |
| RSY-18 | Diseñar la UI con las 3 opciones de registro | Implementado y validado localmente | API de autenticación/OAuth, firma de tokens y navegador |
| RSY-19 | Conectar formulario a los endpoints de backend | Implementado y validado localmente | API de autenticación/OAuth, firma de tokens y navegador |
| RSY-20 | Manejar y mostrar errores de validación | Implementado y validado localmente | API de autenticación/OAuth, firma de tokens y navegador |
| RSY-22 | Probar casos límite (email duplicado, contraseña débil) | Implementado y validado localmente | API de autenticación/OAuth, firma de tokens y navegador |
| RSY-12 | Configurar credenciales OAuth en las consolas de Google y Apple | Pendiente de configuración y prueba externa | [Configurar y validar proveedores](../OAUTH.md) |
| RSY-13 | Implementar el flujo de login social y creación de cuenta vinculada | Implementado; validación real de proveedores pendiente | API de autenticación/OAuth, firma de tokens y navegador |
| RSY-14 | Probar el flujo end-to-end en ambos proveedores | Pendiente de configuración y prueba externa | [Configurar y validar proveedores](../OAUTH.md) |
| RSY-21 | Medir el tiempo de registro end-to-end (<60s) | Medición local de correo realizada; OAuth pendiente | Muestra automatizada de correo: 903 ms, sin espera humana |
| RSY-23 | Definir tabla de niveles educativos (secundaria/universidad/oposición) | Implementado y validado localmente | Persistencia y aislamiento de perfil, compatibilidad y seis SVG; navegador móvil/escritorio |
| RSY-24 | Definir catálogo de materias predefinidas | Implementado y validado localmente | Persistencia y aislamiento de perfil, compatibilidad y seis SVG; navegador móvil/escritorio |
| RSY-25 | Construir selector de nivel (single-select) | Implementado y validado localmente | Persistencia y aislamiento de perfil, compatibilidad y seis SVG; navegador móvil/escritorio |
| RSY-26 | Construir selector de materias (multi-select) | Implementado y validado localmente | Persistencia y aislamiento de perfil, compatibilidad y seis SVG; navegador móvil/escritorio |
| RSY-27 | Implementar PATCH de perfil para actualizar nivel/materias | Implementado y validado localmente | Persistencia y aislamiento de perfil, compatibilidad y seis SVG; navegador móvil/escritorio |
| RSY-29 | Diseñar al menos 6 combinaciones gratuitas | Implementado y validado localmente | Persistencia y aislamiento de perfil, compatibilidad y seis SVG; navegador móvil/escritorio |
| RSY-30 | Exportar assets optimizados para web/móvil | Implementado y validado localmente | Persistencia y aislamiento de perfil, compatibilidad y seis SVG; navegador móvil/escritorio |
| RSY-31 | Construir carrusel/selector de combinaciones | Implementado y validado localmente | Persistencia y aislamiento de perfil, compatibilidad y seis SVG; navegador móvil/escritorio |
| RSY-32 | Guardar selección al finalizar onboarding | Implementado y validado localmente | Persistencia y aislamiento de perfil, compatibilidad y seis SVG; navegador móvil/escritorio |
| RSY-33 | Agregar campo de avatar al modelo de usuario | Implementado y validado localmente | Persistencia y aislamiento de perfil, compatibilidad y seis SVG; navegador móvil/escritorio |
| RSY-81 | Definir esquema (materia, tema, dificultad, opciones, respuesta) | Implementado y validado localmente | Banco, permisos, versiones, auditoría y moderación; [revisión del piloto](../CONTENIDO-PILOTO.md) |
| RSY-82 | Construir formulario de carga y edición de preguntas | Implementado y validado localmente | Banco, permisos, versiones, auditoría y moderación; [revisión del piloto](../CONTENIDO-PILOTO.md) |
| RSY-83 | Bloquear guardado si falta materia, tema o dificultad | Implementado y validado localmente | Banco, permisos, versiones, auditoría y moderación; [revisión del piloto](../CONTENIDO-PILOTO.md) |
| RSY-84 | Curar y cargar el set inicial de preguntas por materia | Contenido cargado; aprobación académica pendiente | Banco, permisos, versiones, auditoría y moderación; [revisión del piloto](../CONTENIDO-PILOTO.md) |
| RSY-85 | Definir flujo de verificación (documento/institución) | Implementado y validado localmente | Banco, permisos, versiones, auditoría y moderación; [revisión del piloto](../CONTENIDO-PILOTO.md) |
| RSY-86 | Implementar estados pendiente/aprobado/rechazado | Implementado y validado localmente | Banco, permisos, versiones, auditoría y moderación; [revisión del piloto](../CONTENIDO-PILOTO.md) |
| RSY-87 | Construir formulario de carga para docentes | Implementado y validado localmente | Banco, permisos, versiones, auditoría y moderación; [revisión del piloto](../CONTENIDO-PILOTO.md) |
| RSY-88 | Construir panel de moderación para administradores | Implementado y validado localmente | Banco, permisos, versiones, auditoría y moderación; [revisión del piloto](../CONTENIDO-PILOTO.md) |
| RSY-35 | Curar 10-15 preguntas por materia con dificultad etiquetada | Contenido cargado; aprobación académica pendiente | Fórmula independiente, snapshot, doble envío y recorrido de test |
| RSY-36 | Implementar fórmula de ELO inicial según aciertos/dificultad | Implementado y probado; parámetros de producto propuestos | Fórmula independiente, snapshot, doble envío y recorrido de test |
| RSY-37 | Definir ELO por defecto para quienes saltan el test | Implementado y probado; parámetros de producto propuestos | Fórmula independiente, snapshot, doble envío y recorrido de test |
| RSY-38 | Construir la UI del test con opción de saltar | Implementado y validado localmente | Fórmula independiente, snapshot, doble envío y recorrido de test |
| RSY-39 | Mostrar resultado y ELO asignado al finalizar | Implementado y validado localmente | Fórmula independiente, snapshot, doble envío y recorrido de test |

## Para cerrar el sprint

1. Configurar aplicaciones y credenciales reales Google/Apple y dominio HTTPS para Apple; ejecutar los recorridos externos y medirlos. Completa RSY-12, RSY-14 y la parte pendiente de RSY-21. Ver [OAuth](../OAUTH.md).
2. El responsable académico revisa y publica el set piloto; confirma materias, dificultad y permiso de uso. Completa aceptación de RSY-84 y RSY-35. Ver [contenido y administración](../CONTENIDO-PILOTO.md).
3. Producto acepta los parámetros iniciales de ELO, catálogo y criterio de tiempo de registro, o solicita ajuste antes de su uso definitivo.

No se han publicado cambios en GitHub, desplegado producción ni cambiado estados en Jira.


## Actualización del 20 de octubre de 2026

Se volvió a comprobar la configuración: Google y Apple siguen sin credenciales habilitadas y las 24 preguntas piloto permanecen pendientes de aprobación. El Sprint 2 está implementado y validado localmente. La [guía de cierre de ambos sprints](PENDIENTES-SPRINTS-1-Y-2.md) prioriza publicar contenido revisado, probar duelos con cuentas verificadas por correo y después completar OAuth y la aceptación del entorno real.
