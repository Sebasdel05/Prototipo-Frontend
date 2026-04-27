import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  template: `
    <section class="bg-[linear-gradient(135deg,#89d185,#85d1a7)] px-6 py-14 text-center">
      <h1 class="text-5xl font-bold text-white">Contacto</h1>
      <p class="mt-2 text-white/85">Ponte en contacto con nuestro equipo.</p>
    </section>

    <section class="container-custom grid gap-6 py-10 md:grid-cols-2">
      <form #contactForm="ngForm" class="card-custom p-6" (ngSubmit)="submit(contactForm.valid)">
        <h2 class="mb-4 text-2xl font-semibold">Contactenos</h2>
        <div class="grid gap-3">
          <input class="rounded-xl border border-[var(--border)] p-2.5" name="name" [(ngModel)]="form.name" placeholder="Nombre completo" required />
          <input class="rounded-xl border border-[var(--border)] p-2.5" name="email" [(ngModel)]="form.email" placeholder="Correo electronico" type="email" required email />
          <textarea class="rounded-xl border border-[var(--border)] p-2.5" name="message" [(ngModel)]="form.message" placeholder="Mensaje" rows="5" required></textarea>
        </div>
        <button class="btn-primary-custom mt-4 w-full disabled:opacity-60" [disabled]="!contactForm.valid">Enviar</button>
        @if (confirmation) {
          <p class="mt-4 rounded-xl bg-emerald-100 p-3 text-emerald-800">{{ confirmation }}</p>
        }
      </form>

      <div class="space-y-3">
        <article class="card-custom p-4"><h3 class="font-semibold">Correo</h3><p class="text-sm text-[var(--light)]">contacto@plataforma.com</p></article>
        <article class="card-custom p-4"><h3 class="font-semibold">Telefono</h3><p class="text-sm text-[var(--light)]">+57 300 123 4567</p></article>
        <article class="card-custom p-4"><h3 class="font-semibold">Ubicacion</h3><p class="text-sm text-[var(--light)]">Bogota, Colombia</p></article>
        <article class="card-custom p-4"><h3 class="font-semibold">Horario</h3><p class="text-sm text-[var(--light)]">Lunes a Viernes: 8:00 AM - 6:00 PM</p></article>
      </div>
    </section>
  `,
  styles: ``,
})
export class Contact {
  form = { name: '', email: '', message: '' };
  confirmation = '';

  constructor(private readonly storage: StorageService) {
    const lastContact = this.storage.getSession<{ name: string; email: string } | null>(
      'last-contact',
      null
    );
    if (lastContact) {
      this.confirmation = `Ultimo contacto registrado en esta sesion: ${lastContact.name} (${lastContact.email})`;
    }
  }

  submit(valid: boolean | null): void {
    if (!valid) return;
    this.storage.setSession('last-contact', {
      name: this.form.name,
      email: this.form.email,
    });
    this.confirmation = `Gracias ${this.form.name}, recibimos tu mensaje y pronto te contactaremos.`;
    this.form = { name: '', email: '', message: '' };
  }
}
