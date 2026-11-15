/* ============ Mi Estudio 3D · lógica de tienda (vanilla JS) ============ */

/* ---------- ✏️ EDITA AQUÍ TUS CATEGORÍAS Y PRODUCTOS ----------
   cat: id de categoría (la de temporada es 'navidad'; cambia o quita sus productos cuando acabe la campaña)
   price: precio base en € (tamaño pequeño) | img: foto .jpg en la carpeta img/ | desc: descripción corta */
const CATS = [
  { id: 'navidad', name: 'Navidad' },            // ← temporada
  { id: 'decoracion', name: 'Decoración' }, { id: 'organizacion', name: 'Organización' }, { id: 'llaveros', name: 'Llaveros' },
  { id: 'litofanias', name: 'Litofanías' }, { id: 'iluminacion', name: 'Iluminación' }, { id: 'estatuas', name: 'Estatuas' },
  { id: 'cofrade', name: 'Cofrade' }, { id: 'tecnologia', name: 'Tecnología' }
];
const PRODUCTS = [
  { id: 'arbol',  cat: 'navidad',      name: 'Árbol low-poly',       price: 16, img: 'img/arbol.jpg',  desc: 'Árbol facetado de sobremesa.' },
  { id: 'reno',   cat: 'navidad',      name: 'Reno decorativo',      price: 19, img: 'img/reno.jpg',   desc: 'Reno de líneas limpias para estantería o árbol.' },
  { id: 'bola',   cat: 'navidad',      name: 'Bola con tu nombre',   price: 14, img: 'img/bola.jpg',   desc: 'Adorno para colgar personalizado.' },
  { id: 'jarron', cat: 'decoracion',   name: 'Jarrón en espiral',    price: 22, img: 'img/jarron.jpg', desc: 'Jarrón de líneas suaves, aspecto de capas.' },
  { id: 'organizador', cat: 'organizacion', name: 'Organizador de escritorio', price: 18, img: 'img/organizador.jpg', desc: 'Compartimentos para bolis, notas y clips.' },
  { id: 'llavero', cat: 'llaveros',    name: 'Llavero con nombre',   price: 6,  img: 'img/llavero.jpg', desc: 'Llavero personalizado con el texto que elijas.' },
  { id: 'litofania', cat: 'litofanias', name: 'Litofanía personalizada', price: 24, img: 'img/litofania.jpg', desc: 'Tu foto grabada en relieve que se ve al trasluz.' },
  { id: 'lampara', cat: 'iluminacion', name: 'Lámpara facetada',    price: 32, img: 'img/lampara.jpg', desc: 'Pantalla de diseño que difunde la luz.' },
  { id: 'dragon', cat: 'estatuas',     name: 'Dragón articulado',    price: 29, img: 'img/dragon.jpg', desc: 'Cuerpo flexible con articulaciones impresas.' },
  { id: 'busto',  cat: 'estatuas',     name: 'Busto clásico',        price: 38, img: 'img/busto.jpg',  desc: 'Busto de estilo escultórico listo para pintar.' },
  { id: 'cruz',   cat: 'cofrade',      name: 'Cruz de guía en miniatura', price: 21, img: 'img/cruz.jpg', desc: 'Miniatura detallada para coleccionistas.' },
  { id: 'soporte', cat: 'tecnologia',  name: 'Soporte de móvil',     price: 12, img: 'img/soporte.jpg', desc: 'Soporte estable para mesa o mesilla.' }
];

/* ✏️ Colores y tamaños (extra = suma al precio base en €; 0 si es solo informativo) */
const COLORS = ['Blanco mate', 'Negro', 'Gris resina', 'Sin pintar', 'Color personalizado (indícalo en notas)'];
const SIZES  = [{ label: 'Pequeño · 10 cm', extra: 0 }, { label: 'Mediano · 15 cm', extra: 12 }, { label: 'Grande · 20 cm', extra: 28 }];

