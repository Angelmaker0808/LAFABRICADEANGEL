/* Envía correos con la extensión "Trigger Email from Firestore" (colección "mail") */
const { onDocumentCreated, onDocumentUpdated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin'); admin.initializeApp();
const ADMIN_EMAIL = 'tu-correo@ejemplo.com'; // ✏️ dónde recibes los avisos
const esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const mail = (to, subject, html) => admin.firestore().collection('mail').add({ to, message: { subject, html } });

exports.nuevoPedido = onDocumentCreated('pedidos/{codigo}', async e => {
  const p = e.data.data(), c = e.params.codigo;
  const lineas = p.items.map(i => `<li>${i.qty} × ${esc(i.name)} · ${esc(i.color)} · ${esc(i.size)} · Notas: ${esc(i.notes || '-')}</li>`).join('');
  await mail(ADMIN_EMAIL, `Nueva reserva ${c}`, `<p>${esc(p.nombre)} · ${esc(p.email)} · ${esc(p.telefono)}</p><p>${esc(Object.values(p.direccion).join(', '))}</p><ul>${lineas}</ul><p>Total estimado: ${p.total} €</p>`);
  await mail(p.email, `Hemos recibido tu reserva ${c}`, `<p>Hola ${esc(p.nombre)}, hemos recibido tu solicitud (${c}). En breve te enviaremos el enlace de pago.</p>`);
});
exports.cambioEstado = onDocumentUpdated('estados/{codigo}', async e => { // se dispara al cambiar "estado" en la consola
  const a = e.data.before.data(), b = e.data.after.data(); if (a.estado === b.estado) return;
  const p = (await admin.firestore().doc('pedidos/' + e.params.codigo).get()).data(); if (!p) return;
  await mail(p.email, `Tu pedido ${e.params.codigo}: ${b.estado}`, `<p>Hola ${esc(p.nombre)}, tu pedido está ahora en: <b>${esc(b.estado)}</b>.</p>`);
});
exports.nuevaSolicitud = onDocumentCreated('solicitudes/{codigo}', async e => {
  const s = e.data.data();
  await mail(ADMIN_EMAIL, `Diseño a medida ${e.params.codigo}`, `<p>${esc(s.nombre)} · ${esc(s.email)} · ${esc(s.telefono)}</p><p>${esc(s.descripcion)}</p><p>Imágenes en Storage: ${esc((s.imagenes || []).join(', ') || 'ninguna')}</p>`);
});
