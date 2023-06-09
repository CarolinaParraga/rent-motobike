import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError, retry } from 'rxjs';

import { User } from '../interfaces/user';
import { ResponseUser, ResponseUsers } from '../../shared/interfaces/responses';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = 'users';

  token = localStorage.getItem('token');
  headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

  constructor(private readonly http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<ResponseUsers>
    (this.userURL, {headers: this.headers})
    .pipe(
        retry(3),
        map(response => response.data),
        catchError((resp: HttpErrorResponse) =>
          throwError(() =>
            `Error getting users. Status: ${resp.status}. Message: ${resp.message}`
          )
        )
    );
  }

  getProfile(): Observable<User> {
    //let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http.get<ResponseUser>(`${this.userURL}/profile`, {headers: this.headers})
    .pipe(
      map((response) => response.data)
    );
  }

  getOneUser(id: number):Observable<User> {
    return this.http.get<ResponseUser>(`${this.userURL}/${id}`, {headers: this.headers})
    .pipe(
      map((response) => response.data)
    );
}


  editUser(user: User): Observable<void> {
    return this.http.put<void>
    (`${this.userURL}/${user.id}`, user, {headers: this.headers}
    )
    .pipe(
      retry(3),
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          `Error editing user ${user.id}. Status: ${resp.status}. Message: ${resp.message}`
        )
      )
    );
  }

  deleteUser(id: number): Observable<void>{
    return this.http.delete<void>
    (`${this.userURL}/${id}`)
    .pipe(
      retry(3),
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          `Error deleting user ${id}. Status: ${resp.status}. Message: ${resp.message}`
        )
      )
    );
  }

}
