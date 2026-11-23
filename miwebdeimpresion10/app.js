/* ============ Estudio Terra · app.js (vanilla) ============ */

const SITE = { name: 'Estudio Terra', email: 'hola@estudioterra.com',
  announce: [['Colección Navidad', 'Piezas limitadas de temporada'], ['Encargos antes del 15/12', 'Llega a tiempo a casa'], ['Envío gratis', 'En pedidos +40 €']] };
const FREE_SHIP = 40;
const CAT_EMOJI = { navidad: '🎄', decoracion: '🏺', organizacion: '📎', llaveros: '🔑', litofanias: '🖼️', iluminacion: '💡', estatuas: '🗿', cofrade: '✝️', tecnologia: '🎧' };
const HERO = ['lampara-luna-ilum', 'litofania-corazon', 'estatua-dragon'];
const CAT_TINT = { navidad: '#E3F1EA', decoracion: '#EEF0FF', organizacion: '#E6F2FB', llaveros: '#FFEFE5', litofanias: '#FFF6D6', iluminacion: '#FFF6D6', estatuas: '#ECEBFA', cofrade: '#F3E8F4', tecnologia: '#E6F2FB' };
const HOME_CATS = ['litofanias', 'iluminacion', 'llaveros', 'estatuas'];
const PROMOS = {
  estatua: { emoji: '🗿', tone: 'lav', title: 'Tu foto, convertida en estatua', text: 'Envíanos una imagen y la transformamos en una figura 3D.' },
  nombre: { emoji: '🔑', tone: 'mint', title: 'Hazlo con tu nombre', text: 'Llaveros y más productos personalizados con tu nombre o frase.' },
  cartel: { emoji: '💡', tone: 'lemon', title: 'Cartelería luminosa', text: 'Tu nombre, logo o frase con luz propia.' },
  clicker: { emoji: '👆', tone: 'peach', title: 'Clicker personalizado', text: 'Cuéntanos cómo lo quieres y lo fabricamos.' }
};
const COLORS = ['Hueso', 'Terracota', 'Verde pino', 'Negro mate'];
const S3 = [{ label: 'S', delta: 0 }, { label: 'M', delta: 4 }, { label: 'L', delta: 8 }], S1 = [{ label: 'Único', delta: 0 }];

const GENERADORES = {
  estatua: {
    emoji: '🗿', nombre: 'Estatua a partir de tu foto', sub: 'Envíanos una imagen y la transformamos en una figura 3D.',
    precioBase: 29, sizes: S3,
    desc: 'Un generador que convierte cualquier foto en una escultura de sobremesa. No necesitas saber modelar: nosotros nos encargamos de todo. Tú eliges la imagen y el tamaño, y te enviamos un boceto antes de imprimir.',
    necesitas: ['Una foto nítida y bien iluminada', 'Tamaño que quieres (S, M o L)', 'Si es para regalo o para ti', 'Notas: expresión, detalle, etc.'],
    pasos: ['Configura el tamaño y añade tus fotos de referencia', 'Añade la pieza al carrito y reserva sin pagar', 'Te enviamos una propuesta con precio final y plazo', 'Modelamos, imprimimos y te la enviamos'],
    consejos: ['Usa una foto bien iluminada, con fondo simple y sin sombras duras.', 'Retratos de frente o tres cuartos funcionan mejor que perfiles extremos.', 'Cuanta más resolución tenga la foto, mejor será el resultado final.', 'Si dudas, envíanos varias fotos: elegimos la que mejor se adapte.', 'Para figuras de cuerpo entero, avísanos en las notas y lo valoramos.'],
    guias: [{ t: 'Cómo elegir la foto', p: 'Contraste, foco y fondo limpio son lo más importante. Evita fotos borrosas o con mucho ruido.' }, { t: 'Qué tamaño elegir', p: 'S es ideal para escritorio; M para estantería; L para un regalo grande o escaparate.' }, { t: 'Plazos', p: 'Al ser un trabajo a medida, suele tardar entre 7 y 14 días desde la aprobación del boceto.' }]
  },
  nombre: {
    emoji: '🔑', nombre: 'Producto con tu nombre', sub: 'Llaveros y más productos personalizados con tu nombre o frase.',
    precioBase: 7.5, sizes: S1,
    desc: 'Un generador para poner tu nombre, el de alguien especial o una frase corta en piezas pequeñas: llaveros, colgantes, marcapáginas y más. Ideal para regalos únicos y detalles.',
    necesitas: ['El nombre o la frase exacta', 'El tipo de pieza (llavero, colgante…)', 'Un color de los disponibles', 'Notas con cualquier detalle extra'],
    pasos: ['Configura color y añade la frase en las notas', 'Añade la pieza al carrito y reserva', 'Te confirmamos la propuesta con precio final', 'Lo fabricamos y lo enviamos'],
    consejos: ['Escribe el texto exactamente como lo quieres, con mayúsculas y tildes.', 'Para nombres largos, elige tamaños más grandes o divide en dos líneas.', 'Los colores oscuros con letras claras contrastan mejor en piezas pequeñas.', 'Si es un regalo, avísanos: preparamos un packaging especial.'],
    guias: [{ t: 'Cómo escribir el texto', p: 'Cuida tildes y mayúsculas. Si quieres una tipografía concreta, indícalo en las notas.' }, { t: 'Materiales', p: 'PLA+ para uso decorativo. Si va a recibir tirones, avísanos y usamos PETG.' }, { t: 'Plazos', p: 'Piezas pequeñas suelen estar listas en 3-5 días laborables.' }]
  },
  cartel: {
    emoji: '💡', nombre: 'Cartelería luminosa', sub: 'Tu nombre, logo o frase con luz propia.',
    precioBase: 39, sizes: S3,
    desc: 'Un generador de carteles y letreros luminosos con LED. Perfecto para habitaciones, negocios o como regalo llamativo. La luz se puede cambiar de color en muchos modelos.',
    necesitas: ['El texto o el logo exacto', 'Medidas orientativas o el uso', 'Si lo quieres con enchufe o USB', 'Notas con colores o estilo'],
    pasos: ['Elige el tamaño y añade referencias en las notas', 'Añade la pieza al carrito y reserva', 'Te enviamos una propuesta con medidas y precio', 'Lo fabricamos y lo enviamos listo para enchufar'],
    consejos: ['Mándanos el logo en vector (SVG, PDF o AI) si lo tienes; si no, una foto nítida.', 'Para textos largos, elige tamaños M o L: se lee mejor y la luz se distribuye mejor.', 'Indica si lo quieres con enchufe, USB o batería.', 'Dinos si va a ir en interior o exterior para usar el material adecuado.'],
    guias: [{ t: 'Cómo preparar el logo', p: 'Lo ideal es un vector. Si no lo tienes, una imagen limpia y con buen contraste sirve.' }, { t: 'Tamaños recomendados', p: 'S para escritorio, M para pared pequeña, L para pared grande o negocio.' }, { t: 'Plazos', p: 'Al llevar LED y montaje, suele tardar entre 5 y 10 días laborables.' }]
  },
  clicker: {
    emoji: '👆', nombre: 'Clicker personalizado', sub: 'Cuéntanos cómo lo quieres y lo fabricamos.',
    precioBase: 15, sizes: S1,
    desc: 'Un generador para crear un clicker a medida. Nos cuentas forma, tamaño, si es para uso propio o para un evento, y lo diseñamos contigo. Es una pieza única, no un producto de catálogo.',
    necesitas: ['Para qué lo vas a usar', 'Cómo lo imaginas (forma, color, texto)', 'Si es una unidad o varias', 'Notas con cualquier detalle'],
    pasos: ['Configura color y añade ideas en las notas', 'Añade la pieza al carrito y reserva', 'Te enviamos una propuesta con boceto', 'Lo fabricamos y lo enviamos'],
    consejos: ['Cuéntanos si es para uso propio, para un evento o para un regalo.', 'Si es para varias personas, dinos cuántas y lo valoramos en conjunto.', 'Adjunta fotos de referencia si tienes algo parecido en mente.', 'Los clickers personalizados no admiten devolución salvo defecto.'],
    guias: [{ t: 'Cómo describirlo', p: 'Forma, tamaño, si lleva texto, si es para uso diario o para un evento puntual.' }, { t: 'Materiales', p: 'PLA+ por defecto. Si va a recibir mucho uso, indícalo y usamos PETG.' }, { t: 'Plazos', p: 'Piezas a medida: 5-7 días laborables desde la aprobación del boceto.' }]
  }
};

