/* ============ backend.js · conexión con Google Apps Script ============ */

// ⬇️ PEGA AQUÍ LA URL DE TU APPS SCRIPT DESPLEGADO
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzUcziKWgUSGK3q5iEKaNyGpXK0Bh_Xd7SbETDrnDdJchDaZ0D4vNiQ_A54vTQOmGfE/exec';

const ESTADOS = ['Pedido enviado', 'Esperando pago', 'Pago confirmado', 'Elaborando', 'Enviando', 'Recibido'];

async function postToAppsScript(payload) {
  const r = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  });
  const data = await r.json();
  if (!data.ok) throw new Error(data.error || 'Error al enviar');
  return data;
}

// Se llama desde el formulario de contacto de app.js
async function viaNetlify(form) {
  const d = Object.fromEntries(new FormData(form).entries());
  return postToAppsScript({
    type: 'contact',
    codigo: '—',
    nombre: d.nombre || '',
    email: d.email || '',
    telefono: '',
    direccion: '',
    items: [],
    total: '',
    notas: (d.asunto ? 'Asunto: ' + d.asunto + '\n' : '') + (d.mensaje || '')
  });
}

const BACKEND = {
  async saveOrder(form, o) {
    const items = (o.items || []).map(i => ({
      qty: i.qty, name: i.name, color: i.color, size: i.size,
      price: i.price, files: i.files || []
    }));
    return postToAppsScript({
      type: 'order',
      codigo: o.codigo,
      nombre: o.nombre,
      email: o.email,
      telefono: o.telefono,
      direccion: Object.values(o.direccion || {}).filter(Boolean).join(', '),
      items: items,
      total: o.total + ' €',
      notas: o.notas || '',
      files: items.flatMap(i => i.files || [])
    });
  },

  async saveRequest(form, o, files) {
    return postToAppsScript({
      type: 'request',
      codigo: o.codigo,
      nombre: o.nombre,
      email: o.email,
      telefono: o.telefono,
      direccion: '',
      items: [],
      total: '',
      notas: (o.tipo ? 'Tipo: ' + o.tipo + '\n' : '') + (o.descripcion || ''),
      files: (files || []).map(f => f.name)
    });
  },

  async getStatus(codigo, email) {
    throw new Error('off');
  }
};
