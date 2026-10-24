# Contenido y calibración del piloto

`npm run db:seed` carga tres niveles, dos materias compatibles y seis avatares SVG originales. Secundaria y universidad incluyen Matemáticas/Física; preparación de oposiciones incluye Matemáticas. Es un conjunto inicial configurable, no un catálogo curricular definitivo.

Se incluyen 12 preguntas de multiplicación y 12 de movimiento uniforme. Tienen cuatro opciones distintas, una respuesta, explicación, dificultad de 1 a 3, fuente original y licencia CC0-1.0 propuesta. Los seis SVG fueron dibujados para el proyecto y se regeneran con `node scripts/sprint1-assets.mjs`.

Las soluciones se comprueban en pruebas independientes. La dificultad es una etiqueta inicial dentro del piloto, no una medida psicométrica ni una afirmación de cobertura universitaria. La revisión académica debe confirmar idoneidad, dificultad y permiso de publicación. El seed no las aprueba automáticamente.

## Publicar el banco

Registrar y verificar la cuenta del responsable. Desde la terminal del servidor ejecutar `npm run admin:grant -- correo@ejemplo.com`. Solo eleva una cuenta existente y verificada; no crea contraseñas ni existe un endpoint público que conceda el rol.

Abrir `/espacio` → Moderación. Revisar respuesta, explicación, dificultad y licencia, indicar motivo y aprobar/rechazar. Un administrador no puede aprobar sus propias preguntas; otro administrador debe revisarlas. El contenido del seed no tiene propietario docente y lo revisa el responsable.

Solo preguntas aprobadas entran en calibración. Editar incrementa versión y vuelve a pendiente; versiones previas y auditoría se conservan. La lista muestra las 100 preguntas más recientemente actualizadas; paginación completa corresponde a una ampliación de volumen.

## Verificación docente

La cuenta verificada solicita acceso con institución, correo institucional y referencia comprobable, sin subir documentos personales. Un administrador diferente verifica la relación institucional por un canal independiente y registra su decisión. Solo aprobación concede el rol docente; rechazar permite corregir y reenviar. El cliente no puede asignar roles.

La referencia vence a los 30 días y se sustituye por un marcador al consultar moderación, al arrancar API y en la limpieza horaria mientras el proceso esté activo. No se aprueban referencias vencidas. Revisar la política de retención antes de operar con una institución real.

## ELO inicial

Propuesta implementada: `ELO = redondear(600 + 800 × suma de pesos acertados / suma de pesos)`.

Peso = dificultad de 1 a 3. Omitir una pregunta cuenta como fallo; omitir todo asigna 1000. Todos los aciertos producen 1400 y ninguno produce 600. Con dos preguntas de peso 1 y 3, acertar solo la de peso 3 produce 1200; solo la de peso 1 produce 800. Estos parámetros requieren aceptación de producto antes de tratarse como definitivos.

El test extrae de 10 a 12 preguntas aprobadas, guarda contenido y versión en servidor y no revela solución durante la prueba. Reabrir retoma las mismas preguntas; respuestas no enviadas permanecen solo en el navegador. El cierre bloquea usuario y test y persiste resultado/ELO en la misma transacción. Reintentos devuelven el resultado existente. No hay recalibración automática al cambiar preferencias o editar el banco.

Mientras una materia no tenga diez preguntas aprobadas, la interfaz informa el motivo y permite ELO por defecto.
