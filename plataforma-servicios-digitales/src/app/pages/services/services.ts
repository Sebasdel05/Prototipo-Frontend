import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DigitalService } from '../../models/digital-service.model';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-services',
  imports: [FormsModule, RouterLink],
  template: `
    <section class="bg-[linear-gradient(135deg,#89d185,#85d1a7)] px-6 py-14 text-center">
      <h1 class="text-5xl font-bold text-white">Catalogo de Servicios</h1>
      <p class="mx-auto mt-2 max-w-2xl text-white/85">Explora todos los servicios disponibles y encuentra el que mas se ajusta a tus necesidades.</p>
    </section>

    <section class="container-custom py-10">
      <div class="card-custom mb-8 p-6">
        <h2 class="text-2xl font-semibold">Agregar nuevo servicio</h2>
        <form class="mt-4 grid gap-3 md:grid-cols-2" (ngSubmit)="addService()">
          <input class="rounded-xl border border-[var(--border)] p-2.5" name="name" [(ngModel)]="newService.name" placeholder="Nombre del servicio" required />
          <select class="rounded-xl border border-[var(--border)] p-2.5" name="category" [(ngModel)]="newService.category" required>
            @for (option of categories.slice(1); track option) { <option [value]="option">{{ option }}</option> }
          </select>
          <input class="rounded-xl border border-[var(--border)] p-2.5" name="image" [(ngModel)]="newService.image" placeholder="URL de imagen" required />
          <input class="rounded-xl border border-[var(--border)] p-2.5" name="shortDescription" [(ngModel)]="newService.shortDescription" placeholder="Descripcion corta" required />
          <textarea class="rounded-xl border border-[var(--border)] p-2.5 md:col-span-2" name="description" [(ngModel)]="newService.description" placeholder="Descripcion completa" required></textarea>
          <div class="md:col-span-2 flex justify-end">
            <button class="btn-primary-custom">Guardar servicio</button>
          </div>
        </form>
      </div>

      <div class="mb-5 flex flex-wrap gap-2">
        @for (option of categories; track option) {
          <button (click)="selectCategory(option)" class="rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-sm text-[var(--mid)]" [class.!bg-[linear-gradient(135deg,#89d185,#85d1a7)]]="selectedCategory() === option" [class.!text-white]="selectedCategory() === option">
            {{ option }}
          </button>
        }
      </div>
      <div class="grid gap-5 md:grid-cols-3">
        @for (service of filteredServices(); track service.id) {
          <article class="card-custom overflow-hidden">
            <img [src]="service.image" [alt]="service.name" class="h-40 w-full object-cover" />
            <div class="p-4">
              <p class="text-xs font-semibold text-[var(--mid)]">{{ service.category }}</p>
              <h3 class="mt-1 text-lg font-semibold">{{ service.name }}</h3>
              <p class="text-sm text-[var(--light)]">{{ service.shortDescription }}</p>
              <div class="mt-3 flex items-center justify-between text-sm">
                <a [routerLink]="['/servicios', service.id]" class="font-semibold text-[var(--primary)]">Ver detalle</a>
                <button (click)="toggleFavorite(service.id)" class="font-semibold text-[var(--mid)]">{{ isFavorite(service.id) ? 'Quitar favorito' : 'Favorito' }}</button>
              </div>
              @if (service.custom) {
                <button (click)="deleteCustom(service.id)" class="mt-2 text-xs font-semibold text-rose-600">Eliminar servicio</button>
              }
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: ``,
})
export class Services {
  readonly services = signal<DigitalService[]>([]);
  categories = ['Todos', 'Tecnologia', 'Marketing', 'Educacion', 'Diseno', 'Seguridad'];
  readonly selectedCategory = signal('Todos');
  newService = {
    name: '',
    category: 'Tecnologia' as DigitalService['category'],
    shortDescription: '',
    description: '',
    image: '',
  };

  constructor(private readonly catalogService: CatalogService) {
    this.load();
  }

  load(): void {
    this.catalogService
      .getServices()
      .subscribe((services) => this.services.set(services));
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  filteredServices(): DigitalService[] {
    return this.selectedCategory() === 'Todos'
      ? this.services()
      : this.services().filter(
          (service) => service.category === this.selectedCategory()
        );
  }

  addService(): void {
    this.catalogService.addCustomService(this.newService).subscribe(() => {
      this.newService = {
        name: '',
        category: 'Tecnologia',
        shortDescription: '',
        description: '',
        image: '',
      };
      this.load();
    });
  }

  deleteCustom(id: number): void {
    this.catalogService.deleteCustomService(id);
    this.load();
  }

  toggleFavorite(id: number): void {
    this.catalogService.toggleFavorite(id);
    this.load();
  }

  isFavorite(id: number): boolean {
    return this.catalogService.isFavorite(id);
  }
}
