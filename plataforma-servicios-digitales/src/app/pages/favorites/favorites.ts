import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DigitalService } from '../../models/digital-service.model';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink],
  template: `
    <section class="bg-[linear-gradient(135deg,#89d185,#85d1a7)] px-6 py-14 text-center">
      <h1 class="text-5xl font-bold text-white">Mis Favoritos</h1>
      <p class="mt-2 text-white/85">Servicios que has guardado para revisar mas tarde.</p>
    </section>

    <section class="container-custom py-10">
      <div class="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--mid)] shadow-[var(--shadow-sm)]">
        Favoritos guardados <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--primary)] text-white">{{ favoriteServices.length }}</span>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
      @if (favoriteServices.length === 0) {
        <article class="card-custom p-8 text-center">
          <p class="text-lg">Aun no tienes servicios favoritos.</p>
          <a routerLink="/servicios" class="btn-primary-custom mt-4 inline-block">Ir al catalogo</a>
        </article>
      } @else {
        @for (service of favoriteServices; track service.id) {
          <article class="card-custom p-4">
            <h3 class="text-lg font-semibold">{{ service.name }}</h3>
            <p class="text-sm text-[var(--light)]">{{ service.shortDescription }}</p>
            <div class="mt-3 flex gap-2 text-sm">
              <a [routerLink]="['/servicios', service.id]" class="font-semibold text-[var(--primary)]">Ver detalle</a>
              <button (click)="removeFavorite(service.id)" class="font-semibold text-rose-600">Quitar</button>
            </div>
          </article>
        }
      }
      </div>
    </section>
  `,
  styles: ``,
})
export class Favorites {
  favoriteServices: DigitalService[] = [];

  constructor(private readonly catalogService: CatalogService) {
    this.load();
  }

  load(): void {
    const favoriteIds = this.catalogService.getFavorites();
    this.catalogService.getServices().subscribe((services) => {
      this.favoriteServices = services.filter((service) => favoriteIds.includes(service.id));
    });
  }

  removeFavorite(id: number): void {
    this.catalogService.toggleFavorite(id);
    this.load();
  }
}
