/* ============ backend.js · conexión con Google Apps Script ============ */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzwEqvkJghnw2G8zvIb_rbcc9L4XLJecMD3kgsVS2pgNvBATSOfDhDj-ncYgZ7uAbP2/exec';

const ESTADOS = ['Pedido enviado', 'Esperando pago', 'Pago confirmado', 'Elaborando', 'Enviando', 'Recibido'];

async function postToAppsScript(payload) {
  // mode: 'no-cors' -> el navegador envía el POST aunque no pueda leer la respuesta
  await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  });
  // No podemos saber si falló o no (CORS), pero el POST se ha enviado
  return { ok: true };
}

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

 getStatus(codigo, email) {
  return new Promise((resolve, reject) => {
    const cbName = 'cb_' + Date.now();
    const script = document.createElement('script');
    window[cbName] = (data) => {
      delete window[cbName];
      script.remove();
      if (data && data.ok) resolve(data);
      else reject(new Error((data && data.error) || 'No encontrado'));
    };
    script.onerror = () => {
      delete window[cbName];
      reject(new Error('Error de red'));
    };
    script.src = APPS_SCRIPT_URL
      + '?action=status'
      + '&codigo=' + encodeURIComponent(codigo)
      + '&email=' + encodeURIComponent(email)
      + '&callback=' + cbName;
    document.body.appendChild(script);
    setTimeout(() => {
      if (window[cbName]) { delete window[cbName]; reject(new Error('Timeout')); }
    }, 10000);
  });
}
};
