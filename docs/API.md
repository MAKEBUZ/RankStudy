# API del Sprint 1

Base de acceso desde el navegador: `/api`, publicada por Next.js. Respuestas JSON; la API no devuelve contraseñas, hashes ni tokens de verificación. El token de sesión solo viaja en la cookie HttpOnly `rs_session`.

Las escrituras requieren encabezado `Origin` igual al origen configurado en `WEB_ORIGIN`. En desarrollo es `http://localhost:3000`; se debe acceder con ese host. Las consultas usan la cookie de sesión cuando corresponde. Respuestas sin caché y límite inicial de 30 solicitudes por minuto por IP en una instancia.

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
