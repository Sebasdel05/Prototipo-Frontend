// const contenedor = document.getElementById("contenedor");

// servicios.forEach(servicio => {
//   contenedor.innerHTML += `
//     <div class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
//       <img src="${servicio.imagen}" class="h-48 w-full object-cover">

//       <div class="p-5">
//         <h2 class="text-lg font-semibold mb-2">
//           ${servicio.nombre}
//         </h2>

//         <p class="text-gray-500 text-sm mb-4">
//           ${servicio.descripcion}
//         </p>

//         <div class="flex justify-between items-center">
//           <a href="detalle.html?id=${servicio.id}"
//              class="bg-green-400 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-500">
//             Ver detalles
//           </a>

//           <button class="text-gray-400 hover:text-green-500 text-xl">
//             ♡
//           </button>
//         </div>
//       </div>
//     </div>
//   `;
// });

const contenedor = document.getElementById("contenedor");

servicios.forEach(servicio => {
  contenedor.innerHTML += `
    <div class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img src="${servicio.imagen}"
           alt="${servicio.nombre}"
           class="h-48 w-full object-cover">

      <div class="p-5">
        <h2 class="text-lg font-semibold mb-2">
          ${servicio.nombre}
        </h2>

        <p class="text-gray-500 text-sm mb-4">
          ${servicio.descripcion}
        </p>

        <div class="flex justify-between items-center">
          <a href="detalle.html?id=${servicio.id}"
             class="bg-green-400 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-500">
            Ver detalles
          </a>

          <button onclick="guardarFavorito(${servicio.id})"
                  class="text-gray-400 hover:text-green-500 text-xl">
            ♡
          </button>
        </div>
      </div>
    </div>
  `;
});

function guardarFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (!favoritos.some(f => f.id === id)) {
    const servicio = servicios.find(s => s.id === id);
    favoritos.push(servicio);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    alert("Servicio agregado a favoritos");
  } else {
    alert("Este servicio ya está en favoritos");
  }
}