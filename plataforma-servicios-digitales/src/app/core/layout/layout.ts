import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen">
      <header class="sticky top-0 z-10 bg-[linear-gradient(135deg,#89d185,#85d1a7)] shadow-md">
        <nav class="container-custom flex flex-wrap items-center justify-between gap-4 py-4">
          <a routerLink="/" class="flex items-center gap-2 text-lg font-bold text-white">
            <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
              <svg viewBox="0 0 24 24" class="h-4 w-4 fill-none stroke-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M3 7l9-4 9 4-9 4-9-4z"></path>
                <path d="M3 12l9 4 9-4"></path>
                <path d="M3 17l9 4 9-4"></path>
              </svg>
            </span>
            Plataforma Digital
          </a>
          <div class="flex flex-wrap gap-4 text-sm">
            <a routerLink="/" routerLinkActive="border-white text-white" [routerLinkActiveOptions]="{ exact: true }" class="border-b-2 border-transparent pb-0.5 text-white/85">Inicio</a>
            <a routerLink="/servicios" routerLinkActive="border-white text-white" class="border-b-2 border-transparent pb-0.5 text-white/85">Servicios</a>
            <a routerLink="/favoritos" routerLinkActive="border-white text-white" class="border-b-2 border-transparent pb-0.5 text-white/85">Favoritos</a>
            <a routerLink="/contacto" routerLinkActive="border-white text-white" class="border-b-2 border-transparent pb-0.5 text-white/85">Contacto</a>
            <a routerLink="/acerca" routerLinkActive="border-white text-white" class="border-b-2 border-transparent pb-0.5 text-white/85">Acerca de</a>
          </div>
        </nav>
      </header>

      <main class="pb-8">
        <router-outlet />
      </main>

      <footer class="bg-[linear-gradient(135deg,#89d185,#85d1a7,#85d1cd)] pt-12">
        <div class="container-custom grid gap-6 pb-10 text-sm text-white/90 md:grid-cols-4">
          <section>
            <h3 class="font-semibold text-white">Plataforma</h3>
            <p>Catalogo de servicios digitales con favoritos y contacto.</p>
          </section>
          <section>
            <h3 class="font-semibold text-white">Contacto</h3>
            <p>hola@serviciosdigitales.com</p>
            <p>+57 300 000 0000</p>
          </section>
          <section>
            <h3 class="font-semibold text-white">Redes</h3>
            <p>LinkedIn</p>
            <p>Instagram</p>
          </section>
          <section>
            <h3 class="font-semibold text-white">Legal</h3>
            <p>Terminos y condiciones</p>
            <p>Politica de privacidad</p>
          </section>
        </div>
        <div class="border-t border-white/30 py-4 text-center text-xs text-white/75">
          2026 Plataforma Digital. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  `,
  styles: ``,
})
export class Layout {}
