import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ResponseMotos, ResponseMoto, ResponseReservation } from '../../shared/interfaces/responses';
import { catchError, map, Observable, throwError, retry } from 'rxjs';
import { Moto } from '../interfaces/moto';
import { Reservation } from 'src/app/reservation/interfaces/reservation';

@Injectable({
  providedIn: 'root'
})
export class MotoService {

  private motoURL = 'motos';

  constructor(private readonly http: HttpClient) {

  }

  getMotos(): Observable<Moto[]> {
    return this.http.get<ResponseMotos>
    (this.motoURL)
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



  addMoto(moto: Moto): Observable<Moto> {
    return this.http.post<ResponseMoto>
    (`${this.motoURL}`,
      moto
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





  getMoto(id: number): Observable<Moto> {
    return this.http.get<ResponseMoto>(`${this.motoURL}/${id}`)
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

  editMoto(moto: Moto): Observable<void> {
    return this.http.put<void>
    (`${this.motoURL}/${moto.id}`,
    moto
    )
    .pipe(
      retry(3),
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          `Error editing product ${moto.id}. Status: ${resp.status}. Message: ${resp.message}`
        )
      )
    );
  }

  deleteMoto(id: number): Observable<void>{
    return this.http.delete<void>
    (`${this.motoURL}/${id}`)
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
