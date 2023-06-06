import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,
  UrlTree, CanActivate, Router } from '@angular/router';
  import { Observable } from 'rxjs';
  import { AuthService } from '../../auth/services/auth.service';
  @Injectable({
    providedIn: 'root'
  })
  export class RoleActivateGuard implements CanActivate {
    constructor(
      public authService: AuthService,
      public router: Router
    ) { }
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isAdmin !== true) {
          window.alert("El acceso no está autorizado!");
          this.router.navigate(['/motos'])
        }
        return true;
    }
  }
