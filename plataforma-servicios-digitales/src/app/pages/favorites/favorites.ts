import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DigitalService } from '../../models/digital-service.model';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink],
  template: `
    <section class="rounded-lg border bg-white p-5">
      <h1 class="text-2xl font-bold">Mis favoritos</h1>
      <p class="text-sm text-slate-600">Lista persistida en localStorage.</p>
    </section>

    <section class="mt-6 grid gap-4 md:grid-cols-2">
      @if (favoriteServices.length === 0) {
        <article class="rounded-lg border bg-white p-5">
          <p>Aun no tienes servicios favoritos.</p>
          <a routerLink="/servicios" class="mt-2 inline-block text-indigo-600">Ir al catalogo</a>
        </article>
      } @else {
        @for (service of favoriteServices; track service.id) {
          <article class="rounded-lg border bg-white p-4">
            <h3 class="font-semibold">{{ service.name }}</h3>
            <p class="text-sm text-slate-600">{{ service.shortDescription }}</p>
            <div class="mt-3 flex gap-2 text-sm">
              <a [routerLink]="['/servicios', service.id]" class="text-indigo-600">Ver detalle</a>
              <button (click)="removeFavorite(service.id)" class="text-rose-600">Quitar</button>
            </div>
          </article>
        }
      }
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
