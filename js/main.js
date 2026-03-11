// ════════════════════════════════════════════════════════════
//  FIKA'S — Interactividad principal
// ════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── Cursor personalizado ──────────────────────────────────
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (cursor && follower && window.matchMedia('(hover:hover)').matches) {
    let fx = 0, fy = 0;
    document.addEventListener('mousemove', e => {
      cursor.style.left   = e.clientX + 'px';
      cursor.style.top    = e.clientY + 'px';
      fx += (e.clientX - fx) * .12;
      fy += (e.clientY - fy) * .12;
      follower.style.left = fx + 'px';
      follower.style.top  = fy + 'px';
    });
    requestAnimationFrame(function loop() {
      follower.style.left = fx + 'px';
      follower.style.top  = fy + 'px';
      requestAnimationFrame(loop);
    });
  }

  // ── Navbar scroll ─────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');

  function onScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
      backTop?.classList.add('visible');
    } else {
      navbar.classList.remove('scrolled');
      backTop?.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── Hamburger ─────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      navLinks.classList.remove('open');
    })
  );

  // ── Reveal on scroll ─────────────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── Hero image parallax + scale ───────────────────────────
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    heroImg.addEventListener('load', () => heroImg.classList.add('loaded'));
    if (heroImg.complete) heroImg.classList.add('loaded');

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroImg.style.transform = `scale(1) translateY(${y * .3}px)`;
      }
    }, { passive: true });
  }

  // ── Menú ──────────────────────────────────────────────────
  const menuGrid = document.getElementById('menuGrid');
  if (menuGrid && FIKAS_DATA?.menu) {
    renderMenu('all');
  }

  function renderMenu(filtro) {
    const items = filtro === 'all'
      ? FIKAS_DATA.menu
      : FIKAS_DATA.menu.filter(i => i.categoria === filtro);

    menuGrid.innerHTML = items.map(item => `
      <article class="menu-card" data-cat="${item.categoria}">
        <div class="menu-card-img">
          <img src="${item.imagen}" alt="${item.nombre}" loading="lazy" />
          ${item.badge ? `<span class="menu-card-badge">${item.badge}</span>` : ''}
        </div>
        <div class="menu-card-body">
          <span class="menu-card-cat">${catLabel(item.categoria)}</span>
          <h3 class="menu-card-name">${item.nombre}</h3>
          <p class="menu-card-desc">${item.descripcion}</p>
          <div class="menu-card-footer">
            <span class="menu-card-price">${item.precio}</span>
          </div>
        </div>
      </article>
    `).join('');

    // Re-observar cards para reveal
    menuGrid.querySelectorAll('.menu-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity .5s ease, transform .5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 60);
    });
  }

  function catLabel(cat) {
    const labels = {
      desayunos: '🍳 Desayuno',
      platos:    '🍽️ Plato Principal',
      cafe:      '☕ Café',
      reposteria:'🥐 Repostería',
      bebidas:   '🥤 Bebida',
    };
    return labels[cat] || cat;
  }

  // Filtros
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.dataset.filter);
    });
  });

  // ── Testimonios slider ────────────────────────────────────
  const track  = document.getElementById('testimoniosTrack');
  const dotsC  = document.getElementById('sliderDots');
  const btnPrev= document.getElementById('sliderPrev');
  const btnNext= document.getElementById('sliderNext');

  if (track && FIKAS_DATA?.testimonios) {
    let current     = 0;
    let perSlide    = window.innerWidth < 768 ? 1 : 3;
    const total     = FIKAS_DATA.testimonios.length;
    const totalSlides = Math.ceil(total / perSlide);

    // Render cards
    track.innerHTML = FIKAS_DATA.testimonios.map(t => `
      <div class="testimonio-card">
        <div class="testimonio-stars">${'★'.repeat(t.estrellas)}${'☆'.repeat(5 - t.estrellas)}</div>
        <p class="testimonio-text">"${t.texto}"</p>
        <div class="testimonio-author">
          <div class="testimonio-avatar">${t.emoji}</div>
          <div>
            <span class="testimonio-name">${t.autor}</span>
            <span class="testimonio-via">${t.via}</span>
          </div>
        </div>
      </div>
    `).join('');

    // Dots
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsC?.appendChild(dot);
    }

    function goTo(idx) {
      current = (idx + totalSlides) % totalSlides;
      const cardWidth = track.querySelector('.testimonio-card')?.offsetWidth || 0;
      const gap = 24;
      track.style.transform = `translateX(-${current * perSlide * (cardWidth + gap)}px)`;
      dotsC?.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
    }

    btnPrev?.addEventListener('click', () => goTo(current - 1));
    btnNext?.addEventListener('click', () => goTo(current + 1));

    // Auto-play
    let autoplay = setInterval(() => goTo(current + 1), 5000);
    track.addEventListener('mouseenter', () => clearInterval(autoplay));
    track.addEventListener('mouseleave', () => { autoplay = setInterval(() => goTo(current + 1), 5000); });

    // Swipe mobile
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    });

    window.addEventListener('resize', () => {
      perSlide = window.innerWidth < 768 ? 1 : 3;
      goTo(0);
    });
  }

  // ── Active nav link on scroll ─────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinksList = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinksList.forEach(l => l.classList.remove('active-link'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        active?.classList.add('active-link');
      }
    });
  }, { threshold: .35 });

  sections.forEach(s => sectionObserver.observe(s));

  // ── Smooth hover en galería ───────────────────────────────
  document.querySelectorAll('.gal-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      // Lightbox simple
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,.9);
        z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;
      `;
      const bigImg = document.createElement('img');
      bigImg.src = img.src.replace('w=500','w=1200');
      bigImg.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;border-radius:6px;';
      overlay.appendChild(bigImg);
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });

});
