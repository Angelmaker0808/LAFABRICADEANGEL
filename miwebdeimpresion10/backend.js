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
  // JSONP helper - evita problemas de CORS con Apps Script
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
    const url = `${BACKEND_URL}?action=status&codigo=${encodeURIComponent(codigo)}&email=${encodeURIComponent(email)}`;
    const data = await BACKEND._jsonp(url);
    if (!data.ok) throw new Error(data.error || 'No encontrado');
    return data;
  },

  saveOrder: async (form, order) => {
    const r = await fetch(BACKEND_URL, {
      method: 'POST',
      body: JSON.stringify(order),
      redirect: 'follow'  // <-- CLAVE: sigue la redirección de Apps Script
    });
    if (!r.ok) throw new Error('Error al guardar');
    return r.json();
  },

  saveRequest: async (form, data, files) => {
    // ... tu código existente
  }
};

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
