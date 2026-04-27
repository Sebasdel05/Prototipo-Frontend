import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  template: `
    <section class="rounded-lg border bg-white p-5">
      <h1 class="text-2xl font-bold">Contacto</h1>
      <p class="text-sm text-slate-600">Este formulario usa validaciones basicas y guarda el ultimo envio en sessionStorage.</p>
    </section>

    <form #contactForm="ngForm" class="mt-6 rounded-lg border bg-white p-5" (ngSubmit)="submit(contactForm.valid)">
      <div class="grid gap-3 md:grid-cols-2">
        <input class="rounded border p-2" name="name" [(ngModel)]="form.name" placeholder="Nombre completo" required />
        <input class="rounded border p-2" name="email" [(ngModel)]="form.email" placeholder="Correo electronico" type="email" required email />
        <textarea class="rounded border p-2 md:col-span-2" name="message" [(ngModel)]="form.message" placeholder="Mensaje" required></textarea>
      </div>
      <button class="mt-4 rounded bg-indigo-600 px-4 py-2 text-white" [disabled]="!contactForm.valid">Enviar</button>
    </form>

    @if (confirmation) {
      <p class="mt-4 rounded-lg bg-emerald-100 p-3 text-emerald-800">{{ confirmation }}</p>
    }
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
