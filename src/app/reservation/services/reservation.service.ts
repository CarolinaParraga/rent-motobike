import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ResponseReservations, ResponseReservation } from '../../shared/interfaces/responses';
import { catchError, map, Observable, throwError, retry } from 'rxjs';
import { Reservation } from '../interfaces/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservationURL = 'reservations';

  constructor(private readonly http: HttpClient) { }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<ResponseReservations>
    (this.reservationURL)
    .pipe(
        retry(3),
        map(response => response.data),
        catchError((resp: HttpErrorResponse) =>
          throwError(() =>
            `Error getting restaurants. Status: ${resp.status}. Message: ${resp.message}`
          )
        )
    );
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<ResponseReservation>
    (this.reservationURL,
      reservation
    )
    .pipe(
      retry(3),
      map((response) => response.data),
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          `Error adding product. Status: ${resp.status}. Message: ${resp.message}`
        )
      )
    );
  }



  getReservation(id: number): Observable<Reservation> {
    return this.http.get<ResponseReservation>(`${this.reservationURL}/${id}`)
    .pipe(
      retry(3),
      map((response) => response.data),
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          `Error getting product ${id}. Status: ${resp.status}. Message: ${resp.message}`
        )
      )
    );
  }

  editReservation(reservation: Reservation): Observable<void> {
    return this.http.put<void>
    (`${this.reservationURL}/${reservation.id}`,
    reservation
    )
    .pipe(
      retry(3),
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          `Error editing product ${reservation.id}. Status: ${resp.status}. Message: ${resp.message}`
        )
      )
    );
  }

  deleteReservation(id: number): Observable<void>{
    return this.http.delete<void>
    (`${this.reservationURL}/${id}`)
    .pipe(
      retry(3),
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          `Error deleting product ${id}. Status: ${resp.status}. Message: ${resp.message}`
        )
      )
    );
  }
}