/* ---------- Utilidades ---------- */
const $ = s => document.querySelector(s);
const eur = n => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n);
const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// Imagen de respaldo (capas de impresión) si tu .jpg aún no existe
const PH = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="#eef1f2"/>' + Array.from({ length: 40 }, (_, i) => `<rect y="${i * 10}" width="400" height="4" fill="#dde2e5"/>`).join('') + '<text x="200" y="210" font-family="sans-serif" font-size="20" fill="#667078" text-anchor="middle">Tu foto .jpg aquí</text></svg>');
const genCode = p => p + '-' + Array.from({ length: 4 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 34)]).join('');
const img = (src, alt) => `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" onerror="this.onerror=null;this.src='${PH}'">`;

/* ---------- Carrito en localStorage ---------- */
const load = () => { try { return JSON.parse(localStorage.getItem('cart3d')) || []; } catch { return []; } };
const save = c => { localStorage.setItem('cart3d', JSON.stringify(c)); badge(); };
const total = c => c.reduce((s, i) => s + i.price * i.qty, 0);
function badge() { const b = $('#badge'); if (b) b.textContent = load().reduce((s, i) => s + i.qty, 0); }
function toast(msg) {
  let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); }
  t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2200);
}
badge();

/* ---------- Catálogo, carrusel y modal (index.html) ---------- */
if ($('#grid')) {
  const catName = id => CATS.find(c => c.id === id).name;
  const card = p => `<article class="card">${p.cat === 'navidad' ? '<span class="tag">Navidad</span>' : ''}<div class="ph" data-id="${p.id}">${img(p.img, p.name)}</div>
    <div class="info"><small class="catname">${catName(p.cat)}</small><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p><span class="price">Desde ${eur(p.price)}</span>
    <button class="btn" data-id="${p.id}">Configurar y Reservar</button></div></article>`;
  let cat = 'todo', q = '';
  const draw = () => {
    const l = PRODUCTS.filter(p => (cat === 'todo' || p.cat === cat) && (p.name + p.desc).toLowerCase().includes(q));
    $('#grid').innerHTML = l.length ? l.map(card).join('') : '<p class="muted">Aún no hay modelos en esta categoría.</p>';
  };
  const chip = (id, n, c) => `<button class="chip" data-cat="${id}" aria-pressed="${id === cat}">${n}<small>${c}</small></button>`;
  $('#chips').innerHTML = chip('todo', 'Todo', PRODUCTS.length) + CATS.map(c => chip(c.id, c.name, PRODUCTS.filter(p => p.cat === c.id).length)).join('');
  $('#chips').onclick = e => { const b = e.target.closest('.chip'); if (!b) return; cat = b.dataset.cat; document.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', x === b)); draw(); };
  $('#q').oninput = e => { q = e.target.value.trim().toLowerCase(); draw(); };
  draw();
  $('#rail').innerHTML = PRODUCTS.filter(p => p.cat === 'navidad').map(card).join('');
  $('#rail-prev').onclick = () => $('#rail').scrollBy({ left: -$('#rail').clientWidth * .8, behavior: 'smooth' });
  $('#rail-next').onclick = () => $('#rail').scrollBy({ left: $('#rail').clientWidth * .8, behavior: 'smooth' });
  $('#m-color').innerHTML = COLORS.map(c => `<option>${esc(c)}</option>`).join('');
  $('#m-size').innerHTML = SIZES.map((s, i) => `<option value="${i}">${esc(s.label)}${s.extra ? ` (+${eur(s.extra)})` : ''}</option>`).join('');
  let cur;
  const unit = () => cur.price + SIZES[$('#m-size').value].extra;
  const refresh = () => $('#m-price').textContent = `${eur(unit())} por unidad · ${eur(unit() * Math.max(1, +$('#m-qty').value || 1))}`;
  document.addEventListener('click', e => {
    const el = e.target.closest('.card [data-id]'); if (!el) return;
    cur = PRODUCTS.find(p => p.id === el.dataset.id);
    $('#m-img').outerHTML = img(cur.img, cur.name).replace('<img', '<img id="m-img"');
    $('#m-name').textContent = cur.name; $('#m-desc').textContent = cur.desc;
    $('#m-qty').value = 1; $('#m-notes').value = ''; $('#m-color').selectedIndex = 0; $('#m-size').selectedIndex = 0;
    refresh(); $('#modal').showModal();
  });
  ['#m-qty', '#m-size'].forEach(s => $(s).addEventListener('input', refresh));
  $('#close').onclick = () => $('#modal').close();
  $('#modal').addEventListener('click', e => { if (e.target.id === 'modal') e.target.close(); });
  $('#m-add').onclick = () => {
    const qty = Math.max(1, parseInt($('#m-qty').value) || 1), size = SIZES[$('#m-size').value];
    const item = { id: cur.id, name: cur.name, img: cur.img, qty, color: $('#m-color').value, size: size.label, notes: $('#m-notes').value.trim(), price: cur.price + size.extra };
    const cart = load(), same = cart.find(i => ['id', 'color', 'size', 'notes'].every(k => i[k] === item[k]));
    same ? same.qty += qty : cart.push(item);
    save(cart); $('#modal').close(); toast(`${cur.name} añadido al carrito`);
  };
}

/* ---------- Diseño a medida (modal en index.html) ---------- */
if ($('#medida-form')) {
  const dlg = $('#dlg-medida'), mf = $('#medida-form'), err = $('#medida-err');
  document.querySelectorAll('[data-open=medida]').forEach(b => b.onclick = () => dlg.showModal());
  dlg.querySelector('[data-close]').onclick = () => dlg.close();
  mf.addEventListener('submit', async e => {
    e.preventDefault(); err.hidden = true;
    const files = [...mf.querySelectorAll('input[type=file]')].map(i => i.files[0]).filter(Boolean);
    if (files.some(f => !f.type.startsWith('image/') || f.size > 5e6) || files.reduce((t, f) => t + f.size, 0) > 7.5e6) { err.textContent = 'Usa imágenes de hasta 5 MB cada una (7 MB en total).'; err.hidden = false; return; }
    const code = genCode('DIS'), btn = $('#medida-send'); mf.codigo.value = code; btn.disabled = true; btn.textContent = 'Enviando…';
    try {
      await BACKEND.saveRequest(mf, { codigo: code, nombre: mf.nombre.value, email: mf.email.value, telefono: mf.telefono.value, descripcion: mf.descripcion.value }, files);
      mf.hidden = true; $('#medida-code').textContent = code; $('#medida-ok').hidden = false;
    } catch (x) { err.textContent = `No se pudo enviar (${x.message || 'sin conexión'}). Inténtalo de nuevo.`; err.hidden = false; btn.disabled = false; btn.textContent = 'Enviar solicitud'; }
  });
}

/* ---------- Carrito (carrito.html) ---------- */
if ($('#cart')) {
  const draw = () => {
    const c = load();
    $('#go').style.display = c.length ? '' : 'none';
    $('#cart').innerHTML = c.length ? c.map((i, n) => `<div class="line">${img(i.img, i.name)}
      <div><strong>${esc(i.name)}</strong><small>Color: ${esc(i.color)} · Tamaño: ${esc(i.size)}</small>
      ${i.notes ? `<small>Notas: ${esc(i.notes)}</small>` : ''}<small>${eur(i.price)} / unidad</small>
      <div class="qty"><button data-a="-" data-n="${n}" aria-label="Menos">−</button><span>${i.qty}</span><button data-a="+" data-n="${n}" aria-label="Más">+</button><button class="rm" data-a="x" data-n="${n}">Eliminar</button></div></div>
      <div class="sub">${eur(i.price * i.qty)}</div></div>`).join('') + `<p class="total">Total estimado: ${eur(total(c))}</p>`
      : '<p class="muted">Tu carrito está vacío. Elige un modelo en el catálogo.</p>';
  };
  $('#cart').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const c = load(), i = c[b.dataset.n];
    if (b.dataset.a === '+') i.qty++; else if (b.dataset.a === '-') i.qty--;
    if (b.dataset.a === 'x' || i.qty < 1) c.splice(b.dataset.n, 1);
    save(c); draw();
  });
  draw();
}

