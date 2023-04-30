import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { catchError, EMPTY, of } from "rxjs";

import { Moto } from "../interfaces/moto";
import { MotoService } from "../services/moto.service";

export const motoResolver: ResolveFn<Moto> = (route, state) => {
  return inject(MotoService).getMoto(+route.params['id'])
    .pipe(
      catchError((error) => {
        inject(Router).navigate(['/motos']);
        return EMPTY;
      })
    );
};
