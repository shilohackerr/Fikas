// ════════════════════════════════════════════════════════════
//  FIKA'S — Panel de Administración
//  Contraseña: fikas2025
// ════════════════════════════════════════════════════════════

const ADMIN_PASSWORD = 'fikas2025';
const STORAGE_KEY    = 'fikas_reservas';

// ── Demo data ────────────────────────────────────────────────
const DEMO_RESERVAS = [
  { id:'R001', nombre:'Ana Gordón', telefono:'6700-1234', fecha: todayStr(0), hora:'08:00 AM', personas:'2 personas', ocasion:'Desayuno', notas:'', status:'confirmada', timestamp:'hoy' },
  { id:'R002', nombre:'Carlos Díaz', telefono:'6800-5678', fecha: todayStr(0), hora:'12:00 PM', personas:'4 personas', ocasion:'Reunión familiar', notas:'Mesa cerca de la ventana', status:'pendiente', timestamp:'hoy' },
  { id:'R003', nombre:'Lucía Prado', telefono:'6900-9012', fecha: todayStr(1), hora:'01:00 PM', personas:'2 personas', ocasion:'Aniversario', notas:'Sorpresa de cumpleaños', status:'pendiente', timestamp:'ayer' },
  { id:'R004', nombre:'Roberto Mora', telefono:'6600-3456', fecha: todayStr(-1), hora:'07:30 PM', personas:'6 personas', ocasion:'Cumpleaños', notas:'', status:'completada', timestamp:'ayer' },
  { id:'R005', nombre:'Verónica Gil', telefono:'6500-7890', fecha: todayStr(2), hora:'12:30 PM', personas:'3 personas', ocasion:'', notas:'Sin gluten si es posible', status:'pendiente', timestamp:'hace 2 días' },
  { id:'R006', nombre:'Marcos Ríos', telefono:'6400-2345', fecha: todayStr(0), hora:'07:00 PM', personas:'5 personas', ocasion:'Cena de negocios', notas:'', status:'confirmada', timestamp:'hoy' },
];

function todayStr(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Verificar sesión
  if (sessionStorage.getItem('fikas_admin') === '1') showAdmin();

  // Login
  document.getElementById('loginBtn')?.addEventListener('click', doLogin);
  document.getElementById('loginPass')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') doLogin();
  });

  // Sidebar nav
  document.querySelectorAll('.snav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.snav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-view').forEach(v => v.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('view' + capitalize(btn.dataset.view))?.classList.add('active');
      if (btn.dataset.view === 'hoy')    renderHoy();
      if (btn.dataset.view === 'resumen') renderResumen();
    });
  });

  // Logout
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    sessionStorage.removeItem('fikas_admin');
    location.reload();
  });

  // Búsqueda y filtro
  document.getElementById('searchInput')?.addEventListener('input', renderTable);
  document.getElementById('filterStatus')?.addEventListener('change', renderTable);

  // Export CSV
  document.getElementById('exportBtn')?.addEventListener('click', exportCSV);
});

function doLogin() {
  const pass = document.getElementById('loginPass')?.value;
  const err  = document.getElementById('loginError');
  if (pass === ADMIN_PASSWORD) {
    sessionStorage.setItem('fikas_admin', '1');
    showAdmin();
  } else {
    if (err) err.textContent = 'Contraseña incorrecta. Intenta de nuevo.';
    document.getElementById('loginPass').value = '';
  }
}

function showAdmin() {
  document.getElementById('loginScreen').style.display  = 'none';
  document.getElementById('adminWrap').style.display    = 'flex';
  initData();
  renderTable();
}

function initData() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (stored.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_RESERVAS));
    }
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_RESERVAS));
  }
}

function getReservas() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch (e) { return []; }
}