const TIPOS = { general: 'Diseño a medida', estatua: 'Mi foto convertida en estatua', clicker: 'Clicker personalizado', nombre: 'Producto con mi nombre (llaveros y más)', cartel: 'Cartelería luminosa', otro: 'Otra idea' };

// AUTO-CATS-START
const CATS = [
  { id: 'navidad', name: 'Navidad', blurb: '' },
  { id: 'decoracion', name: 'Decoración', blurb: '' },
  { id: 'organizacion', name: 'Organización', blurb: '' },
  { id: 'llaveros', name: 'Llaveros', blurb: '' },
  { id: 'litofanias', name: 'Litofanías', blurb: '' },
  { id: 'iluminacion', name: 'Iluminación', blurb: '' },
  { id: 'estatuas', name: 'Estatuas', blurb: '' },
  { id: 'cofrade', name: 'Cofrade', blurb: '' },
  { id: 'tecnologia', name: 'Tecnología', blurb: '' }
];
// AUTO-CATS-END

const P = (id, name, price, emoji, cat, o = {}) => ({ id, name, price, emoji, cat, colors: COLORS, sizes: S1, ...o });
// AUTO-PRODUCTS-START
const PRODUCTS = [
  P('Bandejas-de-Arbol-Apilables', 'Bandejas de Arbol Apilables', 0.16, '📦', 'navidad', { colors: ["verde", "rojo", "azul", "blanco"], sizes: [{label:"Único",delta:0,price:0.16}] }),
  P('Bola-de-Papa-Noel', 'Bola de Papa Noel', 0.16, '📦', 'navidad', { colors: ["rojo", "azul"], sizes: [{label:"Único",delta:0,price:0.16}] }),
  P('Bola-de-Snoopy', 'Bola de Snoopy', 0.82, '📦', 'navidad', { colors: ["rojo", "azul", "verde"], sizes: [{label:"S:80X80X3",delta:0,price:0.82,filaments:[{filament:"PLA Hueso",grams:4},{filament:"PETG Negro mate",grams:4}],duration:"60"}, {label:"M:120X120X5",delta:0.58,price:1.4,filaments:[{filament:"PLA Hueso",grams:10},{filament:"PETG Negro mate",grams:10}],duration:"120"}] }),
  P('cuenco-de-arbol', 'Cuenco de Arbol', 0.16, '📦', 'navidad', { colors: ["verde", "blanco"], sizes: [{label:"Único",delta:0,price:0.16}] }),
  P('Bola-de-Stich', 'Bola de Stich', 0.82, '📦', 'navidad', { colors: ["rojo", "azul", "verde"], sizes: [{label:"S:80X80X3",delta:0,price:0.82,filaments:[{filament:"PLA Terracota",grams:4},{filament:"PETG Negro mate",grams:4}],duration:"60"}, {label:"M:120X120X5",delta:0.58,price:1.4,filaments:[{filament:"PLA Terracota",grams:10},{filament:"PETG Negro mate",grams:10}],duration:"120"}] }),
  P('Casa-Navideña-Kit', 'Casa Navideña Kit', 0.16, '📦', 'navidad', { colors: ["rojo", "azul", "verde"], sizes: [{label:"Único",delta:0,price:0.16}] }),
  P('Cuenco-de-Papa-Noel', 'Cuenco de Papa Noel', 0.16, '📦', 'navidad', { colors: ["único"], sizes: [{label:"Único",delta:0,price:0.16}] }),
  P('Jersey-Personalizable', 'Jersey Personalizable', 0.16, '📦', 'navidad', { colors: ["rojo", "azul", "verde"], sizes: [{label:"Único",delta:0,price:0.16}] }),
  P('Lazo-Navideño', 'Lazo Navideño', 0.16, '📦', 'navidad', { colors: ["rojo", "azul", "verde", "blanco"], sizes: [{label:"Único",delta:0,price:0.16}] }),
  P('Llavero-Navideño-Personalizado', 'Llavero Navideño Personalizado', 0.16, '📦', 'navidad', { colors: ["rojo", "azul", "verde"], sizes: [{label:"Único",delta:0,price:0.16}] }),
  P('Miniatura-Grinch', 'Miniatura Grinch', 0.16, '📦', 'navidad', { colors: ["único"], sizes: [{label:"Único",delta:0,price:0.16}] }),
  P('Reno-Minimalista', 'Reno Minimalista', 0.16, '📦', 'navidad', { colors: ["rojo", "azul", "verde", "blanco"], sizes: [{label:"Único",delta:0,price:0.16}] }),
  P('Silueta-de-Reno', 'Silueta de Reno', 0.16, '📦', 'navidad', { colors: ["rojo", "azul", "verde", "blanco"], sizes: [{label:"Único",delta:0,price:0.16}] })
];
// AUTO-PRODUCTS-END

const GUIDES = [
  { id: 'litofania', tag: 'Litofanías', title: 'Cómo elegir la foto perfecta para tu litofanía', intro: 'Una litofanía convierte una foto en relieve que se ve al trasluz. El resultado depende mucho de la imagen de partida.',
    points: ['Elige fotos con buen contraste entre luces y sombras.', 'Los retratos de cerca y con fondo sencillo funcionan mejor que las escenas llenas de detalle.', 'Evita fotos borrosas, muy oscuras o con mucho grano: en relieve se notan más.', 'Envíanos el archivo original, el de mayor tamaño que tengas, no una captura de WhatsApp.', 'Necesitará una luz detrás: una lámpara o una base iluminada cambian mucho el resultado.'] },
  { id: 'materiales', tag: 'Materiales', title: 'Material y acabado: cómo elegir', intro: 'Cada material se comporta distinto. Esta es una orientación general; si dudas, escríbelo en las notas y te recomendamos.',
    points: ['PLA: el más habitual en decoración. Rígido y con buen acabado, pero se deforma con calor (no lo dejes en un coche al sol).', 'PETG: más resistente a golpes y humedad, buena opción para piezas de uso diario.', 'Resina: permite más detalle en miniaturas y figuras pequeñas, pero es más frágil.', 'Los acabados mates disimulan mejor las líneas de capa que los brillantes.'] },
  { id: 'cuidado', tag: 'Cuidado', title: 'Cómo cuidar tus piezas impresas en 3D', intro: 'Con unos mínimos cuidados una pieza impresa dura años.',
    points: ['Límpiala con un paño suave, seco o ligeramente húmedo; para el polvo del relieve, una brocha suave.', 'No uses lavavajillas ni agua caliente.', 'Mantenla lejos de radiadores y del sol directo prolongado.', 'Las partes finas (antenas, alas, detalles) no están pensadas para soportar peso ni tirones.'] },
  { id: 'a-medida', tag: 'A medida', title: 'Cómo preparar tu pedido a medida', intro: 'Cuanta más información nos des, más rápido y mejor te podemos proponer una pieza.',
    points: ['Cuéntanos para qué la quieres y dónde va a estar (interior, exterior, si soportará peso).', 'Indica las medidas reales que necesitas, aunque sean aproximadas.', 'Adjunta fotos, bocetos o referencias, aunque estén dibujadas a mano.', 'Si lleva texto, escríbelo exactamente como lo quieres.', 'Dinos colores y tu presupuesto orientativo: te responderemos con una propuesta.'] }
];

