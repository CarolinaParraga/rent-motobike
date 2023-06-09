import { Routes } from '@angular/router';
import { reservationResolver } from './resolvers/reservation.resolver';
import { leavePageGuard } from '../shared/guards/leave-page.guard';
import { LoginActivateGuard } from '../shared/guards/login-activate.guard';

export const RESERVATION_ROUTES: Routes = [
  { path: '',
  loadComponent: () =>
  import('./reservation-page/reservation-page.component').then(
    (m) => m.ReservationPageComponent
  ),
  canActivate: [LoginActivateGuard],

  },
  { path: 'add',
  loadComponent: () =>
      import('./reservation-form/reservation-form.component').then(
        (m) => m.ReservationFormComponent
      ),
  canDeactivate: [leavePageGuard],
  canActivate: [LoginActivateGuard],

},
  { path: ':id/edit',
  loadComponent: () =>
  import('./reservation-form/reservation-form.component').then(
    (m) => m.ReservationFormComponent
  ),
    canActivate: [LoginActivateGuard ],
    //canDeactivate: [leavePageGuard],
    resolve: {
      reservation: reservationResolver,
    },
  },
];
