# Plataforma de Servicios Digitales

Aplicacion Front-end para la entrega 3 del modulo, basada en los lineamientos del documento de orientaciones y en los mockups de la entrega 1.

## Tecnologias implementadas

- Angular (componentes standalone, routing y data binding)
- Tailwind CSS
- HTML, CSS y TypeScript/JavaScript
- `localStorage` (favoritos y mini CRUD de servicios personalizados)
- `sessionStorage` (ultimo contacto de la sesion)
- JSON local para la fuente inicial de datos (`public/data/services.json`)

## Estructura del proyecto

```text
plataforma-servicios-digitales/
  public/
    data/
      services.json
  src/
    app/
      core/
        layout/
          layout.ts
      models/
        digital-service.model.ts
      pages/
        home/
        services/
        service-detail/
        favorites/
        contact/
        about/
      services/
        catalog.service.ts
        storage.service.ts
      app.config.ts
      app.routes.ts
      app.ts
      app.html
    styles.css
  .postcssrc.json
```

## Funcionalidades principales

1. Home con hero, metricas, cards destacadas y CTA.
2. Catalogo dinamico con filtro por categoria.
3. Vista de detalle por servicio.
4. Favoritos persistentes.
5. Formulario de contacto con validaciones basicas y confirmacion.
6. Mini CRUD: crear y eliminar servicios personalizados.

## Ejecucion local

```bash
npm install
npm start
```

Aplicacion disponible en `http://localhost:4200/`.

## Evidencias para la entrega

- Codigo organizado y comentado de forma funcional.
- Uso de Angular, Tailwind y almacenamiento web.
- Compatible para despliegue en Netlify/Vercel/GitHub Pages (tras build).
