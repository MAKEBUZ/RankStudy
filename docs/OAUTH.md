# Configurar Google y Apple

La integración está implementada; no contiene credenciales reales ni sustituye las pruebas con cada proveedor. Configurar los valores únicamente en `apps/api/.env` o en el gestor de secretos del servidor. No enviarlos por chat, subirlos a Git ni usar `NEXT_PUBLIC_*`.

## Google

En Google Cloud, configurar consentimiento y un cliente OAuth de tipo aplicación web. Registrar exactamente `http://localhost:3000/api/auth/oauth/google/callback` para desarrollo o el mismo path bajo el dominio HTTPS de staging. Añadir las cuentas de prueba permitidas.

Definir `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` y `WEB_ORIGIN` sin barra final. Reiniciar API. El botón habilitado indica credenciales presentes, no configuración validada por Google.

El servidor usa authorization code con PKCE S256, state, nonce, intercambio de código y validación RS256 mediante las claves públicas de Google. Verifica emisor, destinatario, vencimiento y antigüedad. No guarda access/refresh tokens: solo se solicita identidad, correo y nombre.

## Apple

Se necesita acceso a Apple Developer, un identificador principal con Sign in with Apple, un Services ID web asociado, dominio y Return URL registrados y clave privada `.p8`. Callback: `https://DOMINIO/api/auth/oauth/apple/callback`. Apple requiere dominio HTTPS; localhost HTTP no habilita este proveedor.

Definir `APPLE_CLIENT_ID` con el Services ID, `APPLE_TEAM_ID`, `APPLE_KEY_ID` y `APPLE_PRIVATE_KEY` con el PEM completo. En dotenv representar saltos internos como `\n` dentro de un valor entre comillas. Configurar `WEB_ORIGIN=https://DOMINIO`. En producción usar `NODE_ENV=production` y SMTP real. No inventar dominios ni identificadores.

El servidor firma un client secret ES256 de cinco minutos y recibe form_post. Solo esta ruta permite el retorno externo sin Origin del frontend; exige state vigente, cookie de navegador y nonce. Las cookies temporales Apple son HttpOnly, Secure y SameSite=None. Para vincular se usa una cookie temporal de sesión restringida al path OAuth, eliminada al terminar. Se valida el ID token con las claves RSA de Apple.

## Vinculación y aceptación

Iniciar sesión y verificar la cuenta; abrir Perfil y avatar → Vincular Google/Apple. La vinculación exige sesión propia y navegador que inició el intento. Un correo existente no se fusiona automáticamente. Una identidad vinculada no puede trasladarse a otra cuenta.

Para cada proveedor comprobar consentimiento aceptado/cancelado, cuenta nueva, segundo acceso, vinculación, correo existente, estado vencido/reutilizado y cookies HTTPS. Usar navegador externo si el proveedor bloquea navegadores embebidos. No cerrar RSY-12 ni RSY-14 con credenciales vacías o tokens simulados.

Medir registro desde confirmar el método hasta cuenta autenticada/verificada. Registrar proveedor, entorno, muestra y esperas externas. La suite local mide una muestra automatizada por correo; no representa demora humana ni valida los proveedores reales.

## Referencias oficiales

- [OpenID Connect de Google](https://developers.google.com/identity/openid-connect/openid-connect).
- [Autorización web de Google](https://developers.google.com/identity/protocols/oauth2/web-server).
- [Autorización de Apple](https://developer.apple.com/documentation/signinwithapplerestapi/request-an-authorization-to-the-sign-in-with-apple-server.).
- [Validación de tokens Apple](https://developer.apple.com/documentation/signinwithapplerestapi/generate-and-validate-tokens).
