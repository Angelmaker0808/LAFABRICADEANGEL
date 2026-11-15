# Conectar Firebase (resumen)
1. console.firebase.google.com > crear proyecto > añadir app Web > copia la configuración a FIREBASE_CONFIG en tienda/backend.js.
2. Activa Firestore y Storage. Pega firestore.rules y storage.rules en sus pestañas "Reglas".
3. Plan Blaze (necesario para Functions). Instala la extensión "Trigger Email from Firestore" (colección: mail) con tu SMTP.
4. En una terminal: `npm i -g firebase-tools`, `firebase login`, `firebase init functions` (usa esta carpeta) y `firebase deploy --only functions`. Edita ADMIN_EMAIL en functions/index.js.
5. En tienda/backend.js cambia BACKEND_MODE a 'firebase' y vuelve a subir la web a Netlify.
Cambiar estado: Firestore > estados > (código) > campo "estado" (usa exactamente uno de los 6 textos). El cliente recibe un correo y lo ve en Seguir pedido.
