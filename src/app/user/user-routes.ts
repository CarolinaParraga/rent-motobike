import { Routes } from '@angular/router';

// THESE ARE IN /app/products NEW FOLDER
import { userIdGuard } from './guards/user-id.guard';
import { userResolver } from './resolvers/user-resolver';
// THIS WAS MOVED TO /app/shared
import { leavePageGuard } from '../shared/guards/leave-page.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFormComponent } from './user-form/user-form.component';
import { LoginActivateGuard } from '../shared/guards/login-activate.guard';

export const USER_ROUTES: Routes = [

  { path: ':id/edit',
  loadComponent: () =>
  import('./user-form/user-form.component').then(
    (m) => m.UserFormComponent
  ),
  //canActivate: [LoginActivateGuard ],
  resolve: {
    user: userResolver,
  },

  },
  { path: 'profile',
  loadComponent: () =>
  import('./user-profile/user-profile.component').then(
    (m) => m.UserProfileComponent
  ),
  //canActivate: [LoginActivateGuard ],

  },
  { path: ':id', // EVERYTHING THAT USED products/ PREFIX DO NOT NEED IT NOW
  loadComponent: () =>
  import('./user-profile/user-profile.component').then(
    (m) => m.UserProfileComponent
  ),
    //canActivate: [userIdGuard, LoginActivateGuard ],
    resolve: {
      user: userResolver,
    },

  },


];
