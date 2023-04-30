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

  getMe(): Observable<User> {
    return this.http.get<UserResponse>(`${this.userURL}/me`)
    .pipe(
      map((response) => response.user)
    );
  }

  getOneUser(id: number):Observable<User> {
    return this.http.get<UserResponse>(`${this.userURL}/${id}`)
    .pipe(
      map((response) => response.user)
    );
}


  editRestaurant(user: User): Observable<void> {
    return this.http.put<void>
    (`${this.userURL}/${user.id}`,
    user
    );
  }

  editInformation(user: User):Observable<void> {
      return this.http.put<void>(`${this.userURL}/me`, user);

  }
  editPassword(user:User):Observable<void> {
      return this.http.put<void>(`${this.userURL}/me/password`, user);

  }

}
