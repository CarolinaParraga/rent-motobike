import { Routes } from '@angular/router';
import { leavePageGuard } from '../shared/guards/leave-page.guard';
import { LogoutActivateGuard } from '../shared/guards/logout-activate.guard';


export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    canActivate: [LogoutActivateGuard],
    loadComponent: () =>
      import('./login-form/login-form.component').then(
        (m) => m.LoginFormComponent
      ),
  },


  { path: 'register',
  canActivate: [LogoutActivateGuard],
  loadComponent: () =>
      import('./register-form/register-form.component').then(
        (m) => m.RegisterFormComponent
      ),
  canDeactivate: [leavePageGuard], // EVERYTHING THAT USED products/ PREFIX DO NOT NEED IT NOW

  },
];
