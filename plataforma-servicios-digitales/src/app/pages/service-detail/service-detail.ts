import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { DigitalService } from '../../models/digital-service.model';

@Component({
  selector: 'app-service-detail',
  imports: [RouterLink],
  template: `
    @if (service) {
      <article class="rounded-lg border bg-white p-6">
        <img [src]="service.image" [alt]="service.name" class="h-72 w-full rounded object-cover" />
        <p class="mt-4 text-xs text-indigo-600">{{ service.category }}</p>
        <h1 class="text-2xl font-bold">{{ service.name }}</h1>
        <p class="mt-2 text-slate-700">{{ service.description }}</p>
        <ul class="mt-4 list-disc space-y-1 pl-5 text-sm">
          @for (benefit of service.benefits; track benefit) { <li>{{ benefit }}</li> }
        </ul>
        <div class="mt-6 flex flex-wrap gap-2">
          <button (click)="toggleFavorite(service.id)" class="rounded border px-4 py-2">
            {{ isFavorite(service.id) ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
          </button>
          <a routerLink="/contacto" class="rounded bg-indigo-600 px-4 py-2 text-white">Contactar</a>
          <a routerLink="/servicios" class="rounded border px-4 py-2">Volver al listado</a>
        </div>
      </article>
    } @else {
      <p>Servicio no encontrado.</p>
    }
  `,
  styles: ``,
})
export class ServiceDetail {
  service?: DigitalService;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly catalogService: CatalogService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.catalogService.getById(id).subscribe((service) => (this.service = service));
  }

  toggleFavorite(id: number): void {
    this.catalogService.toggleFavorite(id);
  }

  isFavorite(id: number): boolean {
    return this.catalogService.isFavorite(id);
  }
}
