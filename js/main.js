/**
 * main.js
 * Funciones compartidas en toda la aplicación:
 * - Gestión de favoritos (localStorage)
 * - Toast de notificaciones
 * - Scroll reveal con IntersectionObserver
 * - Navbar toggle (móvil)
 * - Suscripción al newsletter
 */

/* ==========================================
   FAVORITOS — localStorage
========================================== */

/**
 * Obtiene el array de favoritos guardados.
 * @returns {Array} Lista de objetos { id, titulo }
 */
function getFavs() {
  return JSON.parse(localStorage.getItem("favs") || "[]");
}

/**
 * Guarda el array de favoritos en localStorage.
 * @param {Array} arr
 */
function saveFavs(arr) {
  localStorage.setItem("favs", JSON.stringify(arr));
}

/**
 * Agrega o elimina un servicio de favoritos y actualiza el botón.
 * @param {HTMLElement} btn  - Botón corazón que disparó el evento
 * @param {number|string} id - ID del servicio
 * @param {string} titulo    - Nombre del servicio (para el toast)
 */
function toggleFav(btn, id, titulo) {
  let favs = getFavs();
  const strId = String(id);
  const idx = favs.findIndex((f) => f.id === strId);

  if (idx === -1) {
    favs.push({ id: strId, titulo });
    btn.classList.add("active");
    btn.querySelector("svg path").setAttribute("fill", "#E05555");
    btn.querySelector("svg path").setAttribute("stroke", "#E05555");
    showToast(`❤️ "${titulo}" guardado en favoritos`);
  } else {
    favs.splice(idx, 1);
    btn.classList.remove("active");
    btn.querySelector("svg path").setAttribute("fill", "none");
    btn.querySelector("svg path").setAttribute("stroke", "#89D185");
    showToast(`💔 Eliminado de favoritos`);
  }

  saveFavs(favs);
}

/**
 * Verifica si un servicio está en favoritos.
 * @param {number|string} id
 * @returns {boolean}
 */
function isFav(id) {
  return getFavs().some((f) => f.id === String(id));
}

/* ==========================================
   RENDERIZAR ESTRELLAS
========================================== */

/**
 * Genera string de estrellas llenas y vacías.
 * @param {number} n - Número de estrellas (1-5)
 * @returns {string}
 */
function renderStars(n) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

/* ==========================================
   TOAST NOTIFICATIONS
========================================== */

let toastTimeout;

/**
 * Muestra una notificación flotante tipo toast.
 * @param {string} msg - Mensaje a mostrar
 */
function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 3000);
}

/* ==========================================
   SCROLL REVEAL
========================================== */

/**
 * Observa todos los elementos .reveal y les aplica
 * la clase .visible cuando entran al viewport.
 */
function observeReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* ==========================================
   NAVBAR TOGGLE (móvil)
========================================== */

/**
 * Inicializa el botón hamburguesa del navbar.
 */
function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }
}

/* ==========================================
   NEWSLETTER
========================================== */

/**
 * Valida el email y guarda la suscripción en localStorage.
 */
function subscribeNewsletter() {
  const input = document.getElementById("newsletterEmail");
  const msg = document.getElementById("newsletterMsg");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!input || !input.value || !emailRegex.test(input.value)) {
    showToast("⚠️ Por favor ingresa un correo válido");
    return;
  }

  const subs = JSON.parse(localStorage.getItem("subscribers") || "[]");
  if (!subs.includes(input.value)) {
    subs.push(input.value);
    localStorage.setItem("subscribers", JSON.stringify(subs));
  }

  if (msg) msg.style.display = "block";
  input.value = "";
  showToast("✅ ¡Suscripción exitosa!");
}

/* ==========================================
   INIT GLOBAL
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  observeReveal();
});
