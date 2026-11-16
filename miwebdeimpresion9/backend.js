/* ============ Estudio Terra · backend.js ============ */
/* Si usas Firebase: mantén tu configuración actual. Si no, este stub funciona con Netlify Forms + localStorage para el seguimiento. */

const ESTADOS = ['Reserva recibida', 'Pago confirmado', 'En preparación', 'Enviado', 'Entregado'];

const BACKEND = {
  // Guarda la reserva (Netlify Forms + localStorage para consulta)
  async saveOrder(formEl, order) {
    // Netlify Forms: se envía con el propio submit del form
    try {
      const fd = new FormData(formEl);
      fd.append('form-name', 'reservas-3d');
      const r = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(fd).toString(),
      });
      if (!r.ok) throw new Error('Netlify no respondió');
    } catch (e) {
      console.warn('Netlify form falló, se guarda en localStorage:', e);
    }
    // Guardar para seguimiento local
    const key = 'orders3d';
    const all = JSON.parse(localStorage.getItem(key) || '[]');
    all.unshift({ ...order, estadoIdx: 0, createdAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(all));
    return { ok: true };
  },

  // Guarda una solicitud a medida
  async saveRequest(fd, meta, files) {
    try {
      fd.append('form-name', 'diseno-medida');
      const r = await fetch('/', {
        method: 'POST',
        body: fd,
      });
      if (!r.ok) throw new Error('Netlify no respondió');
    } catch (e) {
      console.warn('Netlify form falló, se guarda en localStorage:', e);
    }
    const key = 'requests3d';
    const all = JSON.parse(localStorage.getItem(key) || '[]');
    all.unshift({ ...meta, imagenes: files.map(f => f.name), createdAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(all));
    return { ok: true };
  },

  // Devuelve el estado actual de un pedido
  async getStatus(codigo, email) {
    const all = JSON.parse(localStorage.getItem('orders3d') || '[]');
    const o = all.find(x => x.codigo === codigo && (x.email || '').toLowerCase() === (email || '').toLowerCase());
    if (!o) throw new Error('not-found');
    return ESTADOS[o.estadoIdx || 0];
  },
};

window.BACKEND = BACKEND;
window.ESTADOS = ESTADOS;