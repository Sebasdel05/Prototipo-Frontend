// const params = new URLSearchParams(window.location.search);
// const id = parseInt(params.get("id"));

// const servicio = servicios.find(s => s.id === id);

// document.getElementById("nombre").textContent = servicio.nombre;
// document.getElementById("detalle").textContent = servicio.detalle;
// document.getElementById("imagen").src = servicio.imagen;

// function guardarFavorito() {
//   let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
//   favoritos.push(servicio);
//   localStorage.setItem("favoritos", JSON.stringify(favoritos));
//   alert("Servicio guardado en favoritos");
// }

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const servicio = servicios.find(s => s.id === id);

if (!servicio) {
  document.body.innerHTML = `
    <div class="text-center mt-20">
      <p class="text-gray-600">Servicio no encontrado</p>
      <a href="servicios.html" class="text-blue-600 underline">
        Volver al listado
      </a>
    </div>
  `;
} else {
  document.getElementById("nombre").textContent = servicio.nombre;
  document.getElementById("detalle").textContent = servicio.detalle;
  document.getElementById("imagen").src = servicio.imagen;
  document.getElementById("imagen").alt = servicio.nombre;
}

function guardarFavorito() {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (!favoritos.some(f => f.id === servicio.id)) {
    favoritos.push(servicio);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    alert("Servicio guardado en favoritos");
  } else {
    alert("Este servicio ya está en favoritos");
  }
}