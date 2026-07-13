/* ===== Gavoir — Stuxen-Inspired Interactions ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== HEADER SCROLL EFFECT =====
  const header = document.getElementById('header');
  let lastScroll = 0;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ===== MOBILE MENU =====
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (mobileClose) mobileClose.addEventListener('click', closeMenu);

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // ===== SMOOTH SCROLL FOR NAV LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== SCROLL REVEAL ANIMATION =====
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${index % 4 * 0.1}s`;
    revealObserver.observe(el);
  });

  // ===== SERVICE ITEMS HOVER EFFECT =====
  const serviceItems = document.querySelectorAll('.service-item');
  
  serviceItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      serviceItems.forEach(other => {
        if (other !== item) {
          other.style.opacity = '0.4';
        }
      });
    });

    item.addEventListener('mouseleave', () => {
      serviceItems.forEach(other => {
        other.style.opacity = '1';
      });
    });
  });

  // ===== STAT COUNTER ANIMATION =====
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  const animateStats = () => {
    if (statsCounted) return;
    
    const statsSection = document.querySelector('.about-stats');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      statsCounted = true;

      statNumbers.forEach(stat => {
        const text = stat.textContent;
        const match = text.match(/(\d+)/);
        if (!match) return;

        const target = parseInt(match[1]);
        const suffix = text.replace(match[1], '');
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          stat.textContent = Math.floor(current) + suffix;
        }, 30);
      });
    }
  };

  window.addEventListener('scroll', animateStats, { passive: true });

  // ===== TESTIMONIAL CARDS TILT =====
  const testimonialCards = document.querySelectorAll('.testimonial-card');

  testimonialCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ===== HERO CAROUSEL PARALLAX ON MOUSE MOVE =====
  const hero = document.querySelector('.hero');
  const heroCarousel = document.querySelector('.hero-carousel');

  if (hero && heroCarousel) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heroCarousel.style.transform = `translateY(${y * 5}px)`;
    });

    hero.addEventListener('mouseleave', () => {
      heroCarousel.style.transform = '';
    });
  }

});
