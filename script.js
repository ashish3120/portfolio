/* ====================================================
   PORTFOLIO - script.js
   Features:
     - Custom cursor animation
     - Particle network animation (Canvas)
     - Typing effect
     - Skill bar animation on scroll
     - Project filter
     - Scroll-reveal animations
     - Active nav link tracking
     - Hamburger menu
   ==================================================== */

/* ── 0. CUSTOM CURSOR ───────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  // Only enable on devices with a fine pointer (mouse)
  if (!window.matchMedia('(pointer: fine)').matches) return;

  let mouseX = -100, mouseY = -100;
  let ringX  = -100, ringY  = -100;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows instantly
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Ring follows with smooth lerp
  function animateRing() {
    const ease = 0.15;
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;

    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';

    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state on interactive elements
  const hoverTargets = 'a, button, input, textarea, .filter-btn, .interest-card, .project-card, .social-btn, .btn-download-cv, .btn-download-cv-lg, .btn-send';

  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('cursor-hover');
      ring.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('cursor-hover');
      ring.classList.remove('cursor-hover');
    });
  });

  // Click animation
  document.addEventListener('mousedown', () => {
    dot.classList.add('cursor-click');
    ring.classList.add('cursor-click');
  });
  document.addEventListener('mouseup', () => {
    dot.classList.remove('cursor-click');
    ring.classList.remove('cursor-click');
  });

  // Hide cursor when leaving the window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
})();

/* ── 1. PARTICLES ────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const CONFIG = {
    count: 80,
    maxDist: 140,
    speed: 0.75,
    color: 'rgba(255,255,255,',
    lineColor: 'rgba(255,255,255,',
    radius: 2,
  };

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function createParticle() {
    return {
      x: rand(0, canvas.width),
      y: rand(0, canvas.height),
      vx: rand(-CONFIG.speed, CONFIG.speed),
      vy: rand(-CONFIG.speed, CONFIG.speed),
      r: rand(1.2, CONFIG.radius + 1),
    };
  }

  for (let i = 0; i < CONFIG.count; i++) {
    particles.push(createParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      // Move
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = CONFIG.color + '0.75)';
      ctx.fill();

      // Lines to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.maxDist) {
          const alpha = 1 - dist / CONFIG.maxDist;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = CONFIG.lineColor + (alpha * 0.5) + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── 2. TYPED TEXT EFFECT ────────────────────────── */
(function initTyped() {
  const el = document.getElementById('typed-text');
  const strings = [
    'Machine Learning Engineer',
    'Backend & API Developer',
    'AI Solutions Builder',
    'Deep Learning Enthusiast',
    'Python Developer',
  ];
  let si = 0, ci = 0, deleting = false;
  const TYPE_SPEED = 90, DEL_SPEED = 55, PAUSE = 1400;

  function type() {
    const current = strings[si];
    if (deleting) {
      ci--;
    } else {
      ci++;
    }
    el.textContent = current.slice(0, ci);

    let delay = deleting ? DEL_SPEED : TYPE_SPEED;

    if (!deleting && ci === current.length) {
      delay = PAUSE;
      deleting = true;
    } else if (deleting && ci === 0) {
      deleting = false;
      si = (si + 1) % strings.length;
      delay = 320;
    }
    setTimeout(type, delay);
  }
  setTimeout(type, 600);
})();

/* ── 3. HAMBURGER MENU ───────────────────────────── */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
})();

/* ── 4. NAVBAR SCROLL STYLE ──────────────────────── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    // Show navbar if scrolled > 100px
    nav.classList.toggle('visible', window.scrollY > 100);
    // Add background color shadow if scrolled further
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
})();

/* ── 5. ACTIVE NAV LINK (INTERSECTION) ───────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const topLinks  = document.querySelectorAll('.nav-link');
  const heroLinks = document.querySelectorAll('.hero-nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Clear all active classes
        topLinks.forEach(l => l.classList.remove('active'));
        heroLinks.forEach(l => l.classList.remove('active'));

        // Highlight top nav
        const activeTop = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeTop) activeTop.classList.add('active');

        // Highlight hero nav
        const activeHero = document.querySelector(`.hero-nav-link[href="#${entry.target.id}"]`);
        if (activeHero) activeHero.classList.add('active');
      }
    });
  }, { threshold: 0.38 });

  sections.forEach(s => observer.observe(s));
})();

/* ── 6. SKILL BAR ANIMATION ──────────────────────── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.width + '%';
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => observer.observe(f));
})();

/* ── 7. PROJECT FILTERS ──────────────────────────── */
(function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards   = document.querySelectorAll('.project-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const cats = card.dataset.category || '';
        if (filter === 'all' || cats.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

/* ── 8. SCROLL REVEAL ────────────────────────────── */
(function initScrollReveal() {
  // Add .reveal to major blocks
  const targets = [
    '.about-container',
    '.skills-section',
    '.interests-section',
    '.resume-item',
    '.project-card',
    '.contact-info-card',
    '.contact-form',
    '.section-title',
  ];
  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ── 9. CONTACT FORM ─────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-send');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#22c55e';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
})();
