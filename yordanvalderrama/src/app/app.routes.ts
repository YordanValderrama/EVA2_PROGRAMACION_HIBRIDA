import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'configuracion',
    loadComponent: () => import('./configuracion/configuracion.page').then(m => m.ConfiguracionPage),
  },
  {
    path: 'gestion-citas',
    loadComponent: () => import('./gestion-citas/gestion-citas.page').then(m => m.GestionCitasPage),
  }
];