(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    const closeMenu = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
    document.addEventListener('click', event => {
      if (nav.classList.contains('open') && !nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a, .footer-links a').forEach(link => {
    const target = link.getAttribute('href');
    if (target === current) link.setAttribute('aria-current', 'page');
  });
  // Native cross-document View Transitions where supported; normal navigation is the fallback.
  if ('startViewTransition' in document && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      link.addEventListener('click', event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        document.documentElement.classList.add('navigating');
        setTimeout(() => { location.href = url.href; }, 90);
      });
    });
  }
})();
