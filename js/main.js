/* ================================================
   main.js — AI Agent Seminar Landing Page
   Interactions / Canvas / Scroll / Forms
   ================================================ */

'use strict';

// ── Navbar scroll ──────────────────────────────
(function () {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  toggle?.addEventListener('click', () => {
    links?.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    toggle.classList.toggle('active');
    if (toggle.classList.contains('active')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close on link click
  links?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('active');
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
})();

// ── Scroll-based animations ─────────────────────
(function () {
  const targets = document.querySelectorAll(
    '.prob-card, .ikey-card, .value-item, .ecard, .aud-card, .agenda-item, .speaker-inner, .value-quote, .timeline-item'
  );

  targets.forEach(el => {
    el.classList.add('animate-in');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay for grid items
          const siblings = Array.from(entry.target.parentElement?.children || []);
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 80, 400);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
})();

// ── Hero Canvas — particle network ──────────────
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], animFrame;
  const PARTICLE_COUNT = window.innerWidth < 600 ? 40 : 80;
  const MAX_DIST = 140;
  const GOLD = 'rgba(201, 168, 76,';
  const BLUE = 'rgba(74, 244, 255,';

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r:  Math.random() * 2 + 0.8,
        gold: Math.random() > 0.65,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const a = (1 - dist / MAX_DIST) * 0.2;
          const color = particles[i].gold ? GOLD : BLUE;
          ctx.beginPath();
          ctx.strokeStyle = `${color}${a})`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Dots
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold
        ? `${GOLD}0.7)`
        : `${BLUE}0.5)`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });

    animFrame = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animFrame);
    resize();
    draw();
  });

  resize();
  draw();
})();

// ── CTA Canvas — subtle glow orbs ───────────────
(function () {
  const canvas = document.getElementById('ctaCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, orbs = [], animFrame2;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    initOrbs();
  }

  function initOrbs() {
    orbs = [
      { x: W * 0.2, y: H * 0.4, r: 200, vx: 0.15, vy: 0.08, color: '201,168,76' },
      { x: W * 0.8, y: H * 0.6, r: 240, vx: -0.12, vy: 0.1, color: '74,244,255' },
      { x: W * 0.5, y: H * 0.2, r: 160, vx: 0.08, vy: -0.12, color: '201,168,76' },
    ];
  }

  function draw2() {
    ctx.clearRect(0, 0, W, H);
    orbs.forEach(o => {
      const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      grad.addColorStop(0,   `rgba(${o.color}, 0.12)`);
      grad.addColorStop(0.5, `rgba(${o.color}, 0.05)`);
      grad.addColorStop(1,   `rgba(${o.color}, 0)`);
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      o.x += o.vx;
      o.y += o.vy;
      if (o.x < -o.r || o.x > W + o.r) o.vx *= -1;
      if (o.y < -o.r || o.y > H + o.r) o.vy *= -1;
    });
    animFrame2 = requestAnimationFrame(draw2);
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animFrame2);
    resize();
    draw2();
  });

  resize();
  draw2();
})();

// ── Modal System ─────────────────────────────────
window.openModal = function (type) {
  const id = type === 'apply' ? 'applyModal' : 'inquiryModal';
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeModal = function (type) {
  const id = type === 'apply' ? 'applyModal' : 'inquiryModal';
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
};

// Close on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(o => {
      o.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
});

// ── Form Submission ──────────────────────────────
window.submitForm = async function (e, type) {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('.form-submit-btn');
  const originalHTML = btn.innerHTML;

  btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>처리 중...</span>';
  btn.disabled = true;

  try {
    // Gather form data
    const data = {};
    new FormData(form).forEach((val, key) => { data[key] = val; });
    data.type      = type;
    data.timestamp = new Date().toISOString();
    data.event     = 'AI Agent 세계 들여다 보기 세미나';
    if (type === 'inquiry') {
      data.recipient = 'sudesigmgo@gmail.com';
    }

    // Save to table
    const tableName = type === 'apply' ? 'seminar_applications' : 'seminar_inquiries';
    await fetch(`tables/${tableName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    // Success
    form.reset();
    closeModal(type);

    const msg = type === 'apply'
      ? '신청이 완료되었습니다. 곧 연락드리겠습니다.'
      : '문의가 접수되었습니다. 빠른 시일 내 답변드리겠습니다.';
    showToast(msg);

  } catch (err) {
    console.error(err);
    showToast('처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
  } finally {
    btn.innerHTML = originalHTML;
    btn.disabled = false;
  }
};

// ── Toast ──────────────────────────────────────
function showToast(message) {
  const toast = document.getElementById('successToast');
  const msg   = document.getElementById('toastMessage');
  if (!toast || !msg) return;

  msg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ── Smooth active nav highlight ─────────────────
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('nav-active');
            }
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(s => observer.observe(s));
})();

// ── Number counter animation (if needed) ─────────
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const target = parseInt(el.dataset.count);
        const duration = 1600;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * ease).toLocaleString();
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();
