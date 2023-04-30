import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [


  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login',
  },

  {
    path: '**',
    redirectTo: '/auth/login',
  },
];
