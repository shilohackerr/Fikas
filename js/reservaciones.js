// ════════════════════════════════════════════════════════════
//  FIKA'S — Lógica del formulario de reservaciones
//  Integración: Google Sheets via Apps Script + WhatsApp
// ════════════════════════════════════════════════════════════

const APPS_SCRIPT_URL = 'TU_APPS_SCRIPT_URL_AQUI'; // ← Reemplazar con URL real

document.addEventListener('DOMContentLoaded', () => {

  // Fecha mínima = mañana
  const fechaInput = document.getElementById('fecha');
  if (fechaInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    fechaInput.min = tomorrow.toISOString().split('T')[0];
  }

  // Botón enviar
  document.getElementById('btnSubmit')?.addEventListener('click', handleSubmit);

  // Validación en tiempo real
  ['nombre', 'telefono', 'fecha', 'hora', 'personas'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => clearError(id));
    document.getElementById(id)?.addEventListener('change', () => clearError(id));
  });
});

function clearError(id) {
  const input = document.getElementById(id);
  const err   = document.getElementById('err' + id.charAt(0).toUpperCase() + id.slice(1));
  input?.classList.remove('error');
  if (err) err.textContent = '';
}

function setError(id, msg) {
  const input = document.getElementById(id);
  const err   = document.getElementById('err' + id.charAt(0).toUpperCase() + id.slice(1));
  input?.classList.add('error');
  if (err) err.textContent = msg;
}

function validate() {
  let ok = true;
  const nombre   = document.getElementById('nombre')?.value.trim();
  const telefono = document.getElementById('telefono')?.value.trim();
  const fecha    = document.getElementById('fecha')?.value;
  const hora     = document.getElementById('hora')?.value;
  const personas = document.getElementById('personas')?.value;

  if (!nombre)   { setError('nombre',   'Por favor ingresa tu nombre'); ok = false; }
  if (!telefono) { setError('telefono', 'Por favor ingresa tu teléfono'); ok = false; }
  if (!fecha)    { setError('fecha',    'Por favor elige una fecha'); ok = false; }
  if (!hora)     { setError('hora',     'Por favor elige una hora'); ok = false; }
  if (!personas) { setError('personas', 'Por favor indica cuántas personas'); ok = false; }

  // Fecha pasada
  if (fecha) {
    const sel  = new Date(fecha + 'T00:00:00');
    const hoy  = new Date(); hoy.setHours(0,0,0,0);
    if (sel < hoy) { setError('fecha', 'Elige una fecha a partir de hoy'); ok = false; }
  }

  return ok;
}

async function handleSubmit() {
  if (!validate()) return;

  const btn     = document.getElementById('btnSubmit');
  const btnText = document.getElementById('btnText');
  const btnLoad = document.getElementById('btnLoader');

  btn.disabled = true;
  if (btnText) btnText.style.display = 'none';
  if (btnLoad) btnLoad.style.display = 'inline';

  const datos = {
    nombre:   document.getElementById('nombre').value.trim(),
    telefono: document.getElementById('telefono').value.trim(),
    fecha:    document.getElementById('fecha').value,
    hora:     document.getElementById('hora').value,
    personas: document.getElementById('personas').value,
    ocasion:  document.getElementById('ocasion')?.value || '',
    notas:    document.getElementById('notas')?.value.trim() || '',
    timestamp: new Date().toLocaleString('es-PA', { timeZone: 'America/Panama' }),
  };

  // Guardar localmente para el admin
  saveReserva(datos);

  // Intentar enviar a Google Sheets
  try {
    if (APPS_SCRIPT_URL !== 'TU_APPS_SCRIPT_URL_AQUI') {
      const params = new URLSearchParams(datos);
      await fetch(`${APPS_SCRIPT_URL}?${params}`, { method: 'GET', mode: 'no-cors' });
    }
  } catch (e) {
    console.warn('Apps Script no disponible, reserva guardada localmente:', e);
  }

  // Notificación WhatsApp al restaurante
  notifyWhatsApp(datos);

  // Mostrar éxito
  showSuccess(datos);

  btn.disabled = false;
  if (btnText) btnText.style.display = 'inline';
  if (btnLoad) btnLoad.style.display = 'none';
}

function saveReserva(datos) {
  try {
    const key = 'fikas_reservas';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    const newReserva = {
      ...datos,
      id:     'R' + Date.now(),
      status: 'pendiente',
    };
    existing.unshift(newReserva);
    localStorage.setItem(key, JSON.stringify(existing.slice(0, 200)));
  } catch (e) {}
}

function notifyWhatsApp(datos) {
  const wa = FIKAS?.config?.whatsapp || '50700000000';
  const fecha = new Date(datos.fecha + 'T12:00:00').toLocaleDateString('es-PA', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const msg = `🆕 *Nueva Reserva — Fika's*\n\n` +
    `👤 *Cliente:* ${datos.nombre}\n` +
    `📱 *Teléfono:* ${datos.telefono}\n` +
    `📅 *Fecha:* ${fecha}\n` +
    `⏰ *Hora:* ${datos.hora}\n` +
    `👥 *Personas:* ${datos.personas}\n` +
    (datos.ocasion ? `🎉 *Ocasión:* ${datos.ocasion}\n` : '') +
    (datos.notas   ? `📝 *Notas:* ${datos.notas}\n`    : '') +
    `\n_Enviado desde el sitio web_`;

  const waUrl = `https://wa.me/${wa}?text=${encodeURIComponent(msg)}`;
  setTimeout(() => window.open(waUrl, '_blank'), 1500);
}

function showSuccess(datos) {
  const formBody = document.getElementById('formBody');
  const success  = document.getElementById('formSuccess');
  const msgEl    = document.getElementById('successMsg');
  const waLink   = document.getElementById('whatsappConfirm');

  if (formBody) formBody.style.display = 'none';
  if (success)  success.style.display  = 'block';

  const fecha = new Date(datos.fecha + 'T12:00:00').toLocaleDateString('es-PA', {
    weekday: 'long', month: 'long', day: 'numeric'
  });

  if (msgEl) {
    msgEl.textContent = `Hola ${datos.nombre}, tu reserva para ${datos.personas} el ${fecha} a las ${datos.hora} fue recibida. Te confirmamos pronto por WhatsApp.`;
  }

  if (waLink) {
    const wa = FIKAS?.config?.whatsapp || '50700000000';
    const msg = `Hola Fika's, soy ${datos.nombre}. Hice una reserva para ${datos.personas} el ${datos.fecha} a las ${datos.hora}. ¿Me pueden confirmar?`;
    waLink.href = `https://wa.me/${wa}?text=${encodeURIComponent(msg)}`;
  }

  // Scroll al éxito
  document.getElementById('formSuccess')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
