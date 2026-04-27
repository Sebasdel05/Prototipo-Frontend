import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  template: `
    <section class="rounded-lg border bg-white p-6">
      <h1 class="text-2xl font-bold">Acerca del proyecto</h1>
      <p class="mt-3 text-slate-700">
        Aplicacion Front-end para la entrega final del modulo, construida con Angular, Tailwind, JSON local, localStorage y sessionStorage.
      </p>
      <ul class="mt-4 list-disc space-y-1 pl-5 text-sm">
        <li>Arquitectura basada en componentes standalone.</li>
        <li>Binding de datos con formularios y listas dinamicas.</li>
        <li>Persistencia de favoritos y servicios creados por el usuario.</li>
      </ul>
    </section>
  `,
  styles: ``,
})
export class About {}