const pg = document.body.dataset.page;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const eur = n => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n);
const esc = t => String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const genCode = p => p + '-' + Array.from({ length: 4 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 34)]).join('');
const byId = id => PRODUCTS.find(p => p.id === id), catOf = id => CATS.find(c => c.id === id);
const isGen = id => !!GENERADORES[id];
const genAsProduct = id => {
  const g = GENERADORES[id];
  if (!g) return null;
  return { id, name: g.nombre, price: g.precioBase, emoji: g.emoji, colors: COLORS, sizes: g.sizes || S1, desc: g.desc, esGenerador: true };
};
const pic = p => `<img src="img/${p.id}.jpg" alt="${esc(p.name)}" data-e="${p.emoji}" loading="lazy" onerror="phFix(this)">`;
function phFix(i) { const d = document.createElement('div'); d.className = 'ph'; d.textContent = i.dataset.e; i.replaceWith(d); }
const card = p => `<a class="card" style="--tint:${CAT_TINT[p.cat]}" href="producto.html?id=${p.id}"><div class="img">${pic(p)}${p.cat === 'navidad' ? '<span class="tag">Navidad</span>' : ''}</div>
  <div class="body"><span class="catname">${catOf(p.cat).name}</span><h3>${esc(p.name)}</h3><div class="price">Desde ${eur(p.price)}</div><span class="add">Añadir</span></div></a>`;
function toast(msg, link) {
  const t = $('#toast'); if(!t) return; t.innerHTML = esc(msg) + (link ? ` <a href="${link[0]}">${link[1]}</a>` : ''); t.classList.add('show');
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 3500);
}

const loadCart = () => { try { return JSON.parse(localStorage.getItem('cart3d')) || []; } catch { return []; } };
let cart = loadCart();
const count = () => cart.reduce((s, i) => s + i.qty, 0), total = () => cart.reduce((s, i) => s + i.price * i.qty, 0);
const badge = () => {
  const n = count(); $$('.badge').forEach(x => { x.textContent = n; x.hidden = !n; });
  const show = n > 0 && !['carrito', 'finalizar', 'producto', 'seguimiento'].includes(pg); let bar = $('#cartbar');
  if (show && !bar) { bar = document.createElement('a'); bar.id = 'cartbar'; bar.className = 'cartbar'; bar.href = 'carrito.html'; document.body.append(bar); }
  if (bar) { bar.hidden = !show; bar.innerHTML = `<span>Ver cesta · ${n} ${n === 1 ? 'artículo' : 'artículos'}</span><b>${eur(total())}</b>`; }
  document.body.classList.toggle('has-bar', show || pg === 'producto');
};
const saveCart = () => { localStorage.setItem('cart3d', JSON.stringify(cart)); badge(); };
function addItem(it) {
  const same = cart.find(i => ['id', 'color', 'size', 'notes'].every(k => i[k] === it[k]) && (i.files || []).join() === (it.files || []).join());
  same ? same.qty += it.qty : cart.push(it); saveCart();
}

const NAV = [['catalogo.html', 'Catálogo'], ['generadores.html', 'Generadores'], ['personalizado.html', 'A medida'], ['guias.html', 'Guías'], ['seguimiento.html', 'Sigue tu pedido']];
const links = NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join('');

const topEl = $('#top');
if (topEl) topEl.innerHTML = `<div class="announce"><div class="track" id="ann">${SITE.announce.map(([b, t]) => `<div class="slide"><b>${b}</b><span class="dot"></span><span>${t}</span></div>`).join('')}</div></div>
<div class="hbar"><header class="hdr container"><button class="burger" id="burger" aria-label="Menú" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button><a class="logo" href="index.html">Estudio <span>Terra</span></a>
<nav class="links" aria-label="Principal">${links}</nav><a class="cart-btn" href="carrito.html" aria-label="Cesta"><svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg><span class="tx">Cesta</span><span class="badge" hidden>0</span></a></header>
<nav class="mmenu container" id="mmenu" hidden>${links}</nav></div>`;

const burger = $('#burger');
if (burger) burger.onclick = e => { const m = $('#mmenu'); if(m) { m.hidden = !m.hidden; e.currentTarget.setAttribute('aria-expanded', !m.hidden); } };

(() => { let i = 0; const n = SITE.announce.length; if (n > 1 && !matchMedia('(prefers-reduced-motion:reduce)').matches) setInterval(() => { const ann = $('#ann'); if(ann) ann.style.transform = `translateX(-${(i = (i + 1) % n) * 100}%)`; }, 4200); })();

const bottomEl = $('#bottom');
if (bottomEl) bottomEl.innerHTML = `<footer class="ftr"><div class="container fgrid"><div><div class="flogo">${SITE.name}</div><p>Impresiones 3D en pequeñas series · Hecho con calma</p></div>
<div><h4>Tienda</h4><ul><li><a href="catalogo.html">Catálogo</a></li><li><a href="generadores.html">Generadores</a></li><li><a href="personalizado.html">Diseño a medida</a></li><li><a href="guias.html">Guías</a></li></ul></div>
<div><h4>Ayuda</h4><ul><li><a href="index.html#como">Cómo funciona</a></li><li><a href="faq.html">Preguntas frecuentes</a></li><li><a href="seguimiento.html">Sigue tu pedido</a></li><li><a href="contacto.html">Contacto</a></li><li><a href="nosotros.html">Sobre nosotros</a></li></ul></div>
<div><h4>Legal</h4><ul><li><a href="legal.html#privacidad">Privacidad</a></li><li><a href="legal.html#condiciones">Condiciones de reserva</a></li><li><a href="legal.html#envios">Envíos y devoluciones</a></li></ul></div></div>
<div class="container copy">© ${new Date().getFullYear()} ${SITE.name}. Todos los derechos reservados.</div></footer><div class="toast" id="toast" role="status"></div>`;
badge();

const chipsHTML = (cat) => ['todo', ...CATS.map(c => c.id)].map(id => `<button class="chip" data-cat="${id}" aria-pressed="${id === cat}">${id === 'todo' ? 'Todo' : catOf(id).name}<small>${id === 'todo' ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === id).length}</small></button>`).join('');

