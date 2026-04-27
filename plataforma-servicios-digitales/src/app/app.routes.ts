import { Routes } from '@angular/router';
import { Layout } from './core/layout/layout';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { ServiceDetail } from './pages/service-detail/service-detail';
import { Favorites } from './pages/favorites/favorites';
import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'servicios', component: Services },
      { path: 'servicios/:id', component: ServiceDetail },
      { path: 'favoritos', component: Favorites },
      { path: 'contacto', component: Contact },
      { path: 'acerca', component: About },
      { path: '**', redirectTo: '' },
    ],
  },
];
