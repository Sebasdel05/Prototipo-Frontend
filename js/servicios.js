/**
 * servicios.js — Lógica de la página de Servicios
 * Mini CRUD: crear y eliminar servicios
 * Búsqueda y filtrado por categoría
 */

/* ── Estado: combina servicios base + los creados por el usuario ── */
function getLocalServices() {
  return JSON.parse(localStorage.getItem("servicios_custom") || "[]");
}
function saveLocalServices(arr) {
  localStorage.setItem("servicios_custom", JSON.stringify(arr));
}
function getAllServices() {
  return [...servicios, ...getLocalServices()];
}

let activeCat = "todos";

/* ── Render ── */
function renderServiciosGrid(lista) {
  const grid = document.getElementById("cardsGrid");
  if (!grid) return;
  if (!lista.length) {
    grid.innerHTML =
      '<p style="color:var(--light);text-align:center;grid-column:1/-1;padding:3rem;">No se encontraron servicios.</p>';
    return;
  }
  grid.innerHTML = lista
    .map((s, i) => {
      const fav = isFav(s.id);
      const isCustom = String(s.id).startsWith("c_");
      return `
    <article class="card reveal" style="transition-delay:${i * 0.07}s">
      <div class="card-img">
        <img src="${s.imagen || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80"}" alt="${s.titulo}" loading="lazy"/>
        <span class="card-tag">${s.tag || s.categoria}</span>
        ${isCustom ? `<button class="card-delete" onclick="deleteServicio('${s.id}')" title="Eliminar">✕</button>` : ""}
        <button class="card-fav ${fav ? "active" : ""}" onclick="toggleFav(this,'${s.id}','${s.titulo}')" aria-label="Favorito">
          <svg viewBox="0 0 24 24" fill="${fav ? "#E05555" : "none"}" stroke="${fav ? "#E05555" : "#89D185"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="card-body">
        <h3 class="card-title">${s.titulo}</h3>
        <p class="card-desc">${s.descripcion}</p>
        <div class="card-rating">
          <span class="stars">${renderStars(parseInt(s.estrellas) || 5)}</span>
          <span class="rating-text">${s.estrellas}.0 (${s.reseñas || 0} reseñas)</span>
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

function filterAndRender() {
  const query = (
    document.getElementById("searchInput")?.value || ""
  ).toLowerCase();
  let lista = getAllServices();
  if (activeCat !== "todos")
    lista = lista.filter((s) => s.categoria === activeCat);
  if (query)
    lista = lista.filter(
      (s) =>
        s.titulo.toLowerCase().includes(query) ||
        s.descripcion.toLowerCase().includes(query),
    );
  renderServiciosGrid(lista);
}

/* ── CRUD: Agregar ── */
function addServicio() {
  const titulo = document.getElementById("newTitulo")?.value.trim();
  const desc = document.getElementById("newDesc")?.value.trim();
  const categoria = document.getElementById("newCategoria")?.value;
  const imagen = document.getElementById("newImagen")?.value.trim();
  const estrellas = parseInt(
    document.getElementById("newEstrellas")?.value || "5",
  );

  if (!titulo || !desc) {
    showToast("⚠️ Título y descripción son obligatorios");
    return;
  }

  const tagMap = {
    tecnologia: "Tecnología",
    marketing: "Marketing",
    educacion: "Educación",
    diseno: "Diseño",
    seguridad: "Seguridad",
  };
  const nuevo = {
    id: "c_" + Date.now(),
    titulo,
    descripcion: desc,
    categoria,
    tag: tagMap[categoria] || categoria,
    imagen:
      imagen ||
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
    estrellas,
    reseñas: 0,
    descripcionLarga: desc,
    caracteristicas: [],
    porQue: [],
  };

  const customs = getLocalServices();
  customs.push(nuevo);
  saveLocalServices(customs);
  clearForm();
  filterAndRender();
  showToast("✅ Servicio agregado correctamente");
}

/* ── CRUD: Eliminar ── */
function deleteServicio(id) {
  if (!confirm("¿Eliminar este servicio?")) return;
  const customs = getLocalServices().filter((s) => s.id !== id);
  saveLocalServices(customs);
  filterAndRender();
  showToast("🗑️ Servicio eliminado");
}

/* ── Limpiar form ── */
function clearForm() {
  ["newTitulo", "newDesc", "newImagen"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}

/* ── Filtro categoría ── */
function initFilter() {
  const wrap = document.getElementById("categoryFilter");
  if (!wrap) return;
  wrap.addEventListener("click", (e) => {
    const pill = e.target.closest(".cat-pill");
    if (!pill) return;
    wrap
      .querySelectorAll(".cat-pill")
      .forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    activeCat = pill.dataset.cat;
    filterAndRender();
  });
}

/* ── Leer ?cat= de la URL ── */
function readURLParams() {
  const cat = new URLSearchParams(location.search).get("cat");
  if (cat) {
    activeCat = cat;
    const pill = document.querySelector(`.cat-pill[data-cat="${cat}"]`);
    if (pill) {
      document
        .querySelectorAll(".cat-pill")
        .forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  readURLParams();
  initFilter();
  filterAndRender();
});
