import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError, retry, ReplaySubject, Observer } from 'rxjs';

import { UserLogin } from "../../user/interfaces/user";
import { TokenResponse} from "../../shared/interfaces/responses";
import { User } from "../../user/interfaces/user";
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = 'auth';
  logged: boolean = false;
  private  loginChange$ = new ReplaySubject<boolean>(1);


  constructor(private readonly http: HttpClient, private route: ActivatedRoute,
    private router: Router) { }

  login(userLogin: UserLogin):Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.authURL}/login`, userLogin)
    .pipe(
      map((user: TokenResponse) => {
        localStorage.setItem("token", user.token );
        this.loginChange$.next(true);
        return user;
      }),
      catchError((resp: HttpErrorResponse) =>
          throwError(() =>
            `Error getting restaurants. Status: ${resp.status}. Message: ${resp.message}`
          )
        )
    );
}



/*async register(user: User): Promise<void> {
  this.http.post(`${this.authURL}/register`, user);

}*/

register(user: User): Observable<any> {
  return this.http.post(`${this.authURL}/register`, user);
}

getToken() {
  return localStorage.getItem("token");
}

get isLoggedIn(): boolean {
  let authToken = localStorage.getItem("token");
  return authToken !== null ? true : false;
}

doLogout() {
  this.logged = false;
  let removeToken = localStorage.removeItem("token");
  this.loginChange$.next(false);
  if (removeToken == null) {
    this.router.navigate(['/']);
  }

}
}
