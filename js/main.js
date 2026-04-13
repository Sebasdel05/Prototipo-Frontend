/**
 * main.js — Funciones utilitarias compartidas en toda la app
 * Gestión de favoritos (localStorage), Toast, Scroll Reveal, Navbar
 */

/* ── Favoritos ── */
function getFavs() {
  return JSON.parse(localStorage.getItem("favs") || "[]");
}
function saveFavs(arr) {
  localStorage.setItem("favs", JSON.stringify(arr));
}
function isFav(id) {
  return getFavs().some((f) => f.id === String(id));
}
function toggleFav(btn, id, titulo) {
  let favs = getFavs();
  const strId = String(id);
  const idx = favs.findIndex((f) => f.id === strId);
  if (idx === -1) {
    favs.push({ id: strId, titulo });
    btn.classList.add("active");
    btn.querySelector("svg path").setAttribute("fill", "#E05555");
    btn.querySelector("svg path").setAttribute("stroke", "#E05555");
    showToast('❤️ "' + titulo + '" guardado en favoritos');
  } else {
    favs.splice(idx, 1);
    btn.classList.remove("active");
    btn.querySelector("svg path").setAttribute("fill", "none");
    btn.querySelector("svg path").setAttribute("stroke", "#89D185");
    showToast("💔 Eliminado de favoritos");
  }
  saveFavs(favs);
}

/* ── Estrellas ── */
function renderStars(n) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

/* ── Toast ── */
let _toastTimer;
function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove("show"), 3000);
}

/* ── Scroll Reveal ── */
function observeReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* ── Navbar toggle móvil ── */
function initNavToggle() {
  const btn = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (btn && links)
    btn.addEventListener("click", () => links.classList.toggle("open"));
}

/* ── Marcar link activo según página actual ── */
function markActiveLink() {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });
}

/* ── Render partials: navbar y footer ── */
function renderNavbar() {
  const el = document.getElementById("navbar");
  if (!el) return;
  el.innerHTML = `
  <nav class="navbar" role="navigation" aria-label="Navegación principal">
    <a href="index.html" class="nav-logo">
      <div class="nav-logo-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round">
          <path d="M4 6h16M4 10h12M4 14h8"/>
        </svg>
      </div>
      Plataforma Digital
    </a>
    <ul class="nav-links" id="navLinks">
      <li><a href="index.html">Inicio</a></li>
      <li><a href="servicios.html">Servicios</a></li>
      <li><a href="favoritos.html">Favoritos</a></li>
      <li><a href="contacto.html">Contacto</a></li>
      <li><a href="acerca.html">Acerca de</a></li>
    </ul>
    <button class="nav-toggle" id="navToggle" aria-label="Abrir menú">
      <span></span><span></span><span></span>
    </button>
  </nav>`;
  initNavToggle();
  markActiveLink();
}

function renderFooter() {
  const el = document.getElementById("footer");
  if (!el) return;
  el.innerHTML = `
  <footer role="contentinfo">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="nav-logo">
          <div class="nav-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round">
              <path d="M4 6h16M4 10h12M4 14h8"/>
            </svg>
          </div>
          Plataforma Digital
        </a>
        <p>Plataforma líder en servicios digitales, educativos y tecnológicos diseñados para impulsar tu crecimiento profesional.</p>
        <div class="social-row">
          <div class="social-btn">f</div>
          <div class="social-btn">✕</div>
          <div class="social-btn">in</div>
          <div class="social-btn">ig</div>
        </div>
      </div>
      <div class="footer-col">
        <h4>Menú</h4>
        <ul>
          <li><a href="index.html">Inicio</a></li>
          <li><a href="servicios.html">Servicios</a></li>
          <li><a href="favoritos.html">Favoritos</a></li>
          <li><a href="contacto.html">Contacto</a></li>
          <li><a href="acerca.html">Acerca de</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Categorías</h4>
        <ul>
          <li><a href="servicios.html?cat=tecnologia">Tecnología</a></li>
          <li><a href="servicios.html?cat=marketing">Marketing</a></li>
          <li><a href="servicios.html?cat=educacion">Educación</a></li>
          <li><a href="servicios.html?cat=diseno">Diseño</a></li>
          <li><a href="servicios.html?cat=seguridad">Seguridad</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contacto</h4>
        <div class="footer-contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2" stroke-linecap="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          contacto@plataforma.com
        </div>
        <div class="footer-contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2" stroke-linecap="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.08 2.18 2 2 0 012.08 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.21 7.73a16 16 0 006.06 6.06l1.09-1.09a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
          </svg>
          +57 300 123 4567
        </div>
        <div class="footer-contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2" stroke-linecap="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Bogotá, Colombia
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Plataforma de Servicios Digitales. Todos los derechos reservados.</span>
      <span>Política de privacidad · Términos de uso · Cookies</span>
    </div>
  </footer>`;
}

/* ── Init global ── */
document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  renderFooter();
  observeReveal();
});
