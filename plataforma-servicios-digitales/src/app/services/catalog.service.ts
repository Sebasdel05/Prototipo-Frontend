import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, switchMap } from 'rxjs';
import { DigitalService } from '../models/digital-service.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly customServicesKey = 'custom-services';
  private readonly favoritesKey = 'favorite-services';

  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService
  ) {}

  getServices(): Observable<DigitalService[]> {
    return this.http.get<DigitalService[]>('/data/services.json').pipe(
      map((base) => {
        const custom = this.storage.getLocal<DigitalService[]>(
          this.customServicesKey,
          []
        );
        return [...base, ...custom];
      })
    );
  }

  getById(id: number): Observable<DigitalService | undefined> {
    return this.getServices().pipe(map((services) => services.find((s) => s.id === id)));
  }

  addCustomService(
    service: Omit<DigitalService, 'id' | 'rating' | 'benefits' | 'custom'>
  ): Observable<DigitalService> {
    return this.getServices().pipe(
      switchMap((all) => {
        const nextId = Math.max(...all.map((item) => item.id), 0) + 1;
        const created: DigitalService = {
          ...service,
          id: nextId,
          rating: 5,
          custom: true,
          benefits: ['Servicio personalizado', 'Publicacion inmediata'],
        };
        const customServices = this.storage.getLocal<DigitalService[]>(
          this.customServicesKey,
          []
        );
        this.storage.setLocal(this.customServicesKey, [...customServices, created]);
        return of(created);
      })
    );
  }

  deleteCustomService(id: number): void {
    const customServices = this.storage.getLocal<DigitalService[]>(
      this.customServicesKey,
      []
    );
    this.storage.setLocal(
      this.customServicesKey,
      customServices.filter((service) => service.id !== id)
    );
  }

  getFavorites(): number[] {
    return this.storage.getLocal<number[]>(this.favoritesKey, []);
  }

  toggleFavorite(id: number): void {
    const favorites = this.getFavorites();
    const updated = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];
    this.storage.setLocal(this.favoritesKey, updated);
  }

  isFavorite(id: number): boolean {
    return this.getFavorites().includes(id);
  }
}
