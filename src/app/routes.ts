import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: 'auth',
  // REPLACE COMPONENT TO LOAD THE ROUTES IN product-routes.ts
  loadChildren: () => import('./auth/auth-routes')
  .then(m => m.AUTH_ROUTES)
  },

  { path: 'motos',
    // REPLACE COMPONENT TO LOAD THE ROUTES IN product-routes.ts
    loadChildren: () => import('./moto/moto-routes')
    .then(m => m.MOTO_ROUTES)
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/motos',
  },

  {
    path: '**',
    redirectTo: '/motos',
  },
];
