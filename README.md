# Plataforma Digital — Catálogo de Servicios

Proyecto desarrollado para el módulo de **Desarrollo de Front-end** — Entrega 2  
**Politécnico Gran Colombiano · Facultad de Ingeniería · Ingeniería de Software · 2026**

---

## 📁 Estructura del proyecto

```
plataforma-digital/
├── index.html          → Página de inicio (Home)
├── servicios.html      → Catálogo completo + Mini CRUD
├── detalle.html        → Vista detallada de cada servicio
├── favoritos.html      → Servicios guardados por el usuario
├── contacto.html       → Formulario de contacto con validaciones
├── acerca.html         → Página informativa del equipo
│
├── css/
│   └── styles.css      → Estilos globales (variables, componentes, responsive)
│
└── js/
    ├── data.js         → Datos de servicios (JSON local)
    ├── main.js         → Utilidades: favoritos, toast, navbar, footer, reveal
    ├── home.js         → Renderizado de cards y filtro por categoría
    ├── servicios.js    → Mini CRUD: agregar y eliminar servicios
    ├── detalle.js      → Carga dinámica del detalle del servicio
    ├── favoritos.js    → Gestión de la lista de favoritos
    └── contacto.js     → Validación del formulario de contacto
```

---

## 🛠️ Tecnologías utilizadas

| Tecnología            | Uso                                               |
| --------------------- | ------------------------------------------------- |
| **HTML5**             | Estructura semántica de todas las páginas         |
| **CSS3**              | Variables, Flexbox, Grid, animaciones, responsive |
| **JavaScript (ES6+)** | Lógica dinámica, DOM, eventos, módulos            |
| **localStorage**      | Persistencia de favoritos y suscriptores          |
| **Google Fonts**      | Tipografías: Lora + DM Sans                       |
| **Unsplash**          | Imágenes de ejemplo                               |

---

## ✅ Funcionalidades implementadas

- **Home** con hero, estadísticas, filtro por categoría, servicios destacados, testimonios y newsletter
- **Catálogo** con renderizado dinámico desde JSON local
- **Filtro por categoría** sin recarga de página
- **Mini CRUD**: crear y eliminar servicios
- **Buscador** en tiempo real
- **Favoritos** con `localStorage` (guardar, eliminar, limpiar)
- **Vista de detalle** cargada dinámicamente con `?id=`
- **Formulario de contacto** con validaciones: campos obligatorios, formato de correo, longitud mínima del mensaje
- **Toast notifications** para feedback al usuario
- **Scroll reveal** con IntersectionObserver
- **Diseño responsive** para móvil, tablet y escritorio
- **Navbar y footer** como componentes reutilizables

---

## 🚀 Cómo ejecutar

Simplemente abre `index.html` en tu navegador. No requiere servidor ni dependencias externas.

```bash
# Si tienes VS Code con Live Server:
# Clic derecho en index.html → Open with Live Server
```

---

## 👥 Integrantes

- Elkin Jose Pedroza Guerra
- Ffrancy Alejandra Huérfano Villalobos
- Juan Sebastian Delgado Lopez
- Edgar Alexander Villamizar Arias
- Kelnherth Daniel Hernandez Merchan

**Docente:** Edgar Mauricio Lopez Rojas
