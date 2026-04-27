import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { DigitalService } from '../../models/digital-service.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="relative overflow-hidden px-6 py-18 text-center">
      <div class="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--tag-bg)] px-4 py-2 text-xs font-semibold text-[var(--mid)]">
        <span class="h-2 w-2 rounded-full bg-[var(--primary)]"></span>
        Plataforma lider en servicios digitales
      </div>
      <h1 class="mx-auto mt-5 max-w-3xl text-5xl font-bold text-[var(--dark)]">Explora nuestros <span class="bg-[linear-gradient(135deg,#89d185,#85d1a7,#85d1cd)] bg-clip-text text-transparent">servicios digitales</span></h1>
      <p class="mx-auto mt-4 max-w-2xl text-[var(--light)]">Soluciones educativas, tecnológicas y digitales para impulsar tu crecimiento profesional.</p>
      <div class="mt-7 flex justify-center gap-3">
        <a routerLink="/servicios" class="btn-primary-custom">Ver servicios</a>
        <a routerLink="/contacto" class="rounded-full border border-[var(--border)] bg-white px-6 py-2.5 font-semibold text-[var(--mid)]">Contactanos</a>
      </div>
      <div class="container-custom mt-12 grid overflow-hidden rounded-[var(--radius)] bg-white shadow-[var(--shadow-md)] md:grid-cols-3">
        <article class="p-6 text-center"><p class="text-3xl font-bold text-[var(--primary)]">{{ services().length }}+</p><p class="text-sm text-[var(--light)]">Servicios disponibles</p></article>
        <article class="border-y border-[var(--border)] p-6 text-center md:border-x md:border-y-0"><p class="text-3xl font-bold text-[var(--primary)]">12k+</p><p class="text-sm text-[var(--light)]">Usuarios activos</p></article>
        <article class="p-6 text-center"><p class="text-3xl font-bold text-[var(--primary)]">98%</p><p class="text-sm text-[var(--light)]">Satisfaccion del cliente</p></article>
      </div>
    </section>

    <section class="container-custom mt-2 pb-8">
      <div class="mb-8 text-center">
        <h2 class="section-title">Servicios destacados</h2>
        <p class="text-[var(--light)]">Los mas valorados por nuestra comunidad esta semana.</p>
        <div class="section-line"></div>
      </div>
      <div class="grid gap-6 md:grid-cols-3">
        @for (service of featured(); track service.id) {
          <article class="card-custom overflow-hidden transition hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]">
            <img [src]="service.image" [alt]="service.name" class="h-50 w-full object-cover" />
            <div class="p-5">
              <p class="text-xs font-semibold text-[var(--mid)]">{{ service.category }}</p>
              <h3 class="mt-1 text-xl font-semibold">{{ service.name }}</h3>
              <p class="mt-2 text-sm text-[var(--light)]">{{ service.shortDescription }}</p>
              <div class="mt-4 flex items-center justify-between gap-3">
                <a [routerLink]="['/servicios', service.id]" class="btn-primary-custom text-sm">Ver detalle</a>
                <button (click)="toggleFavorite(service.id)" class="text-sm font-semibold text-[var(--mid)]">{{ isFavorite(service.id) ? 'Quitar favorito' : 'Favorito' }}</button>
              </div>
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: ``,
})
export class Home {
  readonly services = signal<DigitalService[]>([]);
  readonly featured = computed(() =>
    this.services()
      .filter((service) => service.featured)
      .slice(0, 3)
  );

  constructor(private readonly catalogService: CatalogService) {
    this.load();
  }

  load(): void {
    this.catalogService
      .getServices()
      .subscribe((services) => this.services.set(services));
  }

  toggleFavorite(id: number): void {
    this.catalogService.toggleFavorite(id);
    this.load();
  }

  isFavorite(id: number): boolean {
    return this.catalogService.isFavorite(id);
  }
}