function customForm() {
  return `<form class="cform" id="custom-form"><div class="field"><label for="cf-tipo">¿Qué quieres pedir?</label><select id="cf-tipo" name="tipo">${Object.entries(TIPOS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select></div><div class="two"><div class="field"><label for="cf-n">Nombre *</label><input id="cf-n" name="nombre" required autocomplete="name"></div><div class="field"><label for="cf-e">Correo electrónico *</label><input id="cf-e" type="email" name="email" required autocomplete="email"></div></div>
  <div class="field"><label for="cf-t">Teléfono / WhatsApp <span class="opt-t">(opcional)</span></label><input id="cf-t" type="tel" name="telefono" autocomplete="tel"></div><input name="bot-field" tabindex="-1" autocomplete="off" hidden>
  <div class="field"><label for="cf-i">Describe tu idea *</label><textarea id="cf-i" name="idea" rows="5" required placeholder="Qué pieza tienes en mente, medidas, uso, colores…"></textarea></div>
  <div class="field"><label>Imágenes de referencia <span class="opt-t">(opcional · hasta 3 · 5 MB cada una)</span></label><div class="upl"><label class="drop" for="cf-files">＋ Añadir imágenes</label><input type="file" id="cf-files" accept="image/*" multiple hidden><div class="thumbs" id="cf-thumbs"></div></div></div>
  <label class="chk"><input type="checkbox" name="privacidad" required> Acepto que usen mis datos para gestionar esta solicitud (<a href="legal.html#privacidad" style="text-decoration:underline">privacidad</a>).</label>
  <p class="error" id="cf-err" role="alert" hidden></p><button class="btn big" id="cf-send">Enviar solicitud</button></form>`;
}
function initCustom(slot) {
  if (!slot) return;
  slot.innerHTML = customForm();
  const f = $('#custom-form'), err = $('#cf-err'); let files = []; const t0 = new URLSearchParams(location.search).get('tipo'); if (t0 && TIPOS[t0]) f.tipo.value = t0;
  const draw = () => { const th = $('#cf-thumbs'); if(th) th.innerHTML = files.map((x, i) => `<div class="thumb"><img src="${URL.createObjectURL(x)}" alt=""><button type="button" data-i="${i}" aria-label="Quitar">✕</button></div>`).join(''); };
  const cfFiles = $('#cf-files');
  if (cfFiles) cfFiles.onchange = e => {
    if (err) err.hidden = true;
    for (const x of e.target.files) { if (files.length >= 3) break; if (!x.type.startsWith('image/') || x.size > 5e6) { if(err) { err.textContent = 'Solo imágenes de hasta 5 MB (máximo 3).'; err.hidden = false; } continue; } files.push(x); }
    e.target.value = ''; draw();
  };
  const cfThumbs = $('#cf-thumbs');
  if (cfThumbs) cfThumbs.onclick = e => { const b = e.target.closest('button'); if (b) { files.splice(+b.dataset.i, 1); draw(); } };
  if (f) f.addEventListener('submit', async e => {
    e.preventDefault(); if (err) err.hidden = true;
    if (files.reduce((t, x) => t + x.size, 0) > 7.5e6) { if(err) { err.textContent = 'Las imágenes superan 7 MB en total.'; err.hidden = false; } return; }
    const code = genCode('DIS'), btn = $('#cf-send'), fd = new FormData();
    fd.append('form-name', 'diseno-medida'); fd.append('codigo', code); fd.append('privacidad', 'on');
    ['tipo', 'nombre', 'email', 'telefono', 'idea', 'bot-field'].forEach(k => fd.append(k, f[k].value));
    files.forEach((x, i) => fd.append('imagen' + (i + 1), x));
    if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }
    try {
      await BACKEND.saveRequest(fd, { codigo: code, tipo: TIPOS[f.tipo.value], nombre: f.nombre.value, email: f.email.value, telefono: f.telefono.value, descripcion: f.idea.value }, files);
      slot.innerHTML = `<div class="okbox"><h2 style="font-size:1.8rem">¡Solicitud recibida!</h2><p>Tu referencia:</p><div class="codebox" style="font-size:2rem">${code}</div><p>Te responderemos por correo con una propuesta.</p></div>`;
    } catch (x) { if(err) { err.textContent = `No se pudo enviar (${x.message || 'sin conexión'}). Inténtalo de nuevo.`; err.hidden = false; } if(btn) { btn.disabled = false; btn.textContent = 'Enviar solicitud'; } }
  });
}

if (pg === 'home') {
  const heroArt = $('#hero-art');
  if (heroArt) heroArt.innerHTML = '<svg viewBox="0 0 300 360" preserveAspectRatio="xMaxYMid meet">' + Array.from({ length: 36 }, (_, i) => { const w = 60 + 70 * Math.abs(Math.sin(i / 5.2)) + (i > 28 ? (i - 28) * 8 : 0); return `<rect x="${150 - w}" y="${330 - i * 9}" width="${w * 2}" height="8" rx="3" fill="hsl(${255 - i * 6} 75% ${70 + i * .4}%)"/>`; }).join('') + '</svg>';
  
  const feat = $('#feat');
  if (feat) feat.innerHTML = HERO.map(byId).filter(Boolean).map(card).join('');
  
  const xmas = $('#xmas-cards');
  if (xmas) xmas.innerHTML = PRODUCTS.filter(p => p.cat === 'navidad').slice(0, 3).map(p => `<a class="mini" href="producto.html?id=${p.id}"><div class="mc-img">${pic(p)}</div><div class="mc-name">${esc(p.name)}</div><div class="mc-price">Desde ${eur(p.price)}</div></a>`).join('');
  
  $$('[data-promo]').forEach(el => { const id = el.dataset.promo, m = PROMOS[id]; if(m) el.innerHTML = `<a class="promo" data-tone="${m.tone}" href="generadores.html?id=${id}"><div class="pm-img"><img src="img/promo-${id}.jpg" alt="" data-e="${m.emoji}" loading="lazy" onerror="phFix(this)"></div><div class="pm-txt"><b>${m.title}</b><span>${m.text}</span></div><span class="pm-go" aria-hidden="true">→</span></a>`; });
  
  const cats = $('#cats');
  if (cats) cats.innerHTML = HOME_CATS.map(catOf).map(c => `<a class="ctile" href="catalogo.html?cat=${c.id}"><div class="cimg" style="background:${CAT_TINT[c.id]}"><img src="img/cat-${c.id}.jpg" alt="" data-e="${CAT_EMOJI[c.id]}" loading="lazy" onerror="phFix(this)"></div><div class="cname"><b>${c.name}</b><span>${PRODUCTS.filter(p => p.cat === c.id).length}</span></div></a>`).join('');
  
  const guides = $('#home-guides');
  if (guides) guides.innerHTML = GUIDES.slice(0, 3).map(g => `<article class="gcard"><small>${g.tag}</small><h3>${g.title}</h3><p>${g.intro}</p><a href="guias.html#${g.id}">Leer guía</a></article>`).join('');
  
  let cat = 'todo';
  const draw = () => { 
    const l = (cat === 'todo' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat)).slice(0, 8); 
    const grid = $('#home-grid');
    if (grid) grid.innerHTML = l.length ? l.map(card).join('') : '<div class="empty">Aún no hay modelos en esta categoría.</div>'; 
    const all = $('#home-all');
    if (all) all.href = 'catalogo.html' + (cat === 'todo' ? '' : '?cat=' + cat); 
  };
  
  const chips = $('#home-chips');
  if (chips) {
    chips.innerHTML = chipsHTML(cat);
    chips.onclick = e => { const b = e.target.closest('.chip'); if (!b) return; cat = b.dataset.cat; $$('.chip', chips).forEach(x => x.setAttribute('aria-pressed', x === b)); draw(); };
  }
  draw();
}

