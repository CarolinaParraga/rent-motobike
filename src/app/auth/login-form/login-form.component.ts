import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserLogin } from '../../user/interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'rm-login-form',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    RouterLink,
    MatSnackBarModule,
    ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit  {
  userLogin!: UserLogin;
  errorStatus : boolean = false;
  saved =  false;
  errorMsj = '';

  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(private authService: AuthService,
    private readonly router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
      this.resetLogin();
    }

  resetLogin() {
    this.userLogin =  {
      email: '',
      password: '',
    };
    this.saved = false;
  }

  ngOnInit(): void {

    this.resetLogin();

  }


  onLogin(): void {

      this.authService.login(this.userLogin)
      .subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem("token", res.accessToken );

            this.router.navigate(['/restaurants']);
        },
        error: (error) =>{
          console.error(error);
          this.snackBar.open('Error: '+ error.error.message, undefined, {
            duration: 1500,
          });
        }
      });
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }

}
