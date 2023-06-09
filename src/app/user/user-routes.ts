import { Routes } from '@angular/router';
import { userIdGuard } from './guards/user-id.guard';
import { userResolver } from './resolvers/user-resolver';
import { leavePageGuard } from '../shared/guards/leave-page.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { LoginActivateGuard } from '../shared/guards/login-activate.guard';

export const USER_ROUTES: Routes = [
  { path: '',
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
  { path: ':id',
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
