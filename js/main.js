/* ============================================
   ELENA FIDALGO DESIGNS — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Page Loader ---
  const loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('loaded'), 300);
    });
    // Fallback: hide loader after 3s even if images still loading
    setTimeout(() => loader.classList.add('loaded'), 3000);
  }

  // --- Navigation scroll effect ---
  const nav = document.querySelector('.nav');
  if (nav) {
    const handleScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // --- Mobile menu ---
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => {
        if (link.classList.contains('mobile-menu__link--toggle')) {
          link.parentElement.classList.toggle('active');
          return;
        }
        toggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll reveal animations ---
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // --- Hero parallax (only for full-bleed heroes, not split) ---
  const hero = document.querySelector('.hero');
  if (hero && !hero.classList.contains('hero--split')) {
    const heroImage = hero.querySelector('.hero__image');
    if (heroImage) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
          heroImage.style.transform = `scale(${1 + scrolled * 0.0001}) translateY(${scrolled * 0.3}px)`;
        }
      }, { passive: true });
      setTimeout(() => hero.classList.add('loaded'), 100);
    }
  }

  // --- Hero slideshow ---
  const slideshow = document.querySelector('.hero__slideshow');
  if (slideshow) {
    const slides = slideshow.querySelectorAll('.hero__slide');
    const dots = slideshow.querySelectorAll('.hero__dot');
    let current = 0;
    let interval;

    const goToSlide = (index) => {
      slides[current].classList.remove('hero__slide--active');
      dots[current].classList.remove('hero__dot--active');
      current = index;
      slides[current].classList.add('hero__slide--active');
      dots[current].classList.add('hero__dot--active');
    };

    const nextSlide = () => {
      goToSlide((current + 1) % slides.length);
    };

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(interval);
        goToSlide(i);
        interval = setInterval(nextSlide, 5000);
      });
    });

    interval = setInterval(nextSlide, 5000);
  }

  // --- Lightbox for project images ---
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox__close');

    document.querySelectorAll('[data-lightbox]').forEach(el => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', (e) => {
        // If the element is an img, use it directly; otherwise find the img inside
        const targetImg = el.tagName === 'IMG' ? el : el.querySelector('img');
        if (targetImg) {
          lightboxImg.src = targetImg.src;
          lightboxImg.alt = targetImg.alt;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    lightbox.addEventListener('click', closeLightbox);
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // --- Smooth anchor scrolling ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Contact form handling ---
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn');
      btn.textContent = 'Message Sent';
      btn.style.background = '#455642';
      btn.style.borderColor = '#455642';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // --- Active nav link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});
