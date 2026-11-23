/* ============ backend.js · conexión con Google Apps Script ============ */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKdeQBQUaWnz0p_zmIpcNLx5YaHuke7sTBX8LAXzLwAGEcIvOTFEQXkBCQxjbuC6KB/exec';

const ESTADOS = ['Reserva recibida','Enlace de pago enviado','Pago recibido','En fabricación','Enviado','Entregado','Cancelado'];

async function postToAppsScript(payload) {
  await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  });
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
  // ✅ CORREGIDO: Ahora se llama _jsonp (con guion bajo) para coincidir con la llamada
  _jsonp: (url) => new Promise((resolve, reject) => {
    const cb = 'cb_' + Math.random().toString(36).substr(2, 9);
    const script = document.createElement('script');
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error('Timeout'));
    }, 10000);
    
    const cleanup = () => {
      clearTimeout(timer);
      delete window[cb];
      if (script.parentNode) script.parentNode.removeChild(script);
    };
    
    window[cb] = (data) => {
      cleanup();
      resolve(data);
    };
    
    script.onerror = () => {
      cleanup();
      reject(new Error('Error de red'));
    };
    
    script.src = url + (url.includes('?') ? '&' : '?') + 'callback=' + cb;
    document.head.appendChild(script);
  }),

  getStatus: async (codigo, email) => {
    const url = `${APPS_SCRIPT_URL}?action=status&codigo=${encodeURIComponent(codigo)}&email=${encodeURIComponent(email)}`;
    const data = await BACKEND._jsonp(url);
    if (!data || !data.ok) throw new Error((data && data.error) || 'No encontrado');
    return data;
  },

  saveOrder: async (form, order) => {
    const r = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(order),
      redirect: 'follow'
    });
    if (!r.ok) throw new Error('Error al guardar el pedido');
    return r.json();
  },

  saveRequest: async (form, o, files) => {
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
  }
};