/* ---------- Finalizar (finalizar.html) ---------- */
if ($('#form')) {
  const cart = load();
  if (!cart.length) { $('#form').outerHTML = '<div><h1>Tu carrito está vacío</h1><a class="btn" href="index.html">Ir al catálogo</a></div>'; $('.summary').hidden = true; }
  else {
    $('#sum').innerHTML = cart.map(i => `<p><span>${i.qty} × ${esc(i.name)}<br><small class="muted">${esc(i.color)} · ${esc(i.size)}</small></span><span>${eur(i.price * i.qty)}</span></p>`).join('') + `<p class="total">${eur(total(cart))}</p>`;
    $('#form').addEventListener('submit', async e => {
      e.preventDefault();
      const f = e.target, code = genCode('RES'), btn = $('#send'), err = $('#err');
      err.hidden = true;
      // Desglose legible del pedido para el email de Netlify
      f.codigo.value = code; f.total.value = eur(total(cart));
      f.pedido.value = cart.map((i, n) => `${n + 1}. ${i.name} | Cantidad: ${i.qty} | Color: ${i.color} | Tamaño: ${i.size} | Notas: ${i.notes || '-'} | ${eur(i.price)} x ${i.qty} = ${eur(i.price * i.qty)}`).join('\n') + `\nTOTAL ESTIMADO: ${eur(total(cart))}`;
      const order = { codigo: code, nombre: f.nombre.value, email: f.email.value, telefono: f.telefono.value,
        direccion: { calle: f.calle.value, cp: f.cp.value, ciudad: f.ciudad.value, provincia: f.provincia.value }, items: cart, total: total(cart) };
      btn.disabled = true; btn.textContent = 'Enviando…';
      try {
        await BACKEND.saveOrder(f, order); // Netlify o Firebase según backend.js
        $('#track').href = `seguimiento.html?codigo=${code}&email=${encodeURIComponent(f.email.value)}`;
        localStorage.removeItem('cart3d'); badge();
        $('#code').textContent = code; $('#checkout').hidden = true; $('#done').hidden = false; scrollTo(0, 0);
      } catch (x) {
        err.textContent = `No se pudo enviar la reserva (${x.message || 'sin conexión'}). Revisa tu conexión e inténtalo de nuevo.`; err.hidden = false;
        btn.disabled = false; btn.textContent = 'Enviar reserva';
      }
    });
    $('#copy').onclick = () => navigator.clipboard.writeText($('#code').textContent).then(() => toast('Código copiado'));
  }
}

