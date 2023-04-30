import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { catchError, EMPTY, of } from "rxjs";

import { User } from "../interfaces/user";
import { UserService } from "../services/user.service";

export const userResolver: ResolveFn<User> = (route, state) => {
  return inject(UserService).getOneUser(+route.params['id'])
    .pipe(
      catchError((error) => {
        inject(Router).navigate(['/users']);
        return EMPTY;
      })
    );

};
