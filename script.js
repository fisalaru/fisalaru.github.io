// ==========================================================================
// Florin Șalaru CV — Script
// ==========================================================================

(function () {
  'use strict';

  // ---------- Dark Mode Toggle ----------
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  updateToggleIcon();

  if (toggle) {
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
      updateToggleIcon();
    });
  }

  function updateToggleIcon() {
    if (!toggle) return;
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  // ---------- Header Hide on Scroll ----------
  const header = document.getElementById('header');
  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        if (currentScroll > 80) {
          header.classList.toggle('header--hidden', currentScroll > lastScroll && currentScroll > 200);
        } else {
          header.classList.remove('header--hidden');
        }
        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });

  // ---------- Mobile Menu ----------
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.getElementById('mobileOverlay');

  function closeMenu() {
    navLinks.classList.remove('open');
    overlay.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      overlay.classList.toggle('active', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ---------- Scroll Reveal ----------
  const revealElements = document.querySelectorAll(
    '.section-title, .about-text, .about-highlights, .timeline-item, .edu-card, .project-card, .skill-group, .contact-card'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => observer.observe(el));

  // ---------- Smooth Scroll for Nav Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- Language Bar Animation ----------
  const languageBars = document.querySelectorAll('.language-fill');
  const langObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.style.width;
          langObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  languageBars.forEach(bar => {
    const finalWidth = bar.style.width;
    bar.style.width = '0%';
    langObserver.observe(bar);
    // Reset to final width when visible
    const originalObserve = langObserver;
    const resetObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => { bar.style.width = finalWidth; }, 200);
            resetObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    resetObserver.observe(bar);
  });
})();
