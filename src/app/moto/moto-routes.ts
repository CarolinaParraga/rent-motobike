import { Routes } from '@angular/router';

// THESE ARE IN /app/products NEW FOLDER
import { motoIdGuard } from './guards/moto-id.guard';
import { motoResolver } from './resolvers/moto.resolver';
// THIS WAS MOVED TO /app/shared
import { leavePageGuard } from '../shared/guards/leave-page.guard';
import { MotosPageComponent } from './motos-page/motos-page.component';
import { MotoDetailComponent } from './moto-detail/moto-detail.component';
import { MotoFormComponent } from './moto-form/moto-form.component';
import { LoginActivateGuard } from '../shared/guards/login-activate.guard';
//import { LoginActivateGuard } from '../shared/guards/login-activate.guard';

export const MOTO_ROUTES: Routes = [
  { path: '', // EVERYTHING THAT USED products/ PREFIX DO NOT NEED IT NOW
  loadComponent: () =>
  import('./motos-page/motos-page.component').then(
    (m) => m.MotosPageComponent
  ),
  //canActivate: [LoginActivateGuard],

  },
  { path: 'add',
  loadComponent: () =>
      import('./moto-form/moto-form.component').then(
        (m) => m.MotoFormComponent
      ),
  canDeactivate: [leavePageGuard],
  //canActivate: [LoginActivateGuard],

},
  { path: ':id', // EVERYTHING THAT USED products/ PREFIX DO NOT NEED IT NOW
  loadComponent: () =>
  import('./moto-detail/moto-detail.component').then(
    (m) => m.MotoDetailComponent
  ),
    canActivate: [motoIdGuard, LoginActivateGuard ],

    resolve: {
      moto: motoResolver,
    },

  },
  { path: ':id/reservation', // EVERYTHING THAT USED products/ PREFIX DO NOT NEED IT NOW
  loadComponent: () =>
  import('./moto-detail/moto-detail.component').then(
    (m) => m.MotoDetailComponent
  ),
    //canActivate: [motoIdGuard, LoginActivateGuard ],

    resolve: {
      moto: motoResolver,
    },

  },
  { path: ':id/edit', // EVERYTHING THAT USED products/ PREFIX DO NOT NEED IT NOW
  loadComponent: () =>
  import('./moto-form/moto-form.component').then(
    (m) => m.MotoFormComponent
  ),
    //canActivate: [motoIdGuard, LoginActivateGuard ],
    canDeactivate: [leavePageGuard],
    resolve: {
      moto: motoResolver,
    },
  },
];