if (pg === 'catalogo') {
  const u = new URLSearchParams(location.search); let cat = CATS.some(c => c.id === u.get('cat')) ? u.get('cat') : 'todo', q = u.get('q') || '', sort = 'rel';
  let cols = +localStorage.getItem('cols3d') || (innerWidth < 700 ? 2 : 3);
  const setCols = n => { cols = n; localStorage.setItem('cols3d', n); const grid = $('#grid'); if(grid) { grid.dataset.cols = n; grid.style.setProperty('--cols', n); } $$('#vt button').forEach(b => b.setAttribute('aria-pressed', +b.dataset.n === n)); };
  const vt = $('#vt');
  if (vt) vt.onclick = e => { const b = e.target.closest('button'); if (b) setCols(+b.dataset.n); }; setCols(cols);
  
  const qEl = $('#q'); if (qEl) qEl.value = q;
  const chipsEl = $('#chips'); if (chipsEl) chipsEl.innerHTML = chipsHTML(cat);
  
  const draw = () => {
    let l = PRODUCTS.filter(p => (cat === 'todo' || p.cat === cat) && (p.name + ' ' + (catOf(p.cat)?.name || '')).toLowerCase().includes(q.toLowerCase()));
    if (sort === 'asc') l.sort((a, b) => a.price - b.price); if (sort === 'desc') l.sort((a, b) => b.price - a.price); if (sort === 'name') l.sort((a, b) => a.name.localeCompare(b.name, 'es'));
    
    const title = $('#cat-title'); if (title) title.textContent = cat === 'todo' ? 'Catálogo' : catOf(cat).name;
    const desc = $('#cat-desc'); if (desc) desc.textContent = cat === 'todo' ? 'Series cortas. Cuando se agota un color, no vuelve.' : (catOf(cat)?.blurb || '');
    const count = $('#count'); if (count) count.textContent = `${l.length} ${l.length === 1 ? 'modelo' : 'modelos'}`;
    
    const grid = $('#grid');
    if (grid) grid.innerHTML = l.length ? l.map(card).join('') : '<div class="empty">No hay modelos que coincidan. <a href="personalizado.html" style="text-decoration:underline">¿Quieres pedirlo a medida?</a></div>';
    
    const p = new URLSearchParams(); if (cat !== 'todo') p.set('cat', cat); if (q) p.set('q', q); history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : ''));
  };
  
  if (chipsEl) chipsEl.onclick = e => { const b = e.target.closest('.chip'); if (!b) return; cat = b.dataset.cat; $$('.chip').forEach(x => x.setAttribute('aria-pressed', x === b)); draw(); };
  if (qEl) qEl.oninput = e => { q = e.target.value.trim(); draw(); };
  const sortEl = $('#sort'); if (sortEl) sortEl.onchange = e => { sort = e.target.value; draw(); };
  draw();
}

