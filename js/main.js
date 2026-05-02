/* ===================================================================
   Main Sail — Shared JavaScript
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initMegaDropdowns();
  initScrollReveal();
  initTickers();
  initAnchorNav();
  setActiveNavLink();
});

/* --- Sticky Header --- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  // All pages: always show solid white header
  header.classList.add('is-scrolled');
}

/* --- Mobile Navigation --- */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-nav-overlay');
  if (!toggle || !nav) return;

  function openNav() {
    toggle.classList.add('is-open');
    nav.classList.add('is-open');
    if (overlay) overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    toggle.classList.remove('is-open');
    nav.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) closeNav();
    else openNav();
  });

  if (overlay) overlay.addEventListener('click', closeNav);

  // Accordions
  document.querySelectorAll('.mobile-accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      const isOpen = panel.classList.contains('is-open');

      // Close all
      document.querySelectorAll('.mobile-accordion-panel').forEach(p => p.classList.remove('is-open'));
      document.querySelectorAll('.mobile-accordion-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));

      if (!isOpen) {
        panel.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });
}

/* --- Mega Dropdowns --- */
function initMegaDropdowns() {
  document.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
    const dropdown = trigger.nextElementSibling;
    if (!dropdown) return;

    let closeTimeout;

    function open() {
      clearTimeout(closeTimeout);
      // Close all others
      document.querySelectorAll('.mega-dropdown.is-open').forEach(d => {
        if (d !== dropdown) d.classList.remove('is-open');
      });
      document.querySelectorAll('.nav-dropdown-trigger[aria-expanded="true"]').forEach(t => {
        if (t !== trigger) t.setAttribute('aria-expanded', 'false');
      });
      dropdown.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }

    function close() {
      closeTimeout = setTimeout(() => {
        dropdown.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }, 150);
    }

    trigger.addEventListener('mouseenter', open);
    trigger.addEventListener('mouseleave', close);
    dropdown.addEventListener('mouseenter', () => clearTimeout(closeTimeout));
    dropdown.addEventListener('mouseleave', close);

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (dropdown.classList.contains('is-open')) close();
      else open();
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        close();
        trigger.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        open();
        const firstItem = dropdown.querySelector('.mega-dropdown-item');
        if (firstItem) firstItem.focus();
      } else if ((e.key === 'Enter' || e.key === ' ') && !dropdown.classList.contains('is-open')) {
        e.preventDefault();
        open();
        const firstItem = dropdown.querySelector('.mega-dropdown-item');
        if (firstItem) firstItem.focus();
      }
    });

    dropdown.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        close();
        trigger.focus();
      }
    });
  });

  // Close all on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown-trigger') && !e.target.closest('.mega-dropdown')) {
      document.querySelectorAll('.mega-dropdown.is-open').forEach(d => d.classList.remove('is-open'));
      document.querySelectorAll('.nav-dropdown-trigger[aria-expanded="true"]').forEach(t => t.setAttribute('aria-expanded', 'false'));
    }
  });
}

/* --- Scroll Reveal (IntersectionObserver) --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --- Logo Tickers --- */
function initTickers() {
  document.querySelectorAll('.ticker-track').forEach(track => {
    const origItems = Array.from(track.children);
    if (!origItems.length) return;

    // Clone enough sets so the track always fills the viewport seamlessly
    const viewportWidth = window.innerWidth;
    const gap = parseFloat(getComputedStyle(track).gap || 0);
    let setWidth = origItems.reduce((w, el) => w + el.offsetWidth, 0)
                   + origItems.length * gap;
    const copies = Math.max(2, Math.ceil((viewportWidth * 2) / setWidth));

    for (let i = 0; i < copies; i++) {
      origItems.forEach(item => track.appendChild(item.cloneNode(true)));
    }

    // Calc duration and offset: animate exactly one set's worth of width
    const oneSetWidth = track.scrollWidth / (copies + 1);
    const speed = 50; // px per second
    const duration = oneSetWidth / speed;
    track.style.setProperty('--ticker-duration', `${duration}s`);
    track.style.setProperty('--ticker-offset', `-${oneSetWidth}px`);
  });
}

/* --- Anchor Sub-Navigation --- */
function initAnchorNav() {
  const anchorNav = document.querySelector('.anchor-nav');
  if (!anchorNav) return;

  const links = anchorNav.querySelectorAll('a');
  const sections = [];

  links.forEach(link => {
    const id = link.getAttribute('href')?.replace('#', '');
    const section = id ? document.getElementById(id) : null;
    if (section) sections.push({ link, section });
  });

  if (!sections.length) return;

  function setActive(link) {
    links.forEach(l => l.classList.remove('is-active'));
    if (link) link.classList.add('is-active');
  }

  // Click sets active state immediately; the observer takes over once scroll settles.
  links.forEach(link => {
    link.addEventListener('click', () => setActive(link));
  });

  // Track which sections are currently in the activation band; the topmost one wins.
  const inView = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) inView.add(entry.target);
      else inView.delete(entry.target);
    });

    if (!inView.size) return;
    // Pick the topmost section currently in the activation band.
    const top = [...inView].sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0];
    const match = sections.find(s => s.section === top);
    if (match) setActive(match.link);
  }, {
    threshold: [0, 0.05, 0.5, 1.0],
    rootMargin: '-128px 0px -55% 0px'
  });

  sections.forEach(({ section }) => observer.observe(section));
}

/* --- Active Nav Link Detection --- */
function setActiveNavLink() {
  const path = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  const currentPage = path === '' ? '/' : path;

  const offeringSlugs = [
    '/digital-engineering-manufacturing',
    '/maintenance-logistics-optimization',
    '/enterprise-it',
    '/data-analytics',
    '/program-support'
  ];

  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href')?.replace(/\.html$/, '').replace(/\/$/, '') || '/';
    const linkPage = href === '' ? '/' : href;

    // Mark "What We Do" trigger as active on any offering sub-page
    if (link.classList.contains('nav-dropdown-trigger') && offeringSlugs.includes(currentPage)) {
      link.classList.add('is-active');
      return;
    }

    if (linkPage === currentPage ||
        (currentPage !== '/' && linkPage !== '/' && currentPage.startsWith(linkPage))) {
      link.classList.add('is-active');
    }
  });
}
