import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,
  UrlTree, CanActivate, Router } from '@angular/router';
  import { Observable } from 'rxjs';
  import { AuthService } from '../../auth/services/auth.service';
  @Injectable({
    providedIn: 'root'
  })
  export class LogoutActivateGuard implements CanActivate {
    constructor(
      public authService: AuthService,
      public router: Router
    ) { }
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isLoggedIn === true) {
          window.alert("El usuario ya está logueado!");
          this.router.navigate(['/motos'])
        }
        return true;
    }
  }
