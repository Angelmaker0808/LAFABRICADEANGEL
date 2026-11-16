/* ============ backend.js · capa de conexión (Netlify hoy, Firebase cuando quieras) ============
   Para pasar a Firebase: 1) rellena FIREBASE_CONFIG  2) cambia BACKEND_MODE a 'firebase'.
   El resto de la web no cambia. Guía en ../firebase-backend/LEEME.md */
const BACKEND_MODE = 'netlify'; // 'netlify' | 'firebase'
const FIREBASE_CONFIG = { apiKey: '', authDomain: '', projectId: '', storageBucket: '', appId: '' };
const ESTADOS = ['Pedido enviado', 'Esperando pago', 'Pago confirmado', 'Elaborando', 'Enviando', 'Recibido'];

const loadScript = src => new Promise((ok, ko) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = ko; document.head.append(s); });
let _fb;
async function fb() { // carga Firebase solo si se usa
  if (_fb) return _fb;
  for (const m of ['app', 'firestore', 'storage']) await loadScript(`https://www.gstatic.com/firebasejs/10.12.2/firebase-${m}-compat.js`);
  firebase.initializeApp(FIREBASE_CONFIG);
  return (_fb = { db: firebase.firestore(), st: firebase.storage(), ts: firebase.firestore.FieldValue.serverTimestamp });
}
const sha = async t => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t.trim().toLowerCase())))].map(b => b.toString(16).padStart(2, '0')).join('');
const viaNetlify = (form, multipart) => fetch('/', multipart ? { method: 'POST', body: form instanceof FormData ? form : new FormData(form) }
  : { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)) })
  .then(r => { if (!r.ok) throw new Error(r.status); });

const BACKEND = {
  /* Guarda una reserva. Firebase: crea pedidos/{codigo} (privado) y estados/{codigo} (consultable por el cliente) */
  async saveOrder(form, o) {
    if (BACKEND_MODE !== 'firebase') return viaNetlify(form);
    const { db, ts } = await fb(), b = db.batch();
    b.set(db.doc('pedidos/' + o.codigo), { ...o, creado: ts() });
    b.set(db.doc('estados/' + o.codigo), { estado: ESTADOS[0], emailHash: await sha(o.email), actualizado: ts() });
    return b.commit();
  },
  /* Guarda una solicitud de diseño a medida con imágenes opcionales */
  async saveRequest(form, o, files) {
    if (BACKEND_MODE !== 'firebase') return viaNetlify(form, true);
    const { db, st, ts } = await fb();
    const imagenes = await Promise.all(files.map(async (f, i) => { const r = st.ref(`disenos/${o.codigo}/${i}-${f.name}`); await r.put(f); return r.fullPath; }));
    return db.doc('solicitudes/' + o.codigo).set({ ...o, imagenes, creado: ts() });
  },
  /* Estado de un pedido: solo si coinciden código y correo. Devuelve el texto o null */
  async getStatus(codigo, email) {
    if (BACKEND_MODE !== 'firebase') throw new Error('off');
    const { db } = await fb(), d = await db.doc('estados/' + codigo.toUpperCase().trim()).get();
    return d.exists && d.data().emailHash === await sha(email) ? d.data().estado : null;
  }
};
