import { CanActivateFn, ActivatedRouteSnapshot, Router } from "@angular/router";
import { inject } from "@angular/core";

export const userIdGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const id = +route.params['id'];

  if (isNaN(id) || id < 1) {
    return inject(Router).createUrlTree(['/users']);
  }
  return true;
};
