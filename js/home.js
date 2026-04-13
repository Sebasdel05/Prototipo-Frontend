/**
 * home.js — Lógica exclusiva del Home
 * Renderiza tarjetas dinámicamente desde data.js
 * Gestiona el filtro por categoría
 */

function renderCards(lista) {
  const grid = document.getElementById("cardsGrid");
  if (!grid) return;
  if (!lista.length) {
    grid.innerHTML =
      '<p style="color:var(--light);text-align:center;grid-column:1/-1;padding:2rem;">No hay servicios en esta categoría.</p>';
    return;
  }
  grid.innerHTML = lista
    .map((s, i) => {
      const fav = isFav(s.id);
      return `
    <article class="card reveal" style="transition-delay:${i * 0.08}s" role="article" aria-label="${s.titulo}">
      <div class="card-img">
        <img src="${s.imagen}" alt="${s.titulo}" loading="lazy"/>
        <span class="card-tag">${s.tag}</span>
        <button class="card-fav ${fav ? "active" : ""}" onclick="toggleFav(this,${s.id},'${s.titulo}')" aria-label="Guardar en favoritos">
          <svg viewBox="0 0 24 24" fill="${fav ? "#E05555" : "none"}" stroke="${fav ? "#E05555" : "#89D185"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="card-body">
        <h3 class="card-title">${s.titulo}</h3>
        <p class="card-desc">${s.descripcion}</p>
        <div class="card-rating">
          <span class="stars">${renderStars(s.estrellas)}</span>
          <span class="rating-text">${s.estrellas}.0 (${s.reseñas} reseñas)</span>
        </div>
        <div class="card-footer">
          <a href="detalle.html?id=${s.id}" class="btn-card">Ver detalles</a>
        </div>
      </div>
    </article>`;
    })
    .join("");
  observeReveal();
}

function initCategoryFilter() {
  const wrap = document.getElementById("categoryFilter");
  if (!wrap) return;
  wrap.addEventListener("click", (e) => {
    const pill = e.target.closest(".cat-pill");
    if (!pill) return;
    wrap
      .querySelectorAll(".cat-pill")
      .forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    const cat = pill.dataset.cat;
    renderCards(
      cat === "todos"
        ? servicios
        : servicios.filter((s) => s.categoria === cat),
    );
  });
}

function subscribeNewsletter() {
  const input = document.getElementById("newsletterEmail");
  const msg = document.getElementById("newsletterMsg");
  if (!input.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
    showToast("⚠️ Ingresa un correo válido");
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

document.addEventListener("DOMContentLoaded", () => {
  renderCards(servicios);
  initCategoryFilter();
});
