# API del Sprint 1

Base de acceso desde el navegador: `/api`, publicada por Next.js. Respuestas JSON; la API no devuelve contraseñas, hashes ni tokens de verificación. El token de sesión solo viaja en la cookie HttpOnly `rs_session`.

Las escrituras requieren `Origin` igual a `WEB_ORIGIN`, salvo el callback form_post de Apple, protegido por state y cookie de navegador. En desarrollo usar `http://localhost:3000`. Respuestas sin caché. Límite por ruta/IP en una instancia: 30 solicitudes/minuto en registro, login y demás rutas del controlador de autenticación; 120 en las rutas nuevas de aprendizaje y OAuth.

| Método | Ruta | Entrada | Respuesta y errores |
| --- | --- | --- | --- |
| GET | `/health` | Ninguna | 200 `{status:"ok"}`; indica proceso activo, no salud de la base |
| POST | `/auth/register` | `{name,email,password}` | 201 `{user,emailSent}` y cookie; 400 validación; 409 correo duplicado |
| POST | `/auth/login` | `{email,password}` | 201 `{user}` y cookie; 401 credenciales incorrectas |
| GET | `/auth/me` | Cookie | 200 usuario público; 401 sin sesión o vencida |
| POST | `/auth/verify` | `{token}` | 201 `{message}`; 400 token inválido, vencido o usado |
| POST | `/auth/resend` | `{}` y cookie | 201 `{emailSent}`; 401 sin sesión; 409 ya verificado; 429 cooldown |
| POST | `/auth/logout` | `{}` y cookie | 201 `{message}`; elimina sesión y cookie; operación idempotente |
| GET | `/pvp/access` | Cookie | 200 `{allowed:true,message}`; 401 sin sesión; 403 cuenta sin verificar |

Usuario público: `{id,name,email,verified}`. Los IDs son UUID. El correo se recorta y normaliza a minúsculas, con máximo de 254 caracteres. Nombre entre 2 y 80 caracteres. Contraseña entre 12 y 128 caracteres al registrarse. No se admiten propiedades adicionales en los payloads de autenticación.

Error de validación: `{message,fields:{email:["mensaje"],password:["mensaje"]}}`. Los errores generales tienen `message`. El cooldown puede incluir `retryAfter`, en segundos. Fallos inesperados generan 500 sin devolver detalles SQL.

El enlace llega al correo como `/verificar#token=…`. El fragmento no se transmite al servidor en la navegación ni aparece en sus logs HTTP. Abrirlo no modifica datos: la persona pulsa confirmar y el cliente hace POST. La página evita enviar el enlace como Referer y limpia el token de la URL al leerlo. Un enlace válido verifica el correo incluso si se abre sin sesión; para acceder a la cuenta se sigue requiriendo contraseña o sesión propia.

`emailSent:false` significa cuenta persistida o token renovado, pero envío SMTP fallido. Solicitar otro enlace tras el cooldown. Mailpit permite revisar estos mensajes localmente; no se muestran tokens en la respuesta HTTP.

Registro y reenvío incluyen `resendAfter`, en segundos, para que la interfaz use el cooldown configurado.

## Perfil y contenido

Estas rutas, salvo catálogo, exigen cuenta verificada. Los roles se comprueban en servidor y los IDs de recurso deben ser UUID.

| Método | Ruta | Entrada y permisos |
| --- | --- | --- |
| GET | `/catalog` | Público; niveles, materias activas, compatibilidad y avatares |
| GET | `/profile` | Perfil propio, rol, materias, ELO y estado de solicitud docente |
| PATCH | `/profile` | `{levelId,subjectIds,avatarId}`; sin campos adicionales; nivel y materias compatibles; incrementa `preferencesVersion` |
| POST | `/teacher/application` | `{institution,institutionalEmail,evidenceReference}`; cuenta verificada; solo reenviar si rechazada |
| GET | `/moderation/teachers` | Administrador; últimas 100 solicitudes, datos institucionales privados |
| POST | `/moderation/teachers/:id` | Administrador; `{status,reason,checklist}`; status approved/rejected; checklist true al aprobar |
| GET | `/questions` | Docente: sus preguntas; administrador: todas; últimas 100 |
| POST | `/questions` | Docente/administrador; crea versión 1 pendiente |
| PATCH | `/questions/:id` | Autor o administrador; exige `version` actual; edición crea versión y vuelve a pendiente |
| GET | `/questions/:id/history` | Autor o administrador; versiones y auditoría |
| POST | `/moderation/questions/:id` | Administrador diferente del autor; `{status,reason,version,checklist}`; revisión de versión pendiente |
| POST | `/calibration` | `{subjectId,skip?:boolean}`; materia guardada en perfil; inicia/retoma o devuelve resultado previo |
| POST | `/calibration/:id/finish` | `{answers:number[]}`; una entrada por pregunta, índice 0..3 o -1 omitida; solo propietario |

Pregunta: `{subjectId,topic,difficulty,prompt,options,correctIndex,explanation,source,license,version?}`. Dificultad 1..3; cuatro opciones distintas no vacías; respuesta correcta 0..3; fuente y licencia obligatorias. 400 en validación, 403 en permisos, 404 recurso ajeno/no encontrado, 409 en versión obsoleta o transición repetida. Moderación necesita motivo de al menos cinco caracteres. No se acepta autoaprobación.

Calibración devuelve `{id,subjectId,status,elo,correctCount,total,questions}`. Durante `started`, preguntas solo incluyen id, versión, enunciado, opciones y dificultad. Al finalizar no devuelve el banco de soluciones. El snapshot interno conserva las respuestas originales. Resultado y ELO se guardan una sola vez, también ante solicitudes concurrentes. Con menos de diez preguntas aprobadas: 409 al iniciar y opción de omitir con ELO 1000.

## OAuth

`GET /auth/oauth/providers` devuelve disponibilidad de configuración. `POST /auth/oauth/:provider/start` recibe `{link?:boolean}`, establece cookie temporal y devuelve `{url}`. La vinculación exige sesión propia verificada. Google retorna a `GET /auth/oauth/google/callback`; Apple usa `POST /auth/oauth/apple/callback` con formulario URL-encoded. El callback consume state asociado al navegador, valida el token, crea sesión y redirige al frontend; no expone tokens en JSON ni URL final.

Ver [configuración OAuth](OAUTH.md) y [reglas del contenido piloto](CONTENIDO-PILOTO.md).

## Competición del Sprint 2

El contrato de `/api/competition`, eventos WebSocket, reglas de duelo, ELO y permisos de grupos se documenta en [Competición de RankStudy](COMPETICION.md). Las respuestas correctas de un duelo solo se consultan en el repaso propio después de su cierre.
