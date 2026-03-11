// ════════════════════════════════════════════════════════════
//  FIKA'S — JavaScript principal
// ════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── Loader ────────────────────────────────────────────────
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader?.classList.add('hidden'), 1400);
  });
  setTimeout(() => loader?.classList.add('hidden'), 3000);

  // ── Header scroll ─────────────────────────────────────────
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ── Nav toggle mobile ─────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const headerNav = document.getElementById('headerNav');
  navToggle?.addEventListener('click', () => {
    headerNav?.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    const isOpen = headerNav?.classList.contains('open');
    if (spans[0] && spans[1]) {
      spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
    }
  });
  headerNav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      headerNav.classList.remove('open');
      if (navToggle) {
        navToggle.querySelectorAll('span').forEach(s => s.style.transform = '');
      }
    });
  });

  // ── Reveal on scroll ─────────────────────────────────────
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.js-reveal').forEach(el => revealObserver.observe(el));

  // ── Hero image subtle scale ───────────────────────────────
  const heroImg = document.querySelector('.hero-main-img');
  if (heroImg) {
    if (heroImg.complete) heroImg.classList.add('loaded');
    else heroImg.addEventListener('load', () => heroImg.classList.add('loaded'));
  }

  // ── Render menú ───────────────────────────────────────────
  const mosaic = document.getElementById('menuMosaic');
  if (mosaic && FIKAS?.menu) renderMenu('all');

  function renderMenu(filtro) {
    if (!mosaic) return;
    const items = filtro === 'all'
      ? FIKAS.menu
      : FIKAS.menu.filter(i => i.cat === filtro);

    mosaic.innerHTML = items.map((item, idx) => `
      <article class="menu-tile js-reveal" style="transition-delay:${idx * 50}ms">
        <div class="tile-img">
          <img src="${item.foto}" alt="${item.nombre}" loading="lazy"/>
        </div>
        <div class="tile-body">
          <span class="tile-cat">${catLabel(item.cat)}</span>
          <h3 class="tile-name">${item.nombre}</h3>
          <p class="tile-desc">${item.descripcion}</p>
          <div class="tile-footer">
            <span class="tile-price">${item.precio}</span>
            ${item.badge ? `<span class="tile-badge">${item.badge}</span>` : ''}
          </div>
        </div>
      </article>
    `).join('');

    // re-observe tiles
    mosaic.querySelectorAll('.js-reveal').forEach(el => revealObserver.observe(el));
  }

  function catLabel(cat) {
    return { desayunos:'Desayuno', platos:'Plato Principal', cafe:'Café', bebidas:'Bebidas Calientes' }[cat] || cat;
  }

  // Filtros menú
  document.getElementById('menuFilters')?.addEventListener('click', e => {
    const btn = e.target.closest('.mf-btn');
    if (!btn) return;
    document.querySelectorAll('.mf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(btn.dataset.filter);
  });

  // ── Render reseñas ────────────────────────────────────────
  const reviewsGrid = document.getElementById('reviewsGrid');
  if (reviewsGrid && FIKAS?.resenas) {
    reviewsGrid.className = 'reviews-grid';
    reviewsGrid.innerHTML = FIKAS.resenas.map((r, i) => `
      <div class="review-card js-reveal" style="transition-delay:${i * 80}ms">
        <div class="review-stars">${'★'.repeat(r.estrellas)}${'☆'.repeat(5 - r.estrellas)}</div>
        <p class="review-text">"${r.texto}"</p>
        <div class="review-author">
          <div class="review-avatar">${r.emoji}</div>
          <div>
            <span class="review-name">${r.autor}</span>
            <span class="review-via">${r.via}</span>
          </div>
        </div>
      </div>
    `).join('');
    reviewsGrid.querySelectorAll('.js-reveal').forEach(el => revealObserver.observe(el));
  }

  // ── Lightbox galería ─────────────────────────────────────
  document.querySelectorAll('.gm-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img')?.src;
      const label = item.querySelector('.gm-label')?.textContent || '';
      if (!src) return;
      const lb = document.createElement('div');
      lb.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:zoom-out;padding:20px;';
      lb.innerHTML = `
        <img src="${src.replace('sq','-sq')}" style="max-width:90vw;max-height:80vh;object-fit:contain;" alt="${label}"/>
        <p style="margin-top:16px;font-family:'Barlow Condensed',sans-serif;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(245,240,232,.5);">${label}</p>
      `;
      lb.addEventListener('click', () => lb.remove());
      document.body.appendChild(lb);
    });
  });

  // ── Active link en scroll ─────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.header-nav a');
  const secObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.style.color = '');
        const match = document.querySelector(`.header-nav a[href="#${e.target.id}"]`);
        if (match) match.style.color = '#6B8F60';
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => secObserver.observe(s));

});
