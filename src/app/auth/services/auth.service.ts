import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError, retry, ReplaySubject, Observer } from 'rxjs';
import { UserLogin, UserToken } from "../../user/interfaces/user";
import { TokenResponse} from "../../shared/interfaces/responses";
import { User } from "../../user/interfaces/user";
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = 'auth';
  logged: boolean = false;
  //private  loginChange$ = new ReplaySubject<boolean>(1);
  user!: User | null
  decodedToken!: UserToken
  userAdmin! : string [];
  bool: boolean = false;



  constructor(private readonly http: HttpClient, private route: ActivatedRoute,
    private router: Router) { }

  login(userLogin: UserLogin):Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`auth/login_check`, userLogin)
    .pipe(
      map((user: TokenResponse) => {
        localStorage.setItem("token", user.token );
        this.decodedToken = helper.decodeToken(user.token)!;
        console.log(this.decodedToken);
        this.userAdmin = this.decodedToken.roles!
        console.log(this.userAdmin)
        this.bool = this.userAdmin.includes('ROLE_ADMIN')
        console.log(this.bool);
        this.bool? localStorage.setItem("role", "true" ): localStorage.setItem("role", "false" )
        //this.loginChange$.next(true);
        return user;
      }),
      catchError((resp: HttpErrorResponse) =>
          throwError(() =>
            `Error getting. Status: ${resp.status}. Message: ${resp.message}`
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

get isAdmin(): boolean {
  let roleToken = localStorage.getItem("role");
  return roleToken === 'true' ? true : false;
}


doLogout() {
  this.logged = false;
  let removeToken = localStorage.removeItem("token");
  let removeTokenAdmin = localStorage.removeItem("role");
  //this.loginChange$.next(false);
  if (removeToken == null && removeTokenAdmin == null ) {
    this.router.navigate(['/']);
  }

}
}
