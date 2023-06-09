import { Routes } from '@angular/router';

import { motoIdGuard } from './guards/moto-id.guard';
import { motoResolver } from './resolvers/moto.resolver';

import { leavePageGuard } from '../shared/guards/leave-page.guard';
import { MotosPageComponent } from './motos-page/motos-page.component';
import { MotoDetailComponent } from './moto-detail/moto-detail.component';
import { MotoFormComponent } from './moto-form/moto-form.component';
import { LoginActivateGuard } from '../shared/guards/login-activate.guard';
import { RoleActivateGuard } from '../shared/guards/role-activate.guard';

export const MOTO_ROUTES: Routes = [
  { path: '',
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
  canActivate: [LoginActivateGuard, RoleActivateGuard],

},
  { path: ':id',
  loadComponent: () =>
  import('./moto-detail/moto-detail.component').then(
    (m) => m.MotoDetailComponent
  ),
    canActivate: [motoIdGuard, LoginActivateGuard ],

    resolve: {
      moto: motoResolver,
    },

  },
  { path: ':id/reservation',
  loadComponent: () =>
  import('./moto-detail/moto-detail.component').then(
    (m) => m.MotoDetailComponent
  ),
    canActivate: [motoIdGuard, LoginActivateGuard ],

    resolve: {
      moto: motoResolver,
    },

  },
  { path: ':id/edit',
  loadComponent: () =>
  import('./moto-form/moto-form.component').then(
    (m) => m.MotoFormComponent
  ),
    canActivate: [motoIdGuard, LoginActivateGuard, RoleActivateGuard ],
    canDeactivate: [leavePageGuard],
    resolve: {
      moto: motoResolver,
    },
  },
];
