import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { DigitalService } from '../../models/digital-service.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 p-8 text-white">
      <h1 class="text-3xl font-bold">Explora servicios digitales de alto impacto</h1>
      <p class="mt-2 max-w-2xl">Descubre, compara y guarda servicios de tecnologia, educacion, marketing, diseno y seguridad.</p>
      <a routerLink="/servicios" class="mt-4 inline-block rounded-lg bg-white px-4 py-2 font-semibold text-indigo-700">Ver servicios</a>
    </section>

    <section class="mt-6 grid gap-4 md:grid-cols-3">
      <article class="rounded-lg border bg-white p-4"><p class="text-2xl font-bold">{{ services.length }}</p><p>Servicios disponibles</p></article>
      <article class="rounded-lg border bg-white p-4"><p class="text-2xl font-bold">1.240+</p><p>Usuarios activos</p></article>
      <article class="rounded-lg border bg-white p-4"><p class="text-2xl font-bold">98%</p><p>Satisfaccion</p></article>
    </section>

    <section class="mt-6">
      <h2 class="mb-4 text-xl font-semibold">Servicios destacados</h2>
      <div class="grid gap-4 md:grid-cols-3">
        @for (service of featured; track service.id) {
          <article class="rounded-lg border bg-white p-4 shadow-sm">
            <img [src]="service.image" [alt]="service.name" class="h-40 w-full rounded object-cover" />
            <p class="mt-3 text-xs text-indigo-600">{{ service.category }}</p>
            <h3 class="font-semibold">{{ service.name }}</h3>
            <p class="mt-1 text-sm text-slate-600">{{ service.shortDescription }}</p>
            <div class="mt-3 flex items-center justify-between">
              <a [routerLink]="['/servicios', service.id]" class="text-sm font-semibold text-indigo-600">Ver detalle</a>
              <button (click)="toggleFavorite(service.id)" class="text-sm">{{ isFavorite(service.id) ? 'Quitar favorito' : 'Agregar favorito' }}</button>
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: ``,
})
export class Home {
  services: DigitalService[] = [];
  featured: DigitalService[] = [];

  constructor(private readonly catalogService: CatalogService) {
    this.load();
  }

  load(): void {
    this.catalogService.getServices().subscribe((services) => {
      this.services = services;
      this.featured = services.filter((service) => service.featured).slice(0, 3);
    });
  }

  toggleFavorite(id: number): void {
    this.catalogService.toggleFavorite(id);
    this.load();
  }

  isFavorite(id: number): boolean {
    return this.catalogService.isFavorite(id);
  }
}
