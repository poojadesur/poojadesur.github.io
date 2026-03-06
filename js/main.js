// =============================================
// Pooja Desur — Portfolio JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ─────────────────────
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Active nav link on scroll ─────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const activateNavLink = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (scrollPos >= top && scrollPos < bottom) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', activateNavLink, { passive: true });

  // ── Mobile nav toggle ─────────────────────────
  const navToggle = document.getElementById('nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinksContainer.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close nav when a link is clicked (mobile)
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!navLinksContainer.contains(e.target) && !navToggle.contains(e.target)) {
      navLinksContainer.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ── Fade-up IntersectionObserver ─────────────
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => fadeObserver.observe(el));

  // ── Contact form ──────────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit');
      btn.textContent = 'Message sent! ✓';
      btn.style.background = 'linear-gradient(135deg, #16a34a, #22c55e)';
      btn.disabled = true;
      setTimeout(() => {
        contactForm.reset();
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    });
  }

  // ── Typewriter effect for hero subtitle ──────
  const typeTarget = document.getElementById('hero-typewriter');
  if (typeTarget) {
    const phrases = [
      'Software Engineer',
      'ML Researcher',
      'Open-Source Enthusiast',
      'Full-Stack Developer',
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;

    const type = () => {
      const current = phrases[phraseIdx];
      if (!deleting) {
        typeTarget.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typeTarget.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }
      setTimeout(type, deleting ? 60 : 90);
    };
    setTimeout(type, 800);
  }

});
