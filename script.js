/* ============================================
   GAMER ZONE – SCRIPT.JS
   ============================================ */

(function () {
  "use strict";

  /* ======================================
     SPLASH SCREEN
     ====================================== */
  const splash = document.getElementById("splash-screen");
  const mainSite = document.getElementById("main-site");
  const loaderBar = document.getElementById("loader-bar");

  let progress = 0;
  const loadDuration = 3200; // ms
  const interval = 30;
  const step = (100 / (loadDuration / interval));

  createSplashParticles();

  const loadingTimer = setInterval(() => {
    progress = Math.min(progress + step + Math.random() * step * 0.5, 100);
    loaderBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(loadingTimer);
      setTimeout(showMainSite, 400);
    }
  }, interval);

  function showMainSite() {
    splash.classList.add("fade-out");
    setTimeout(() => {
      splash.style.display = "none";
      mainSite.classList.remove("hidden");
      document.body.style.overflow = "auto";
      initSite();
    }, 800);
  }

  // Prevent scroll during splash
  document.body.style.overflow = "hidden";

  /* ======================================
     SPLASH PARTICLES
     ====================================== */
  function createSplashParticles() {
    const container = document.getElementById("splash-particles");
    const colors = ["#8b22ff", "#00d4ff", "#ff2d78", "#a855f7", "#ffd700"];
    const count = 60;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.classList.add("particle");
      const size = Math.random() * 4 + 1;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        animation-duration: ${Math.random() * 8 + 4}s;
        animation-delay: ${Math.random() * 6}s;
        opacity: 0;
        box-shadow: 0 0 ${size * 3}px currentColor;
      `;
      container.appendChild(p);
    }
  }

  /* ======================================
     SITE INITIALIZATION
     ====================================== */
  function initSite() {
    initNavbar();
    initHeroParticles();
    initScrollReveal();
    initCounters();
    initFilterBar();
    initNavToggle();
  }

  /* ======================================
     NAVBAR
     ====================================== */
  function initNavbar() {
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 60);

      // Active link highlight
      let current = "";
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((sec) => {
        const top = sec.offsetTop - 100;
        if (window.scrollY >= top) current = sec.getAttribute("id");
      });

      navLinks.forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href") === "#" + current) a.classList.add("active");
      });
    });

    // Smooth scroll for nav links
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          // Close mobile menu if open
          document.getElementById("nav-links").classList.remove("open");
        }
      });
    });
  }

  /* ======================================
     NAV TOGGLE (MOBILE)
     ====================================== */
  function initNavToggle() {
    const toggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");

    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  /* ======================================
     HERO PARTICLES
     ====================================== */
  function initHeroParticles() {
    const container = document.getElementById("hero-particles");
    const colors = ["rgba(139,34,255,0.6)", "rgba(0,212,255,0.6)", "rgba(255,45,120,0.5)"];
    const count = 40;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.classList.add("particle");
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        animation-duration: ${Math.random() * 10 + 6}s;
        animation-delay: ${Math.random() * 8}s;
        opacity: 0;
      `;
      container.appendChild(p);
    }
  }

  /* ======================================
     SCROLL REVEAL
     ====================================== */
  function initScrollReveal() {
    // Add reveal class to elements
    const revealSelectors = [
      ".section-header",
      ".featured-card",
      ".game-card",
      ".feature-item",
      ".about-title",
      ".about-desc",
      ".footer-brand",
      ".footer-links",
      ".footer-social",
    ];

    revealSelectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el, i) => {
        el.classList.add("reveal");
        el.style.transitionDelay = (i * 0.08) + "s";
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }

  /* ======================================
     COUNTER ANIMATION
     ====================================== */
  function initCounters() {
    const counters = document.querySelectorAll(".stat-num");
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            counters.forEach((counter) => animateCounter(counter));
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counters.length > 0) observer.observe(counters[0]);

    function animateCounter(el) {
      const target = parseInt(el.dataset.target, 10);
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(easedProgress * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
      }

      requestAnimationFrame(update);
    }
  }

  /* ======================================
     FILTER BAR
     ====================================== */
  function initFilterBar() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const gameCards = document.querySelectorAll(".game-card");

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Update active button
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        gameCards.forEach((card, idx) => {
          const category = card.dataset.category;
          const show = filter === "all" || category === filter;

          if (show) {
            card.style.display = "";
            card.style.animation = `fadeInUp 0.4s ${idx * 0.05}s both`;
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  /* ======================================
     BUTTON RIPPLE EFFECT
     ====================================== */
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".btn, .btn-play, .btn-play-sm, .filter-btn");
    if (!btn) return;

    const ripple = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      left: ${x}px; top: ${y}px;
      background: rgba(255,255,255,0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: rippleAnim 0.6s ease-out forwards;
      pointer-events: none;
    `;

    const prevPos = btn.style.position;
    btn.style.position = "relative";
    btn.style.overflow = "hidden";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  // Inject ripple keyframe
  const rippleStyle = document.createElement("style");
  rippleStyle.textContent = `@keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }`;
  document.head.appendChild(rippleStyle);

  /* ======================================
     MOUSE PARALLAX (HERO)
     ====================================== */
  const hero = document.querySelector(".hero");
  if (hero) {
    document.addEventListener("mousemove", (e) => {
      const mx = (e.clientX / window.innerWidth - 0.5) * 20;
      const my = (e.clientY / window.innerHeight - 0.5) * 20;
      const heroImg = hero.querySelector(".hero-img");
      if (heroImg) {
        heroImg.style.transform = `translate(${mx * 0.3}px, ${my * 0.3}px) scale(1.05)`;
      }
    });
  }

  /* ======================================
     NEON CURSOR TRAIL
     ====================================== */
  (function initCursorTrail() {
    const colors = ["#8b22ff", "#00d4ff", "#ff2d78"];
    let idx = 0;

    document.addEventListener("mousemove", (e) => {
      if (Math.random() > 0.4) return; // Throttle
      const dot = document.createElement("div");
      dot.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 6px; height: 6px;
        border-radius: 50%;
        background: ${colors[idx % colors.length]};
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        animation: trailFade 0.6s ease forwards;
      `;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 600);
      idx++;
    });

    const trailStyle = document.createElement("style");
    trailStyle.textContent = `@keyframes trailFade { to { opacity: 0; transform: translate(-50%, -50%) scale(0); } }`;
    document.head.appendChild(trailStyle);
  })();

  /* ======================================
     TILT EFFECT ON GAME CARDS
     ====================================== */
  document.querySelectorAll(".game-card, .featured-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -8;
      const rotateY = ((x - cx) / cx) * 8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

})();
