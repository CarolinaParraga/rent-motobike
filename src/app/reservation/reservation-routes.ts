import { Routes } from '@angular/router';

// THESE ARE IN /app/products NEW FOLDER
import { reservationResolver } from './resolvers/reservation.resolver';
// THIS WAS MOVED TO /app/shared
import { leavePageGuard } from '../shared/guards/leave-page.guard';

import { LoginActivateGuard } from '../shared/guards/login-activate.guard';

export const RESTAURANT_ROUTES: Routes = [
  { path: '', // EVERYTHING THAT USED products/ PREFIX DO NOT NEED IT NOW
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
  //canDeactivate: [leavePageGuard],
  canActivate: [LoginActivateGuard],

},
  { path: ':id', // EVERYTHING THAT USED products/ PREFIX DO NOT NEED IT NOW
  loadComponent: () =>
  import('./reservation-details/reservation-details.component').then(
    (m) => m.ReservationDetailsComponent
  ),
    //canActivate: [LoginActivateGuard ],

    resolve: {
      reservation: reservationResolver,
    },

  },
  { path: ':id/edit', // EVERYTHING THAT USED products/ PREFIX DO NOT NEED IT NOW
  loadComponent: () =>
  import('./reservation-form/reservation-form.component').then(
    (m) => m.ReservationFormComponent
  ),
    //canActivate: [LoginActivateGuard ],
    //canDeactivate: [leavePageGuard],
    resolve: {
      reservation: reservationResolver,
    },
  },
];
