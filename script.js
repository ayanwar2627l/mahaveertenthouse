/* ============================================================
   MAHAVEER TENT HOUSE — JAVASCRIPT
   ============================================================ */

// ---- DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initParticles();
  initHamburger();
  initScrollReveal();
  initCounters();
  initGalleryFilter();
  initLightbox();
  initTentTabs();
  initTestimonialsSlider();
  initContactForm();
  initActiveNavLink();
  initMobileBottomNav();
  initSwipeGestures();
});

/* ============================================================
   NAVBAR — scroll behavior
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const scrollHint = document.querySelector('.hero-scroll-hint');

  function handleScroll() {
    // Navbar background
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide scroll hint the moment user scrolls at all
    if (scrollHint) {
      if (window.scrollY > 1) {
        scrollHint.classList.add('hidden-hint');
      } else {
        scrollHint.classList.remove('hidden-hint');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  // Run immediately in case page is already scrolled on load
  handleScroll();
}

/* ============================================================
   ACTIVE NAV LINK — highlight current section
   ============================================================ */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px 0px 0px' });

  sections.forEach(section => observer.observe(section));
}

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ============================================================
   FLOATING PARTICLES
   ============================================================ */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 20;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.width = `${Math.random() * 4 + 2}px`;
    particle.style.height = particle.style.width;
    particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    container.appendChild(particle);
  }
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  const revealEls = [
    '.about-grid',
    '.service-card',
    '.stat-card',
    '.why-card',
    '.testimonial-card',
    '.tent-showcase-grid',
    '.contact-grid',
    '.gallery-item',
    '.section-header',
  ];

  revealEls.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  const suffix5star = ['5'];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target')) || 0;
        const dataSuffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
          step++;
          current += increment;
          if (step >= steps) {
            el.textContent = target + dataSuffix;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current) + dataSuffix;
          }
        }, duration / steps);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* ============================================================
   GALLERY FILTER
   ============================================================ */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach((item, idx) => {
        const category = item.getAttribute('data-category');
        const show = filter === 'all' || category === filter;

        item.style.transition = `opacity 0.4s ease ${idx * 0.03}s, transform 0.4s ease ${idx * 0.03}s`;
        if (show) {
          item.style.display = 'block';
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.85)';
          setTimeout(() => { item.style.display = 'none'; }, 400);
        }
      });
    });
  });
}

/* ============================================================
   LIGHTBOX
   ============================================================ */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let currentItems = [];
  let currentIndex = 0;

  function openLightbox(items, index) {
    currentItems = items;
    currentIndex = index;
    showImage(currentIndex);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showImage(index) {
    const item = currentItems[index];
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-overlay span');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + currentItems.length) % currentItems.length;
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      showImage(currentIndex);
      lightboxImg.style.opacity = '1';
    }, 200);
  }

  lightboxImg.style.transition = 'opacity 0.2s ease';

  document.querySelectorAll('.gallery-item').forEach((item, idx, arr) => {
    item.addEventListener('click', () => {
      const visibleItems = Array.from(arr).filter(i => i.style.display !== 'none');
      const visibleIdx = visibleItems.indexOf(item);
      openLightbox(visibleItems, visibleIdx);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'Escape') closeLightbox();
  });
}

/* ============================================================
   TENT TABS
   ============================================================ */
function initTentTabs() {
  const tabs = document.querySelectorAll('.tent-tab');
  const contents = document.querySelectorAll('.tent-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetTab = tab.getAttribute('data-tab');
      contents.forEach(c => c.classList.remove('active'));
      const target = document.getElementById(`tab-${targetTab}`);
      if (target) target.classList.add('active');
    });
  });
}

/* ============================================================
   TESTIMONIALS SLIDER
   ============================================================ */
