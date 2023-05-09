import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { catchError, EMPTY, of } from "rxjs";

import { Reservation } from "../interfaces/reservation";
import { ReservationService } from "../services/reservation.service";

export const reservationResolver: ResolveFn<Reservation> = (route, state) => {
  return inject(ReservationService).getReservation(+route.params['id'])
    .pipe(
      catchError((error) => {
        inject(Router).navigate(['/reservations']);
        return EMPTY;
      })
    );
};