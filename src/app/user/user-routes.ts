import { Routes } from '@angular/router';

// THESE ARE IN /app/products NEW FOLDER
import { userIdGuard } from './guards/user-id.guard';
import { userResolver } from './resolvers/user-resolver';
// THIS WAS MOVED TO /app/shared
import { leavePageGuard } from '../shared/guards/leave-page.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { LoginActivateGuard } from '../shared/guards/login-activate.guard';

export const USER_ROUTES: Routes = [
  { path: '', // EVERYTHING THAT USED products/ PREFIX DO NOT NEED IT NOW
  loadComponent: () =>
  import('./user-page/user-page.component').then(
    (m) => m.UserPageComponent
  ),
  canActivate: [LoginActivateGuard],
  },
  { path: 'edit',
  loadComponent: () =>
  import('./user-edit/user-edit.component').then(
    (m) => m.UserEditComponent
  ),
  canDeactivate: [leavePageGuard],
  canActivate: [LoginActivateGuard ],


  },
  { path: 'profile',
  loadComponent: () =>
  import('./user-profile/user-profile.component').then(
    (m) => m.UserProfileComponent
  ),
  canActivate: [LoginActivateGuard ],

  },
  { path: ':id', // EVERYTHING THAT USED products/ PREFIX DO NOT NEED IT NOW
  loadComponent: () =>
  import('./user-profile/user-profile.component').then(
    (m) => m.UserProfileComponent
  ),
    canActivate: [LoginActivateGuard ],
    resolve: {
      user: userResolver,
    },

  },


];
