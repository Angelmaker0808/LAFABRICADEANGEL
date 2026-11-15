/* Google Apps Script: guarda cada reserva en tu hoja y permite consultar el estado.
   Pasos: Google Sheets > Extensiones > Apps Script > pega esto > Implementar > Aplicación web
   (Ejecutar como: yo · Acceso: cualquiera) > copia la URL en SHEETS_URL de app.js. */
const ESTADOS = ['Pedido enviado','Esperando pago','Pago confirmado','Elaborando','Enviando','Recibido'];
function hoja_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName('Pedidos');
  if (!s) { s = ss.insertSheet('Pedidos'); s.appendRow(['Código','Fecha','Nombre','Email','Teléfono','Dirección','Pedido','Total','Estado']); s.setFrozenRows(1); }
  // Desplegable de estado: cambia aquí la fase de cada pedido
  s.getRange('I2:I1000').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(ESTADOS, true).build());
  return s;
}
function doPost(e) {
  const p = e.parameter;
  hoja_().appendRow([p.codigo, new Date(), p.nombre, p.email, p.telefono, [p.calle, p.cp, p.ciudad, p.provincia].join(', '), p.pedido, p.total, ESTADOS[0]]);
  return ContentService.createTextOutput('ok');
}
function doGet(e) { // solo devuelve el estado si coinciden código y correo
  const c = (e.parameter.codigo || '').toUpperCase().trim(), m = (e.parameter.email || '').toLowerCase().trim();
  const filas = hoja_().getDataRange().getValues();
  for (let i = 1; i < filas.length; i++)
    if (String(filas[i][0]).toUpperCase() === c && String(filas[i][3]).toLowerCase() === m) return json_({ estado: filas[i][8] });
  return json_({ estado: null });
}
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
