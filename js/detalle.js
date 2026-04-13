/**
 * detalle.js — Lógica de la vista de detalle del servicio
 * Lee ?id= de la URL y renderiza la información completa
 */

const whyIconsMap = {
  "Calidad Garantizada": "🏆",
  "Entrega Puntual": "⏱️",
  "Seguridad Máxima": "🔒",
  Innovación: "💡",
  "ROI Medible": "📊",
  "Estrategia Personalizada": "🎯",
  "Equipo Experto": "👥",
  "Resultados Reales": "📈",
  "Flexibilidad Total": "🕐",
  "Certificación Oficial": "🎓",
  "Instructores Expertos": "👨‍🏫",
  "Comunidad Activa": "🌐",
  "Centrado en Usuario": "👤",
  "Metodología Ágil": "⚡",
  "Alta Calidad": "⭐",
  "Entrega Rápida": "🚀",
  "Protección Total": "🛡️",
  "Equipo Certificado": "✅",
  "Respuesta Rápida": "⚡",
  "Cumplimiento Normativo": "📋",
  "Alta Eficiencia": "⚙️",
  Escalabilidad: "📐",
  "Reducción de Costos": "💰",
  "Tecnología de Punta": "🤖",
};

function getServiceById(id) {
  const all = [
    ...servicios,
    ...JSON.parse(localStorage.getItem("servicios_custom") || "[]"),
  ];
  return all.find((s) => String(s.id) === String(id));
}

function renderDetalle(s) {
  const fav = isFav(s.id);
  const porQue = (s.porQue || []).length
    ? s.porQue
    : [
        "Calidad Garantizada",
        "Entrega Puntual",
        "Seguridad Máxima",
        "Innovación",
      ];

  document.getElementById("breadTitle").textContent = s.titulo;
  document.title = `Plataforma Digital — ${s.titulo}`;

  document.getElementById("detalleContent").innerHTML = `
    <section class="detail-hero">
      <div class="detail-img reveal">
        <img src="${s.imagen}" alt="${s.titulo}" loading="lazy"/>
        <span class="detail-tag">${s.tag}</span>
      </div>
      <div class="detail-info reveal">
        <div class="card-rating">
          <span class="stars">${renderStars(parseInt(s.estrellas) || 5)}</span>
          <span class="rating-text">${s.estrellas}.0 (${s.reseñas || 0} reseñas)</span>
        </div>
        <h1>${s.titulo}</h1>
        <p class="detail-subtitle">Soluciones profesionales y personalizadas para tu negocio</p>
        <p class="detail-desc">${s.descripcionLarga || s.descripcion}</p>

        ${
          s.caracteristicas && s.caracteristicas.length
            ? `
        <div class="features-list">
          <h3>Características Principales</h3>
          ${s.caracteristicas
            .map(
              (c) => `
            <div class="feature-item">
              <div class="feature-dot"></div>
              <span>${c}</span>
            </div>`,
            )
            .join("")}
        </div>`
            : ""
        }

        <div class="detail-actions">
          <button class="btn btn-primary ${fav ? "active" : ""}" id="favBtn" onclick="handleFavDetail(this, '${s.id}', '${s.titulo}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${fav ? "white" : "none"}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            ${fav ? "En Favoritos" : "Añadir a Favoritos"}
          </button>
          <a href="contacto.html" class="btn btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Contactar con el servicio
          </a>
        </div>
        <a href="servicios.html" style="font-size:.85rem;color:var(--primary);margin-top:.25rem;">← Volver al catálogo</a>
      </div>
    </section>

    <section class="why-section">
      <div class="container">
        <div class="section-header">
          <h2>¿Por qué elegir este servicio?</h2>
          <div class="section-line"></div>
        </div>
        <div class="why-grid">
          ${porQue
            .map(
              (item) => `
          <div class="why-card reveal">
            <div class="why-icon">${whyIconsMap[item] || "✨"}</div>
            <div class="why-title">${item}</div>
          </div>`,
            )
            .join("")}
        </div>
        <p style="text-align:center;color:var(--light);font-size:.9rem;max-width:700px;margin:2rem auto 0;line-height:1.8;">
          Con años de experiencia y un equipo de profesionales altamente cualificados, garantizamos resultados que superarán tus expectativas.
          Únete a los miles de clientes satisfechos que han confiado en nosotros.
        </p>
      </div>
    </section>`;

  observeReveal();
}

function handleFavDetail(btn, id, titulo) {
  const fav = isFav(id);
  if (!fav) {
    let favs = JSON.parse(localStorage.getItem("favs") || "[]");
    favs.push({ id: String(id), titulo });
    localStorage.setItem("favs", JSON.stringify(favs));
    btn.innerHTML = btn.innerHTML.replace("Añadir a Favoritos", "En Favoritos");
    btn.querySelector("svg path").setAttribute("fill", "white");
    showToast(`❤️ "${titulo}" guardado en favoritos`);
  } else {
    let favs = JSON.parse(localStorage.getItem("favs") || "[]").filter(
      (f) => f.id !== String(id),
    );
    localStorage.setItem("favs", JSON.stringify(favs));
    btn.innerHTML = btn.innerHTML.replace("En Favoritos", "Añadir a Favoritos");
    btn.querySelector("svg path").setAttribute("fill", "none");
    showToast("💔 Eliminado de favoritos");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(location.search).get("id");
  const s = id ? getServiceById(id) : null;
  if (s) {
    renderDetalle(s);
  } else {
    document.getElementById("notFound").style.display = "block";
  }
});
