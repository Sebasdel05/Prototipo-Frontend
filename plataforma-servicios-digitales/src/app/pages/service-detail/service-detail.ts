import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { DigitalService } from '../../models/digital-service.model';

@Component({
  selector: 'app-service-detail',
  imports: [RouterLink],
  template: `
    @if (service) {
      <div class="container-custom py-8">
        <div class="mb-4 text-sm text-[var(--light)]">
          <a routerLink="/" class="text-[var(--primary)]">Inicio</a> > <a routerLink="/servicios" class="text-[var(--primary)]">Servicios</a> > <span>{{ service.name }}</span>
        </div>
        <article class="grid gap-8 md:grid-cols-2">
          <img [src]="service.image" [alt]="service.name" class="h-[420px] w-full rounded-[var(--radius)] object-cover shadow-[var(--shadow-lg)]" />
          <div>
            <p class="text-sm font-semibold text-[var(--primary)]">{{ service.category }}</p>
            <h1 class="mt-2 text-4xl font-bold">{{ service.name }}</h1>
            <p class="mt-4 text-[var(--light)]">{{ service.description }}</p>
            <h3 class="mt-5 text-xl font-semibold">Beneficios</h3>
            <ul class="mt-2 space-y-2 text-sm text-[var(--mid)]">
              @for (benefit of service.benefits; track benefit) { <li>• {{ benefit }}</li> }
            </ul>
            <div class="mt-6 flex flex-wrap gap-2">
              <button (click)="toggleFavorite(service.id)" class="rounded-full border border-[var(--border)] bg-white px-4 py-2">
            {{ isFavorite(service.id) ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
              </button>
              <a routerLink="/contacto" class="btn-primary-custom">Contactar</a>
              <a routerLink="/servicios" class="rounded-full border border-[var(--border)] bg-white px-4 py-2">Volver</a>
            </div>
          </div>
        </article>
        </div>
    } @else {
      <p class="container-custom py-20 text-center text-xl">Servicio no encontrado.</p>
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