function initTestimonialsSlider() {
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  const dotsContainer = document.getElementById('slider-dots');

  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  const totalCards = cards.length;
  let current = 0;
  let autoplayTimer;

  // Determine slides per view
  const getSlidesPerView = () => window.innerWidth <= 768 ? 1 : window.innerWidth <= 900 ? 2 : 3;

  let slidesPerView = getSlidesPerView();
  const totalPages = Math.ceil(totalCards / slidesPerView);

  // Create dots
  function buildDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.className = `slider-dot${i === 0 ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function updateTrack() {
    const cardWidth = cards[0].offsetWidth + 24; // gap = 24px
    track.style.transform = `translateX(-${current * cardWidth * slidesPerView}px)`;
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, totalPages - 1));
    updateTrack();
    updateDots();
  }

  function next() { goTo(current < totalPages - 1 ? current + 1 : 0); }
  function prev() { goTo(current > 0 ? current - 1 : totalPages - 1); }

  prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });
  nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });

  function startAutoplay() {
    autoplayTimer = setInterval(next, 5000);
  }
  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  window.addEventListener('resize', () => {
    slidesPerView = getSlidesPerView();
    buildDots();
    current = 0;
    updateTrack();
    updateDots();
  });

  buildDots();
  startAutoplay();
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');

  function validateField(id, errorId, message, condition) {
    const field = document.getElementById(id);
    const error = document.getElementById(errorId);
    if (!condition) {
      field.classList.add('error');
      if (error) error.textContent = message;
      return false;
    }
    field.classList.remove('error');
    if (error) error.textContent = '';
    return true;
  }

  // Live validation
  document.getElementById('name').addEventListener('input', function () {
    validateField('name', 'name-error', 'Please enter your name', this.value.trim().length >= 2);
  });
  document.getElementById('phone').addEventListener('input', function () {
    validateField('phone', 'phone-error', 'Please enter a valid phone number', /^[\+]?[\d\s\-]{8,15}$/.test(this.value.trim()));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameOk = validateField('name', 'name-error', 'Please enter your name', document.getElementById('name').value.trim().length >= 2);
    const phoneVal = document.getElementById('phone').value.trim();
    const phoneOk = validateField('phone', 'phone-error', 'Please enter a valid phone number', /^[\+]?[\d\s\-]{8,15}$/.test(phoneVal));
    const eventOk = validateField('event-type', 'event-error', 'Please select an event type', document.getElementById('event-type').value !== '');

    if (!nameOk || !phoneOk || !eventOk) return;

    // Show loading
    submitBtn.querySelector('.btn-text').classList.add('hidden');
    submitBtn.querySelector('.btn-loading').classList.remove('hidden');
    submitBtn.disabled = true;

    // Simulate sending
    setTimeout(() => {
      submitBtn.querySelector('.btn-text').classList.remove('hidden');
      submitBtn.querySelector('.btn-loading').classList.add('hidden');
      submitBtn.disabled = false;
      successMsg.classList.remove('hidden');
      form.reset();

      // Build WhatsApp message
      const name = document.getElementById('name').value || '';
      const phone = document.getElementById('phone').value || '';
      const eventType = document.getElementById('event-type').value || '';
      const eventDate = document.getElementById('event-date').value || 'Not specified';
      const guests = document.getElementById('guests').value || 'Not specified';
      const message = document.getElementById('message').value || '';

      const waText = encodeURIComponent(
        `🎉 New Event Inquiry – Mahaveer Tent House\n\n` +
        `👤 Name: ${name}\n📞 Phone: ${phone}\n🎊 Event: ${eventType}\n📅 Date: ${eventDate}\n👥 Guests: ${guests}\n💬 Message: ${message}`
      );

      // Open WhatsApp with details
      window.open(`https://wa.me/918002597415?text=${waText}`, '_blank');

    }, 1800);
  });
}

/* ============================================================
   SMOOTH SCROLL for anchors
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   MOBILE BOTTOM NAV — active section highlight
   ============================================================ */
function initMobileBottomNav() {
  const navMap = {
    'home':         document.getElementById('mbn-home'),
    'services':     document.getElementById('mbn-services'),
    'gallery':      document.getElementById('mbn-gallery'),
  };

  const sections = ['home', 'about', 'services', 'tents', 'gallery', 'testimonials', 'contact'];

  // Map each section to the closest bottom-nav item
  const sectionToNav = {
    'home':         'home',
    'about':        'home',
    'services':     'services',
    'tents':        'services',
    'gallery':      'gallery',
    'testimonials': 'gallery',
    'contact':      null,  // "Call Now" stays highlighted if no override
  };

  function setActive(key) {
    Object.values(navMap).forEach(el => el && el.classList.remove('active'));
    if (key && navMap[key]) navMap[key].classList.add('active');
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const mapped = sectionToNav[id];
        if (mapped !== undefined) setActive(mapped);
      }
    });
  }, { threshold: 0.35, rootMargin: '-60px 0px -40% 0px' });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

/* ============================================================
   SWIPE GESTURES — testimonials slider + lightbox
   ============================================================ */
function initSwipeGestures() {
  // ---- Testimonials swipe ----
  const track = document.getElementById('testimonials-track');
  if (track) {
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    track.addEventListener('touchend', e => {
      if (!isDragging) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        // Trigger prev/next button programmatically
        if (diff > 0) document.getElementById('next-testimonial')?.click();
        else          document.getElementById('prev-testimonial')?.click();
      }
      isDragging = false;
    }, { passive: true });
  }

  // ---- Lightbox swipe ----
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    let lbStartX = 0;
    lightbox.addEventListener('touchstart', e => {
      lbStartX = e.touches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener('touchend', e => {
      const diff = lbStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) document.getElementById('lightbox-next')?.click();
        else          document.getElementById('lightbox-prev')?.click();
      }
    }, { passive: true });
  }

  // ---- Gallery swipe-to-scroll (horizontal on small screens) ----
  const galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid) {
    let gStartX = 0, gStartY = 0;
    galleryGrid.addEventListener('touchstart', e => {
      gStartX = e.touches[0].clientX;
      gStartY = e.touches[0].clientY;
    }, { passive: true });
    // Just let native scroll happen — no JS needed, it's a grid
  }
}

