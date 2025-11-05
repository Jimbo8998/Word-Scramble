// Theme toggle, fade-in reveal, and simple DOM interactions
(function(){
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  if (btn) {
    // Persist theme in localStorage
    const current = localStorage.getItem('theme') || 'dark';
    if (current === 'light') enableLight();
    btn.addEventListener('click', () => {
      const now = root.dataset.theme === 'light' ? 'dark' : 'light';
      (now === 'light' ? enableLight : enableDark)();
      localStorage.setItem('theme', now);
      btn.setAttribute('aria-pressed', String(now === 'light'));
    });
  }
  function enableLight(){
    root.dataset.theme = 'light';
    document.body.style.background = '#f7fafc';
    document.body.style.color = '#0b1020';
  }
  function enableDark(){
    root.dataset.theme = 'dark';
    document.body.style.background = '';
    document.body.style.color = '';
  }

  // IntersectionObserver fade-in
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));

  // Shuffle highlights on Home
  const shuffleBtn = document.getElementById('shuffleFeatures');
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      const grid = document.querySelector('.grid');
      if (!grid) return;
      const nodes = Array.from(grid.children);
      for (let i = nodes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        grid.appendChild(nodes[j]);
        nodes.splice(j,1);
      }
      // Subtle animation nudge
      grid.animate([{opacity: .85}, {opacity: 1}], {duration: 220, easing: 'ease-out'});
    });
  }

  // Gallery grayscale toggle + per-image click
  const galBtn = document.getElementById('toggleFilters');
  const gal = document.getElementById('gallery');
  if (gal) {
    gal.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        const img = e.target;
        img.style.filter = img.style.filter ? '' : 'grayscale(100%)';
        img.style.transition = 'filter .2s ease';
      }
    });
  }
  if (galBtn && gal) {
    let on = false;
    galBtn.addEventListener('click', () => {
      on = !on;
      gal.querySelectorAll('img').forEach(img => img.style.filter = on ? 'grayscale(100%)' : '');
    });
  }
})();
