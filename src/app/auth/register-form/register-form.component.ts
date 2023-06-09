import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { ReactiveFormsModule, NgForm, NgModel, FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../user/interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { CanDeactivateComponent } from '../../shared/guards/leave-page.guard';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'rm-register-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule
    ],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit, CanDeactivateComponent {
  newUser! : User;
  saved = false;


registerForm!: FormGroup;
  nameControl!: FormControl<string>;
  emailControl!: FormControl<string>;
  email2Control!: FormControl<string>;
  passwordControl!: FormControl<string>;
  password2Control!: FormControl<string>;
  licenseControl!: FormControl<string>;
  phoneControl!: FormControl<number>;


constructor(
  private readonly authService: AuthService,
  private route: ActivatedRoute,
  private readonly router: Router,
  private snackBar: MatSnackBar,
  private fb: NonNullableFormBuilder
) {
  this.resetUser();
}



ngOnInit(): void {

      this.nameControl = this.fb.control('', [
        Validators.required,
      ]);
      this.emailControl = this.fb.control('', [
        Validators.required,
      ]);
      this.email2Control = this.fb.control('', [
      ]);
      this.passwordControl = this.fb.control('', [
        Validators.required,
        Validators.minLength(5),
      ]);
      this.password2Control = this.fb.control('', [
        Validators.required,
        Validators.minLength(5),
      ]);
      this.licenseControl = this.fb.control('', [
        Validators.required,
        Validators.minLength(9),
      ]);
      this.phoneControl = this.fb.control(0, [
        Validators.required,
        Validators.minLength(9),
      ]);

      this.registerForm = this.fb.group({
        nameForm: this.nameControl,
        emailForm: this.emailControl,
        email2Form: this.email2Control,
        passwordForm: this.passwordControl,
        password2Form: this.password2Control,
        licenseForm: this.licenseControl,
        phoneForm: this.phoneControl,
      });

      this.resetUser();
}



resetUser() {
  this.newUser =  {
  name: '',
  email: '',
  password: '',
  phone:0,
  license:'',
  };
  this.saved = false;
}



canDeactivate() {
  return this.saved ||
  confirm('Esta seguro que quiere abandonar la página?. Los cambios no se guardarán');
}

  onRegister() {
    if(this.email2Control.value === this.emailControl.value && this.password2Control.value === this.passwordControl.value){
      this.newUser.name = this.nameControl.value;
      this.newUser.email = this.emailControl.value;
      this.newUser.password = this.passwordControl.value;
      this.newUser.license = this.licenseControl.value;
      this.newUser.phone = this.phoneControl.value;



    this.authService.register(this.newUser)
    .subscribe({
      next: (user) => {
        console.log('adding user');
        this.saved = true;
        this.newUser = user;
        this.snackBar.open('Añadiendo usuario', undefined, {
          duration: 1500,
          verticalPosition: 'top',
          panelClass: 'awesome-snackbar',
        });
        this.router.navigate(['/auth/login']);
      },
      error: (error) =>{
        console.error(error)
        this.snackBar.open('Error al introducir los datos', undefined, {
          duration: 1500,
          verticalPosition: 'top',
          panelClass: 'awesome-snackbar',
        });
      }
    });
    }
    else{
      this.snackBar.open('Error. Los emails o password no son iguales', undefined, {
        duration: 1500,
        verticalPosition: 'top',
          panelClass: 'awesome-snackbar',
      });
    }

  }

  validClasses(control: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid
    };
  }


}