/* ---------- Seguimiento del pedido (seguimiento.html) ---------- */
if ($('#track-form')) {
  const f = $('#track-form'), out = $('#track-out'), q = new URLSearchParams(location.search);
  f.codigo.value = q.get('codigo') || ''; f.email.value = q.get('email') || '';
  f.addEventListener('submit', async e => {
    e.preventDefault(); out.textContent = 'Buscando…';
    try {
      const n = ESTADOS.indexOf(await BACKEND.getStatus(f.codigo.value, f.email.value));
      out.innerHTML = n < 0 ? '<p class="error">No encontramos ese pedido. Revisa el código y el correo.</p>'
        : `<ol class="steps-track">${ESTADOS.map((s, i) => `<li class="${i < n ? 'done' : i === n ? 'now' : ''}">${s}</li>`).join('')}</ol>`;
    } catch (x) { out.innerHTML = `<p class="error">${x.message === 'off' ? 'El seguimiento aún no está activado en esta tienda.' : 'No se pudo consultar el estado. Inténtalo en unos minutos.'}</p>`; }
  });
  if (f.codigo.value && f.email.value) f.requestSubmit();
}

/* ---------- Extras visuales ---------- */
if ($('#hero-art')) { // figura hecha de capas, como una impresión 3D
  $('#hero-art').innerHTML = '<svg viewBox="0 0 300 360" role="img" aria-label="Figura impresa en capas">' + Array.from({ length: 36 }, (_, i) => {
    const w = 60 + 70 * Math.abs(Math.sin(i / 5.2)) + (i > 28 ? (i - 28) * 8 : 0), h = 8;
    return `<rect x="${150 - w}" y="${330 - i * 9}" width="${w * 2}" height="${h}" rx="4" fill="hsl(${14 + i * 1.4} 55% ${74 - i * .2}%)"/>`;
  }).join('') + '</svg>';
}
const prog = $('#prog');
if (prog) addEventListener('scroll', () => prog.style.width = (scrollY / (document.documentElement.scrollHeight - innerHeight) * 100) + '%', { passive: true });
const io = new IntersectionObserver(es => es.forEach(x => x.isIntersecting && (x.target.classList.add('in'), io.unobserve(x.target))), { threshold: .15 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));