function saveReservas(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// ── Tabla principal ───────────────────────────────────────────
function renderTable() {
  const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const status = document.getElementById('filterStatus')?.value || 'all';
  const tbody  = document.getElementById('resTableBody');
  const empty  = document.getElementById('emptyState');
  if (!tbody) return;

  let items = getReservas();
  if (search) items = items.filter(r => r.nombre.toLowerCase().includes(search) || r.telefono.includes(search));
  if (status !== 'all') items = items.filter(r => r.status === status);

  items.sort((a, b) => (b.fecha + b.hora).localeCompare(a.fecha + a.hora));

  if (items.length === 0) {
    tbody.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  tbody.innerHTML = items.map(r => `
    <tr>
      <td class="ref-cell">${r.id || '—'}</td>
      <td><strong>${esc(r.nombre)}</strong></td>
      <td>${esc(r.telefono)}</td>
      <td>${formatFecha(r.fecha)}</td>
      <td>${esc(r.hora)}</td>
      <td>${esc(r.personas)}</td>
      <td>${r.ocasion ? esc(r.ocasion) : '<span style="opacity:.35">—</span>'}</td>
      <td><span class="badge badge-${r.status}">${r.status}</span></td>
      <td>
        ${r.status === 'pendiente' ? `<button class="action-btn" onclick="updateStatus('${r.id}','confirmada')">✓ Confirmar</button>` : ''}
        ${r.status !== 'cancelada' && r.status !== 'completada' ? `<button class="action-btn danger" onclick="updateStatus('${r.id}','cancelada')">✗ Cancelar</button>` : ''}
        ${r.status === 'confirmada' ? `<button class="action-btn" onclick="updateStatus('${r.id}','completada')">Completar</button>` : ''}
        <button class="action-btn wa" onclick="contactWA('${r.id}')">WhatsApp</button>
      </td>
    </tr>
  `).join('');
}

function updateStatus(id, newStatus) {
  const list = getReservas();
  const idx  = list.findIndex(r => r.id === id);
  if (idx !== -1) { list[idx].status = newStatus; saveReservas(list); }
  renderTable();
  // refrescar vistas dependientes si están activas
  if (document.getElementById('viewHoy')?.classList.contains('active')) renderHoy();
  if (document.getElementById('viewResumen')?.classList.contains('active')) renderResumen();
}

function contactWA(id) {
  const r   = getReservas().find(x => x.id === id);
  if (!r) return;
  const wa  = FIKAS?.config?.whatsapp || '50700000000';
  const msg = `Hola ${r.nombre}, te contactamos de Fika's Restaurant. Tu reserva para ${r.personas} el ${formatFecha(r.fecha)} a las ${r.hora} está ${r.status}. ¡Te esperamos!`;
  window.open(`https://wa.me/${r.telefono.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ── Vista: Hoy ────────────────────────────────────────────────
function renderHoy() {
  const today = todayStr(0);
  const label = document.getElementById('fechaHoyLabel');
  const stats = document.getElementById('todayStats');
  const list  = document.getElementById('todayList');
  if (label) label.textContent = new Date().toLocaleDateString('es-PA', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

  const all   = getReservas().filter(r => r.fecha === today);
  const pend  = all.filter(r => r.status === 'pendiente').length;
  const conf  = all.filter(r => r.status === 'confirmada').length;
  const compl = all.filter(r => r.status === 'completada').length;
  const pers  = all.filter(r => r.status !== 'cancelada').reduce((s, r) => s + (parseInt(r.personas) || 0), 0);

  if (stats) stats.innerHTML = [
    { num: all.length, label: 'Reservas hoy' },
    { num: pend,       label: 'Pendientes' },
    { num: conf,       label: 'Confirmadas' },
    { num: pers,       label: 'Personas esperadas' },
  ].map(s => `<div class="today-stat-card"><span class="tsc-num">${s.num}</span><span class="tsc-label">${s.label}</span></div>`).join('');

  const sorted = [...all].sort((a, b) => a.hora.localeCompare(b.hora));
  if (list) {
    if (sorted.length === 0) {
      list.innerHTML = '<p style="color:rgba(245,240,232,.35);font-size:.82rem;padding:20px 0;font-family:\'Barlow Condensed\',sans-serif;letter-spacing:.1em;text-transform:uppercase;">Sin reservas para hoy.</p>';
    } else {
      list.innerHTML = sorted.map(r => `
        <div class="today-item">
          <span class="today-hora">${r.hora}</span>
          <span class="today-nombre">${esc(r.nombre)}</span>
          <span class="today-personas">${esc(r.personas)}</span>
          ${r.ocasion ? `<span class="today-personas">${esc(r.ocasion)}</span>` : ''}
          <span class="badge badge-${r.status}">${r.status}</span>
          <button class="action-btn wa" onclick="contactWA('${r.id}')">WhatsApp</button>
        </div>
      `).join('');
    }
  }
}

// ── Vista: Resumen ────────────────────────────────────────────
function renderResumen() {
  const all   = getReservas();
  const grid  = document.getElementById('statsGrid');
  if (!grid) return;

  const total  = all.length;
  const conf   = all.filter(r => r.status === 'confirmada').length;
  const compl  = all.filter(r => r.status === 'completada').length;
  const canc   = all.filter(r => r.status === 'cancelada').length;
  const pend   = all.filter(r => r.status === 'pendiente').length;
  const hoy    = all.filter(r => r.fecha === todayStr(0)).length;
  const pers   = all.filter(r => r.status !== 'cancelada').reduce((s, r) => s + (parseInt(r.personas) || 0), 0);
  const proxim = all.filter(r => r.fecha >= todayStr(0) && r.status !== 'cancelada').length;

  grid.innerHTML = [
    { num: total,  label: 'Reservas totales' },
    { num: pend,   label: 'Pendientes' },
    { num: conf,   label: 'Confirmadas' },
    { num: compl,  label: 'Completadas' },
    { num: canc,   label: 'Canceladas' },
    { num: hoy,    label: 'Reservas hoy' },
    { num: proxim, label: 'Próximas reservas' },
    { num: pers,   label: 'Personas atendidas' },
  ].map(s => `<div class="stat-card"><span class="stat-num">${s.num}</span><span class="stat-label">${s.label}</span></div>`).join('');
}

// ── Export CSV ────────────────────────────────────────────────
function exportCSV() {
  const items = getReservas();
  const header = 'ID,Nombre,Teléfono,Fecha,Hora,Personas,Ocasión,Notas,Estado,Timestamp\n';
  const rows = items.map(r =>
    [r.id, r.nombre, r.telefono, r.fecha, r.hora, r.personas, r.ocasion || '', r.notas || '', r.status, r.timestamp || '']
      .map(v => `"${String(v).replace(/"/g, '""')}"`)
      .join(',')
  ).join('\n');
  const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `fikas-reservas-${todayStr(0)}.csv`;
  a.click();
}

// ── Helpers ───────────────────────────────────────────────────
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function esc(s) { return String(s || '').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function formatFecha(f) {
  if (!f) return '—';
  const d = new Date(f + 'T12:00:00');
  return d.toLocaleDateString('es-PA', { weekday:'short', day:'numeric', month:'short' });
}
