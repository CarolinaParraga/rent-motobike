import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: 'auth',

  loadChildren: () => import('./auth/auth-routes')
  .then(m => m.AUTH_ROUTES)
  },

  { path: 'motos',

    loadChildren: () => import('./moto/moto-routes')
    .then(m => m.MOTO_ROUTES)
  },
  { path: 'reservations',

    loadChildren: () => import('./reservation/reservation-routes')
    .then(m => m.RESERVATION_ROUTES)
  },
  { path: 'users',

    loadChildren: () => import('./user/user-routes')
    .then(m => m.USER_ROUTES)
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
