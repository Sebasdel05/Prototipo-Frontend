import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  template: `
    <section class="bg-[linear-gradient(135deg,#89d185,#85d1a7,#85d1cd)] px-6 py-20 text-center">
      <h1 class="text-5xl font-bold text-white">Acerca de Plataforma Digital</h1>
      <p class="mx-auto mt-4 max-w-3xl text-white/90">Somos una plataforma de servicios digitales comprometida con impulsar el crecimiento profesional y empresarial.</p>
    </section>

    <section class="container-custom py-10">
      <div class="mb-10 text-center">
        <h2 class="section-title">Mision y Vision</h2>
        <div class="section-line"></div>
      </div>
      <div class="grid gap-5 md:grid-cols-2">
        <article class="card-custom p-6"><h3 class="text-2xl font-semibold">Mision</h3><p class="mt-2 text-sm text-[var(--light)]">Facilitar el acceso a servicios digitales de alta calidad para empresas y profesionales.</p></article>
        <article class="card-custom p-6"><h3 class="text-2xl font-semibold">Vision</h3><p class="mt-2 text-sm text-[var(--light)]">Ser la plataforma de referencia en servicios digitales en Latinoamerica.</p></article>
      </div>

      <div class="mt-10 text-center">
        <h2 class="section-title">Nuestros valores</h2>
        <div class="section-line"></div>
      </div>
      <div class="mt-6 grid gap-4 md:grid-cols-3">
        <article class="card-custom p-5 text-center"><h4 class="font-semibold">Calidad</h4><p class="mt-1 text-sm text-[var(--light)]">Entregamos soluciones de alto nivel.</p></article>
        <article class="card-custom p-5 text-center"><h4 class="font-semibold">Innovacion</h4><p class="mt-1 text-sm text-[var(--light)]">Usamos tecnologia moderna y efectiva.</p></article>
        <article class="card-custom p-5 text-center"><h4 class="font-semibold">Compromiso</h4><p class="mt-1 text-sm text-[var(--light)]">Nos enfocamos en resultados reales.</p></article>
      </div>
    </section>
  `,
  styles: ``,
})
export class About {}
