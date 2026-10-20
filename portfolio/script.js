
document.addEventListener('DOMContentLoaded', () => {

  // ─── SET YEAR ────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  // ─── CUSTOM CURSOR ───────────────────────────────
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  // Disable custom cursor on touch devices
  if ('ontouchstart' in window) {
    document.body.classList.add('no-custom-cursor');
  } else {
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left  = mouseX + 'px';
      dot.style.top   = mouseY + 'px';
    });

    // Smooth ring follow
    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover effect
    const hoverTargets = document.querySelectorAll(
      'a, button, .stack-item, .project-card'
    );
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
  }


  // ─── NAVBAR ──────────────────────────────────────
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNavLink();
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  const phrases = [
    'software designs.',
    'hardware projects.',
    'embedded systems.',
    'clean web and mobile apps.',
    'meaningful products.',
  ];

  const tw = document.getElementById('typewriter');
  let phIdx = 0;

  if (tw) {
    const showPhrase = () => {
      tw.classList.remove('phrase-slide');
      void tw.offsetWidth;
      phIdx = (phIdx + 1) % phrases.length;
      tw.textContent = phrases[phIdx];
      tw.classList.add('phrase-slide');
    };

    tw.textContent = phrases[phIdx];
    tw.classList.add('phrase-slide');
    setInterval(showPhrase, 2600);
  }

  const badgePhrases = [
    '4th Year Computer Engineering Student',
    'Student Developer',
    'Embedded Systems Enthusiast',
  ];
  const badgeText = document.getElementById('heroBadgeText');
  let badgePhraseIndex = 0;

  if (badgeText) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cycleDuration = 3500;
    const typingSpeed = 35;
    const erasingSpeed = 20;

    const typePhrase = (phrase, index, onComplete) => {
      badgeText.textContent = phrase.slice(0, index);
      if (index < phrase.length) {
        setTimeout(() => typePhrase(phrase, index + 1, onComplete), typingSpeed);
      } else {
        onComplete();
      }
    };

    const erasePhrase = (onComplete) => {
      const currentText = badgeText.textContent;
      badgeText.textContent = currentText.slice(0, -1);
      if (badgeText.textContent) {
        setTimeout(() => erasePhrase(onComplete), erasingSpeed);
      } else {
        onComplete();
      }
    };

    const runBadgeCycle = () => {
      const phrase = badgePhrases[badgePhraseIndex];
      if (prefersReducedMotion) {
        badgeText.textContent = phrase;
        setTimeout(() => {
          badgePhraseIndex = (badgePhraseIndex + 1) % badgePhrases.length;
          runBadgeCycle();
        }, cycleDuration);
        return;
      }

      badgeText.textContent = '';
      const typingDuration = phrase.length * typingSpeed;
      const erasingDuration = phrase.length * erasingSpeed;

      typePhrase(phrase, 1, () => {
        setTimeout(() => {
          erasePhrase(() => {
            badgePhraseIndex = (badgePhraseIndex + 1) % badgePhrases.length;
            runBadgeCycle();
          });
        }, Math.max(0, cycleDuration - typingDuration - erasingDuration));
      });
    };

    runBadgeCycle();
  }

  // ─── SCROLL REVEAL ───────────────────────────────
  const revealEls = document.querySelectorAll('[data-reveal]');
  const observer  = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  // Add reveal attrs dynamically to key elements
  document.querySelectorAll(
    '.project-card, .about-education, .about-description, .stack-group, .contact-item, .contact-form'
  ).forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    el.setAttribute('data-reveal-delay', Math.min(i % 4 + 1, 4));
    observer.observe(el);
  });


  const form     = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalButtonContent = btn.innerHTML;
      const endpoint = form.getAttribute('action');

      if (!endpoint || endpoint.includes('YOUR_FORM_ID')) {
        formNote.textContent = 'Add your Formspree endpoint to the form action before sending messages.';
        formNote.className = 'form-note error';
        return;
      }

      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
      formNote.textContent = 'Sending your message…';
      formNote.className = 'form-note';

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form)
        });

        if (!response.ok) {
          formNote.textContent = `Could not send your message (HTTP ${response.status}). Please try again or email me directly.`;
          formNote.className = 'form-note error';
          return;
        }

        formNote.textContent = 'Message sent! I\'ll get back to you soon.';
        formNote.className = 'form-note success';
        form.reset();
      } catch (error) {
        console.error('Contact form submission failed:', error);
        formNote.textContent = 'Could not reach the form service. Check your connection and try again, or email me directly.';
        formNote.className = 'form-note error';
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalButtonContent;
      }
    });
  }

  document.querySelectorAll('.stack-item').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
