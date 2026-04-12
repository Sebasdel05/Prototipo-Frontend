/**
 * home.js
 * Lógica específica del Home (index.html):
 * - Renderizado dinámico de tarjetas desde data.js
 * - Filtro por categoría
 */

/* ==========================================
   RENDERIZAR CARDS
========================================== */

/**
 * Genera e inserta las tarjetas de servicios en el DOM.
 * @param {Array} lista - Array de objetos servicio
 */
function renderCards(lista) {
  const grid = document.getElementById("cardsGrid");
  if (!grid) return;

  if (!lista.length) {
    grid.innerHTML = `
      <p style="color:var(--light);text-align:center;grid-column:1/-1;padding:2rem;">
        No hay servicios en esta categoría.
      </p>`;
    return;
  }

  grid.innerHTML = lista
    .map((s, i) => {
      const favActive = isFav(s.id);
      return `
    <article class="card reveal" style="--i:${i}" role="article" aria-label="${s.titulo}">
      <div class="card-img">
        <img src="${s.imagen}" alt="${s.titulo}" loading="lazy" />
        <span class="card-tag">${s.tag}</span>
        <button
          class="card-fav ${favActive ? "active" : ""}"
          onclick="toggleFav(this, ${s.id}, '${s.titulo}')"
          aria-label="Guardar en favoritos"
        >
          <svg viewBox="0 0 24 24" fill="${favActive ? "#E05555" : "none"}"
            stroke="${favActive ? "#E05555" : "#89D185"}"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06
                     a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78
                     1.06-1.06a5.5 5.5 0 000-7.78z"/>
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

  // Re-observar nuevos elementos para el scroll reveal
  observeReveal();
}

/* ==========================================
   FILTRO POR CATEGORÍA
========================================== */

/**
 * Inicializa los botones de filtro por categoría.
 */
function initCategoryFilter() {
  const filterContainer = document.getElementById("categoryFilter");
  if (!filterContainer) return;

  filterContainer.addEventListener("click", function (e) {
    const pill = e.target.closest(".cat-pill");
    if (!pill) return;

    // Actualizar estado visual
    document
      .querySelectorAll(".cat-pill")
      .forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");

    // Filtrar y renderizar
    const cat = pill.dataset.cat;
    const filtrados =
      cat === "todos"
        ? servicios
        : servicios.filter((s) => s.categoria === cat);

    renderCards(filtrados);
  });
}

/* ==========================================
   INIT HOME
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderCards(servicios); // Renderiza todos al inicio
  initCategoryFilter(); // Activa el filtro
});