if (pg === 'producto') {
  const id = new URLSearchParams(location.search).get('id');
  const root = $('#prod');
  if (!root) return;
  const esGen = isGen(id);
  const p = esGen ? genAsProduct(id) : byId(id);
  if (!p) {
    root.innerHTML = '<div class="empty" style="margin:40px 0">No encontramos este producto. <a href="catalogo.html" style="text-decoration:underline">Volver al catálogo</a></div>';
  } else {
    document.title = `${p.name} · ${SITE.name}`;
    let color = p.colors[0], size = p.sizes[0], qty = 1;
    let genFiles = [];
    const crumb = esGen
      ? `<nav class="crumb"><a href="generadores.html">Generadores</a> / <span>${esc(p.name)}</span></nav>`
      : `<nav class="crumb"><a href="catalogo.html">Catálogo</a> / <a href="catalogo.html?cat=${p.cat}">${catOf(p.cat).name}</a></nav>`;
    const tagGen = esGen ? `<p class="gen-tag">Generador personalizado</p>` : '';
    const gallery = esGen
      ? `<div class="gen-ficha-gal">
           <div class="gen-ficha-img"><img src="img/gen-${id}-1.jpg" alt="" data-e="${p.emoji}" loading="lazy" onerror="phFix(this)"></div>
           <div class="gen-ficha-img"><img src="img/gen-${id}-2.jpg" alt="" data-e="${p.emoji}" loading="lazy" onerror="phFix(this)"></div>
           <div class="gen-ficha-img"><img src="img/gen-${id}-3.jpg" alt="" data-e="${p.emoji}" loading="lazy" onerror="phFix(this)"></div>
         </div>`
      : `<div class="pimg gal" style="--tint:${CAT_TINT[p.cat]}"><div class="gal-track" id="gal-track"><div class="gal-s">${pic(p)}</div></div><div class="gal-dots" id="gal-dots" hidden></div></div>`;
    const zonaImgs = esGen
      ? `<div class="opt"><label>Imágenes de referencia <span class="opt-t">(hasta 3 · 5 MB c/u)</span></label>
           <div class="upl"><label class="drop" for="gen-files">＋ Añadir imágenes</label><input type="file" id="gen-files" accept="image/*" multiple hidden><div class="thumbs" id="gen-thumbs"></div></div>
         </div>`
      : '';
    const notesLabel = esGen ? 'Notas para el diseño' : 'Notas de personalización';
    
    root.innerHTML = `<div class="pgrid"><div>${gallery}</div><div class="pinfo">
      ${crumb}
      <h1>${esc(p.name)}</h1>
      ${tagGen}
      <div class="pprice" id="pp"></div>
      <p class="lead">${esc(p.desc || (p.cat ? catOf(p.cat).blurb : ''))}</p>
      ${p.colors && p.colors.length > 1
      ? `<div class="opt"><label>Color</label><div class="pills" data-k="color">${p.colors.map((x, i) => `<button class="pill ${i ? '' : 'on'}" data-v="${esc(x)}">${esc(x)}</button>`).join('')}</div></div>`
      : `<div class="opt"><label>Color</label><p style="padding:8px 0;font-weight:600">${esc(p.colors && p.colors[0] || 'Hueso')}</p></div>`
      }
      <div class="opt" ${p.sizes.length < 2 ? 'hidden' : ''} id="size-selector-container">
        <label>Tamaño</label>
        <div class="pills" data-k="size">
          ${p.sizes.map((s, i) => `<button class="pill ${i ? '' : 'on'}" data-v="${i}">${esc(s.label)}</button>`).join('')}
        </div>
        <div id="size-details-box" style="margin-top: 12px; padding: 12px 16px; background: #F9FAFB; border-radius: 8px; border: 1px solid #E5E7EB; font-size: 13px; color: #4B5563; display: none;">
          <strong style="color: #111827; display: block; margin-bottom: 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">📐 Medidas y detalles:</strong>
          <span id="dims-v" style="font-weight: 600; color: #1F2937;"></span>
          <div id="size-extras" style="margin-top: 6px; font-size: 12px; color: #6B7280; border-top: 1px solid #E5E7EB; padding-top: 6px;"></div>
        </div>
      </div>
      <div class="opt"><label>Cantidad</label><div class="qty"><button id="qm" aria-label="Menos">−</button><span id="qv">1</span><button id="qp" aria-label="Más">+</button></div></div>
      ${zonaImgs}
      <div class="opt"><label for="notes">${notesLabel}</label><textarea id="notes" rows="3" placeholder="Ej.: con mi nombre en la base"></textarea></div>
      <button class="btn big accent" id="add"></button>
      <ul class="assure"><li>No se cobra nada ahora: te enviamos el enlace de pago tras revisar tu reserva</li><li>Envío gratis en pedidos de +${FREE_SHIP} €</li>${esGen ? '<li>Te enviamos un boceto antes de fabricar</li>' : '<li>Personalizable con tus notas</li>'}</ul>
      <div style="margin-top:22px"><details><summary>Material y acabado</summary><p>Impreso en 3D bajo demanda. Si quieres un acabado o color especial, indícalo en las notas.</p></details>
      <details><summary>Fabricación y plazos</summary><p>Se fabrica después de tu reserva. Te indicamos el plazo estimado en el correo con el enlace de pago.</p></details>
      <details><summary>Envío</summary><p>Envío gratis en pedidos de +${FREE_SHIP} €. <a href="legal.html#envios" style="text-decoration:underline">Más información</a>.</p></details></div>
    </div></div>
    <div class="buybar"><div><small>Total</small><b id="bp"></b></div><button class="btn" id="add2">Añadir a la cesta</button></div>`;
    
    const upd = () => { 
      const dm = size.dims || p.dims || '';
      const detailsBox = $('#size-details-box');
      const dimsV = $('#dims-v');
      const extrasV = $('#size-extras');

      if (dm && p.sizes.length > 1 && detailsBox) {
        detailsBox.style.display = 'block';
        if (dimsV) dimsV.textContent = dm.replace(/x/gi, ' × ') + ' mm';
        if (extrasV) extrasV.textContent = `Precio para este tamaño: ${eur(p.price + size.delta)}`;
      } else if (detailsBox) {
        detailsBox.style.display = 'none';
      }

      const pr = p.price + size.delta; 
      const pp = $('#pp'); if (pp) pp.textContent = eur(pr); 
      const qv = $('#qv'); if (qv) qv.textContent = qty; 
      const add = $('#add'); if (add) add.textContent = `Añadir a la cesta · ${eur(pr * qty)}`; 
      const bp = $('#bp'); if (bp) bp.textContent = eur(pr * qty); 
    }; 
    upd();
    
    if (!esGen) {
      const tr = $('#gal-track'), dots = $('#gal-dots'), srcs = [`img/${p.id}.jpg`];
      const drawDots = () => { if(dots) { dots.hidden = srcs.length < 2; dots.innerHTML = srcs.map((_, i) => `<button type="button" data-d="${i}" aria-label="Foto ${i + 1}"></button>`).join(''); mark(); } };
      const mark = () => { if(!tr || !dots) return; const i = Math.round(tr.scrollLeft / (tr.clientWidth || 1)); [...dots.children].forEach((d, k) => d.classList.toggle('on', k === i)); };
      const next = n => { if (n > 10) return; const src = `img/${p.id}-${n}.jpg`, im = new Image(); im.onload = () => { srcs.push(src); const d = document.createElement('div'); d.className = 'gal-s'; d.innerHTML = `<img src="${src}" alt="${esc(p.name)} ${n}" loading="lazy">`; if(tr) tr.appendChild(d); drawDots(); next(n + 1); }; im.src = src; };
      next(2); drawDots();
      if (tr) tr.addEventListener('scroll', mark, { passive: true });
      if (dots) dots.onclick = e => { const b = e.target.closest('button'); if (b && tr) tr.scrollTo({ left: +b.dataset.d * tr.clientWidth, behavior: 'smooth' }); };
      if (tr) tr.onclick = e => {
        if (!e.target.closest('.gal-s img')) return;
        let i = Math.round(tr.scrollLeft / tr.clientWidth);
        const lb = document.createElement('div'); lb.className = 'lb';
        const show = () => lb.innerHTML = `<button class="lb-x" aria-label="Cerrar">✕</button>${srcs.length > 1 ? '<button class="lb-p" aria-label="Anterior">‹</button><button class="lb-n" aria-label="Siguiente">›</button>' : ''}<img src="${srcs[i]}" alt="">`;
        const close = () => { lb.remove(); document.removeEventListener('keydown', key); document.body.style.overflow = ''; };
        const go = d => { i = (i + d + srcs.length) % srcs.length; show(); };
        const key = k => { if (k.key === 'Escape') close(); if (k.key === 'ArrowLeft') go(-1); if (k.key === 'ArrowRight') go(1); };
        lb.onclick = ev => { if (ev.target.classList.contains('lb-p')) go(-1); else if (ev.target.classList.contains('lb-n')) go(1); else close(); };
        show(); document.body.appendChild(lb); document.body.style.overflow = 'hidden'; document.addEventListener('keydown', key);
      };
    }
    if (esGen) {
      const drawThumbs = () => { const th = $('#gen-thumbs'); if(th) th.innerHTML = genFiles.map((x, i) => `<div class="thumb"><img src="${URL.createObjectURL(x)}" alt=""><button type="button" data-gi="${i}" aria-label="Quitar">✕</button></div>`).join(''); };
      const genFilesEl = $('#gen-files');
      if (genFilesEl) genFilesEl.onchange = e => {
        for (const x of e.target.files) { if (genFiles.length >= 3) break; if (!x.type.startsWith('image/') || x.size > 5e6) continue; genFiles.push(x); }
        e.target.value = ''; drawThumbs();
      };
      const genThumbs = $('#gen-thumbs');
      if (genThumbs) genThumbs.onclick = e => { const b = e.target.closest('button'); if (b) { genFiles.splice(+b.dataset.gi, 1); drawThumbs(); } };
    }
    root.onclick = e => {
      const b = e.target.closest('.pill'); if (b) { const g = b.parentElement; $$('.pill', g).forEach(x => x.classList.toggle('on', x === b)); g.dataset.k === 'color' ? color = b.dataset.v : size = p.sizes[+b.dataset.v]; upd(); }
      if (e.target.id === 'qm' && qty > 1) { qty--; upd(); } if (e.target.id === 'qp') { qty++; upd(); }
      if (e.target.id === 'add' || e.target.id === 'add2') {
        addItem({ id: p.id, name: p.name, color, size: size.label, notes: $('#notes')?.value.trim() || '', qty, price: Math.round((p.price + size.delta) * 100) / 100, files: esGen ? genFiles.map(f => f.name) : [] });
        toast(`${p.name} añadido`, ['carrito.html', 'Ver cesta']);
      }
    };
    if (!esGen) {
      const rel = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 3);
      if (rel.length) { const relSec = $('#related'); if(relSec) relSec.innerHTML = rel.map(card).join(''); const sec = $('#rel-sec'); if(sec) sec.hidden = false; }
    }
  }
}

