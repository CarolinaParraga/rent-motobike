import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError, retry } from 'rxjs';

import { User } from '../interfaces/user';
import { UserResponse, UsersResponse } from '../../shared/interfaces/responses';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = 'users';

  constructor(private readonly http: HttpClient) { }

  getProfile(): Observable<User> {
    return this.http.get<UserResponse>(`${this.userURL}/profile`)
    .pipe(
      map((response) => response.data)
    );
  }

  getOneUser(id: number):Observable<User> {
    return this.http.get<UserResponse>(`${this.userURL}/${id}`)
    .pipe(
      map((response) => response.data)
    );
}


  editUser(user: User): Observable<void> {
    return this.http.put<void>
    (`${this.userURL}/${user.id}`,
    user
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

  editInformation(user: User):Observable<void> {
      return this.http.put<void>(`${this.userURL}/me`, user);

  }
  editPassword(user:User):Observable<void> {
      return this.http.put<void>(`${this.userURL}/me/password`, user);

  }

}
