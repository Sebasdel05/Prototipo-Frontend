import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-slate-50 text-slate-900">
      <header class="sticky top-0 z-10 border-b border-slate-200 bg-slate-900 text-white">
        <nav class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <a routerLink="/" class="text-lg font-bold">Servicios Digitales</a>
          <div class="flex flex-wrap gap-2 text-sm">
            <a routerLink="/" routerLinkActive="bg-slate-700" [routerLinkActiveOptions]="{ exact: true }" class="rounded-md px-3 py-2">Inicio</a>
            <a routerLink="/servicios" routerLinkActive="bg-slate-700" class="rounded-md px-3 py-2">Servicios</a>
            <a routerLink="/favoritos" routerLinkActive="bg-slate-700" class="rounded-md px-3 py-2">Favoritos</a>
            <a routerLink="/contacto" routerLinkActive="bg-slate-700" class="rounded-md px-3 py-2">Contacto</a>
            <a routerLink="/acerca" routerLinkActive="bg-slate-700" class="rounded-md px-3 py-2">Acerca de</a>
          </div>
        </nav>
      </header>

      <main class="mx-auto max-w-6xl px-4 py-6">
        <router-outlet />
      </main>

      <footer class="mt-10 border-t border-slate-200 bg-white">
        <div class="mx-auto grid max-w-6xl gap-4 px-4 py-8 text-sm md:grid-cols-4">
          <section>
            <h3 class="font-semibold">Plataforma</h3>
            <p>Catalogo de servicios digitales con favoritos y contacto.</p>
          </section>
          <section>
            <h3 class="font-semibold">Contacto</h3>
            <p>hola@serviciosdigitales.com</p>
            <p>+57 300 000 0000</p>
          </section>
          <section>
            <h3 class="font-semibold">Redes</h3>
            <p>LinkedIn</p>
            <p>Instagram</p>
          </section>
          <section>
            <h3 class="font-semibold">Legal</h3>
            <p>Terminos y condiciones</p>
            <p>Politica de privacidad</p>
          </section>
        </div>
      </footer>
    </div>
  `,
  styles: ``,
})
export class Layout {}