if (pg === 'generadores') {
  const u = new URLSearchParams(location.search);
  const id = GENERADORES[u.get('id')] ? u.get('id') : 'estatua';
  const g = GENERADORES[id];
  const otros = Object.entries(GENERADORES).filter(([k]) => k !== id);
  document.title = `${g.nombre} · Generadores · Estudio Terra`;
  const genEl = $('#gen');
  if (genEl) genEl.innerHTML = `
    <section class="gen-hero">
      <div class="container">
        <span class="eyebrow">Generador</span>
        <h1>${esc(g.nombre)}</h1>
        <p class="gen-sub">${esc(g.sub)}</p>
        <div class="gen-hero-mark">${g.emoji}</div>
      </div>
    </section>
    <section class="container gen-body">
      <div class="gen-col">
        <h2>Qué es</h2>
        <p>${esc(g.desc)}</p>
        <h2>Lo que necesitamos de ti</h2>
        <ul class="gen-necesitas">${g.necesitas.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <h2>Cómo funciona</h2>
        <ol class="gen-pasos">${g.pasos.map((p, i) => `<li><b>${i + 1}</b><span>${esc(p)}</span></li>`).join('')}</ol>
        <h2>Consejos y buenas prácticas</h2>
        <ul class="gen-necesitas">${g.consejos.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <h2>Guía rápida</h2>
        <div class="gen-guias">${g.guias.map(x => `<div class="gen-guia"><b>${esc(x.t)}</b><p>${esc(x.p)}</p></div>`).join('')}</div>
        <a class="btn big accent block" href="producto.html?id=${id}" style="max-width:22rem;margin-top:1.4rem">Usar este generador · desde ${eur(g.precioBase)}</a>
      </div>
      <div class="gen-gallery">
        <div class="gen-img" data-e="${g.emoji}"><img src="img/gen-${id}-1.jpg" alt="" loading="lazy" onerror="phFix(this)"></div>
        <div class="gen-img" data-e="${g.emoji}"><img src="img/gen-${id}-2.jpg" alt="" loading="lazy" onerror="phFix(this)"></div>
        <div class="gen-img" data-e="${g.emoji}"><img src="img/gen-${id}-3.jpg" alt="" loading="lazy" onerror="phFix(this)"></div>
      </div>
    </section>
    <section class="container gen-otros">
      <div class="sh"><h2>Otros generadores</h2><a class="link" href="catalogo.html">Ver catálogo</a></div>
      <div class="gen-grid">
        ${otros.map(([k, v]) => `<a class="gen-card" href="generadores.html?id=${k}"><div class="gen-card-img" data-e="${v.emoji}"><img src="img/promo-${k}.jpg" alt="" loading="lazy" onerror="phFix(this)"></div><div class="gen-card-body"><b>${esc(v.nombre)}</b><span>${esc(v.sub)}</span></div></a>`).join('')}
      </div>
    </section>`;
}

if (pg === 'guias') {
  const guidesEl = $('#guides');
  if (guidesEl) guidesEl.innerHTML = GUIDES.map(g => `<article class="art" id="${g.id}"><small>${g.tag}</small><h2>${g.title}</h2><p class="muted">${g.intro}</p><ul>${g.points.map(x => `<li>${x}</li>`).join('')}</ul></article>`).join('');
}

if (pg === 'personalizado') initCustom($('#custom-slot'));

if (pg === 'carrito') {
  const draw = () => {
    const lines = $('#lines');
    if (lines) lines.innerHTML = cart.length ? cart.map((i, n) => { 
      const p = byId(i.id) || genAsProduct(i.id) || { id: i.id, name: i.name, emoji: '◌' };
      return `<div class="line"><div class="img">${pic(p)}</div><div><strong>${esc(i.name)}</strong><small>${esc(i.color)} · ${esc(i.size)} · ${eur(i.price)}</small>${i.notes ? `<small>Notas: ${esc(i.notes)}</small>` : ''}${i.files && i.files.length ? `<small>Imágenes: ${esc(i.files.join(', '))}</small>` : ''}
      <div style="margin-top:8px"><span class="qty"><button data-a="-" data-n="${n}" aria-label="Menos">−</button><span>${i.qty}</span><button data-a="+" data-n="${n}" aria-label="Más">+</button></span><button class="rm" data-a="x" data-n="${n}">Eliminar</button></div></div><div class="sub">${eur(i.price * i.qty)}</div></div>`; 
    }).join('') : '<div class="empty">Tu cesta está vacía. <a href="catalogo.html" style="text-decoration:underline">Ver el catálogo</a></div>';
    
    const t = total(); 
    const sum = $('#sum');
    if (sum) sum.innerHTML = cart.length ? `
      <p><span>Artículos</span><span>${count()}</span></p>
      <p class="tot"><span>Total estimado</span><span>${eur(t)}</span></p>
      <div class="notice" style="background:#D1FAE5; border-left:4px solid #059669; color:#065F46; padding:12px; border-radius:4px; margin-bottom:12px">
        ${t >= FREE_SHIP ? '¡Tu pedido tiene envío gratis!' : `Te faltan ${eur(FREE_SHIP - t)} para el envío gratis.`}
        <div class="bar" style="background:#A7F3D0; height:6px; border-radius:3px; margin-top:8px; overflow:hidden"><i style="display:block; background:#059669; height:100%; width:${Math.min(100, t / FREE_SHIP * 100)}%"></i></div>
      </div>
      <div class="notice">No se realizará ningún cobro ahora. Al procesar la reserva recibiremos tu pedido, revisaremos los detalles y te enviaremos un enlace de pago seguro por correo.</div>
      <a class="btn big block accent" href="finalizar.html">Procesar reserva</a>
      <p style="justify-content:center;margin-top:12px"><a href="catalogo.html" style="text-decoration:underline">Seguir comprando</a></p>` : '';
  };
  const linesEl = $('#lines');
  if (linesEl) linesEl.onclick = e => { const b = e.target.closest('button'); if (!b) return; const i = cart[b.dataset.n]; if (b.dataset.a === '+') i.qty++; if (b.dataset.a === '-') i.qty--; if (b.dataset.a === 'x' || i.qty < 1) cart.splice(b.dataset.n, 1); saveCart(); draw(); };
  draw();
}

