import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DigitalService } from '../../models/digital-service.model';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-services',
  imports: [FormsModule, RouterLink],
  template: `
    <section class="rounded-lg border bg-white p-5">
      <h1 class="text-2xl font-bold">Catalogo de servicios</h1>
      <p class="text-sm text-slate-600">Filtra por categoria y agrega servicios personalizados (mini CRUD).</p>

      <div class="mt-4 flex flex-wrap gap-2">
        @for (option of categories; track option) {
          <button (click)="selectedCategory = option" class="rounded-full border px-3 py-1 text-sm" [class.bg-slate-900]="selectedCategory === option" [class.text-white]="selectedCategory === option">
            {{ option }}
          </button>
        }
      </div>
    </section>

    <section class="mt-6 grid gap-4 md:grid-cols-3">
      @for (service of filteredServices(); track service.id) {
        <article class="rounded-lg border bg-white p-4">
          <img [src]="service.image" [alt]="service.name" class="h-36 w-full rounded object-cover" />
          <p class="mt-3 text-xs text-indigo-600">{{ service.category }}</p>
          <h3 class="font-semibold">{{ service.name }}</h3>
          <p class="text-sm text-slate-600">{{ service.shortDescription }}</p>
          <div class="mt-3 flex items-center justify-between text-sm">
            <a [routerLink]="['/servicios', service.id]" class="font-semibold text-indigo-600">Ver detalle</a>
            <button (click)="toggleFavorite(service.id)">{{ isFavorite(service.id) ? 'Quitar favorito' : 'Favorito' }}</button>
          </div>
          @if (service.custom) {
            <button (click)="deleteCustom(service.id)" class="mt-2 text-xs text-rose-600">Eliminar servicio creado</button>
          }
        </article>
      }
    </section>

    <section class="mt-8 rounded-lg border bg-white p-5">
      <h2 class="text-lg font-semibold">Crear nuevo servicio</h2>
      <form class="mt-4 grid gap-3 md:grid-cols-2" (ngSubmit)="addService()">
        <input class="rounded border p-2" name="name" [(ngModel)]="newService.name" placeholder="Nombre del servicio" required />
        <select class="rounded border p-2" name="category" [(ngModel)]="newService.category" required>
          @for (option of categories.slice(1); track option) { <option [value]="option">{{ option }}</option> }
        </select>
        <input class="rounded border p-2" name="image" [(ngModel)]="newService.image" placeholder="URL de imagen" required />
        <input class="rounded border p-2" name="shortDescription" [(ngModel)]="newService.shortDescription" placeholder="Descripcion corta" required />
        <textarea class="rounded border p-2 md:col-span-2" name="description" [(ngModel)]="newService.description" placeholder="Descripcion completa" required></textarea>
        <button class="rounded bg-indigo-600 px-4 py-2 text-white md:col-span-2">Crear servicio</button>
      </form>
    </section>
  `,
  styles: ``,
})
export class Services {
  services: DigitalService[] = [];
  categories = ['Todos', 'Tecnologia', 'Marketing', 'Educacion', 'Diseno', 'Seguridad'];
  selectedCategory = 'Todos';
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
    this.catalogService.getServices().subscribe((services) => (this.services = services));
  }

  filteredServices(): DigitalService[] {
    return this.selectedCategory === 'Todos'
      ? this.services
      : this.services.filter((service) => service.category === this.selectedCategory);
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