if (pg === 'finalizar') {
  const checkout = $('#checkout');
  if (!cart.length && checkout) checkout.innerHTML = '<div class="empty">Tu cesta está vacía. <a href="catalogo.html" style="text-decoration:underline">Ir al catálogo</a></div>';
  else if (checkout) {
    const sum = $('#sum');
    if (sum) sum.innerHTML = cart.map(i => `<p><span>${i.qty} × ${esc(i.name)}<br><small class="muted">${esc(i.color)} · ${esc(i.size)}</small></span><span>${eur(i.price * i.qty)}</span></p>`).join('') + `<p class="tot"><span>Total estimado</span><span>${eur(total())}</span></p>`;
    
    const form = $('#form');
    if (form) form.addEventListener('submit', async e => {
      e.preventDefault();
      const f = e.target, code = genCode('RES'), btn = $('#send'), err = $('#err'); if (err) err.hidden = true;

      const metodo = f.metodo_pago.value;
      const entrega = f.entrega.value;
      const punto = entrega === 'recogida'
        ? (f.punto_recogida.value === 'otro' ? f.punto_recogida_otro.value : f.punto_recogida.value)
        : '';

      f.codigo.value = code;
      f.total.value = eur(total());
      f.pedido.value = cart.map((i, n) => `${n + 1}. ${i.name} | Cantidad: ${i.qty} | Color: ${i.color} | Tamaño: ${i.size} | Notas: ${i.notes || '-'} | ${eur(i.price)} x ${i.qty} = ${eur(i.price * i.qty)}`).join('\n') + `\nTOTAL ESTIMADO: ${eur(total())}`;

      const order = {
        codigo: code,
        nombre: f.nombre.value,
        email: f.email.value,
        telefono: f.telefono.value,
        notas: f.notas.value,
        direccion: entrega === 'envio' 
          ? `${f.calle.value}, ${f.cp.value} ${f.ciudad.value} (${f.provincia.value})` 
          : `Recogida en: ${punto}`,
        metodo_pago: metodo,
        entrega: entrega,
        punto_recogida: punto,
        items: cart,
        total: total()
      };
      if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }
      try {
        await BACKEND.saveOrder(f, order);
        const track = $('#track'); if(track) track.href = `seguimiento.html?codigo=${code}&email=${encodeURIComponent(f.email.value)}`;
        cart = []; saveCart(); const codeEl = $('#code'); if(codeEl) codeEl.textContent = code;
        if (metodo === 'tarjeta') {
          const doneMsg = $('#done-msg'); if(doneMsg) doneMsg.textContent = 'En 24-48 h recibirás en tu correo el enlace de pago seguro con tarjeta.';
        } else {
          const doneMsg = $('#done-msg'); 
          if(doneMsg) doneMsg.textContent = (entrega === 'recogida'
            ? 'Te avisaremos cuando esté listo para recoger en ' + punto + '. Pagarás en efectivo al recoger.'
            : 'Te avisaremos cuando esté listo para enviar. Pagarás en efectivo al recibir.');
        }
        checkout.hidden = true; const done = $('#done'); if(done) done.hidden = false; scrollTo(0, 0);
      } catch (x) {
        if (err) { err.textContent = `No se pudo enviar: ${x.message || 'sin conexión'}`; err.hidden = false; }
        if (btn) { btn.disabled = false; btn.textContent = 'Confirmar reserva'; }
      }
    });
    const copy = $('#copy');
    if (copy) copy.onclick = () => { const codeEl = $('#code'); if(codeEl) navigator.clipboard.writeText(codeEl.textContent).then(() => toast('Código copiado')); };
  }
}

if (pg === 'seguimiento') {
  const f = $('#track-form');
  const out = $('#out');
  if (f && out) {
    const q = new URLSearchParams(location.search);
    f.codigo.value = q.get('codigo') || '';
    f.email.value = q.get('email') || '';
    f.addEventListener('submit', async e => {
      e.preventDefault();
      console.log('🔍 Iniciando búsqueda:', f.codigo.value, f.email.value);
      out.innerHTML = '<p class="muted" style="text-align:center; padding: 20px; font-size: 16px;">⏳ Buscando tu pedido en el sistema…</p>';

      try {
        const d = await BACKEND.getStatus(f.codigo.value, f.email.value);
        console.log('✅ Respuesta del servidor:', d);

        if (!d || !d.ok) {
          throw new Error(d?.error || 'No se encontró el pedido. Revisa que el código y el email coincidan exactamente.');
        }

        const est = d.estado || 'Reserva recibida';
        const estadosLista = typeof ESTADOS !== 'undefined' ? ESTADOS : ['Reserva recibida','Enlace de pago enviado','Pago recibido','En fabricación','Enviado','Entregado','Cancelado'];
        const idx = estadosLista.indexOf(est);

        out.innerHTML = `
          <div style="background: #EEF0FF; padding: 24px; border-radius: 12px; margin-bottom: 24px; text-align: center; border: 1px solid #C7D2FE;">
            <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #4F46E5; font-weight: 600;">Pedido ${esc(d.codigo)}</span>
            <h2 style="margin: 12px 0 8px 0; color: #111827;">Hola, ${esc(d.nombre)}</h2>
            <p style="font-size: 16px; margin: 0;">Estado actual: <b style="color: #4F46E5; font-size: 20px;">${esc(est)}</b></p>
            ${d.fecha ? `<p style="font-size: 13px; color: #6B7280; margin-top: 8px;">📅 Fecha de reserva: ${esc(d.fecha)}</p>` : ''}
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
            ${estadosLista.map((s, i) => {
              const isDone = i < idx;
              const isNow = i === idx;
              return `
                <div style="display: flex; align-items: center; gap: 16px; padding: 14px 16px; border-radius: 8px; background: ${isDone || isNow ? '#D1FAE5' : '#F3F4F6'}; border: 1px solid ${isNow ? '#059669' : 'transparent'};">
                  <div style="width: 28px; height: 28px; border-radius: 50%; background: ${isDone || isNow ? '#059669' : '#D1D5DB'}; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; flex-shrink: 0;">
                    ${isDone ? '✓' : (isNow ? '●' : (i + 1))}
                  </div>
                  <b style="font-size: 15px; color: ${isDone || isNow ? '#065F46' : '#9CA3AF'};">${esc(s)}</b>
                </div>
              `;
            }).join('')}
          </div>

          ${d.items && d.items.length ? `
            <div style="padding: 20px; background: #F9FAFB; border-radius: 12px; border: 1px solid #E5E7EB;">
              <h4 style="margin: 0 0 12px 0; color: #111827;">📦 Resumen del pedido:</h4>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #4B5563; line-height: 1.6;">
                ${d.items.map(it => `<li>${esc(it)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        `;
      } catch (x) {
        console.error('❌ Error en seguimiento:', x);
        out.innerHTML = `
          <div style="background: #FEF2F2; color: #991B1B; padding: 20px; border-radius: 12px; text-align: center; border: 1px solid #FECACA;">
            <p style="margin: 0; font-weight: bold; font-size: 16px;">⚠️ ${esc(x.message || 'No se pudo consultar el estado.')}</p>
            <p style="margin: 10px 0 0; font-size: 14px; color: #B91C1C;">Asegúrate de que el código y el email coincidan <b>exactamente</b> con los de tu correo de confirmación.</p>
          </div>`;
      }
    });

    if (f.codigo.value && f.email.value) {
      f.requestSubmit();
    }
  } else {
    console.error('⚠️ No se encontraron los elementos #track-form o #out en el HTML de seguimiento.html');
  }
}

if (pg === 'contacto') {
  const contactForm = $('#contact-form');
  if (contactForm) contactForm.addEventListener('submit', async e => {
    e.preventDefault(); const f = e.target, err = $('#c-err'), btn = $('#c-send'); if (err) err.hidden = true; if (btn) btn.disabled = true;
    try { 
      if (typeof viaNetlify === 'function') {
        await viaNetlify(f); 
        f.outerHTML = '<div class="notice">¡Mensaje enviado! Te responderemos lo antes posible.</div>'; 
      } else {
        throw new Error('Función viaNetlify no disponible');
      }
    } catch (x) { 
      if (err) { err.textContent = `No se pudo enviar (${x.message || 'sin conexión'}). Escríbenos a ${SITE.email}.`; err.hidden = false; } 
      if (btn) btn.disabled = false; 
    }
  });
}




