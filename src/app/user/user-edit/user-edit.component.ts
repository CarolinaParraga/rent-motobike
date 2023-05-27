import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../services/user.service";
import { ReactiveFormsModule, NgForm, NgModel, FormGroup, FormControl, NonNullableFormBuilder, Validators, ɵFormControlCtor } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../user/interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CanDeactivateComponent } from '../../shared/guards/leave-page.guard';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'rm-user-edit',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule
    ],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, CanDeactivateComponent {
  newUser! : User;
  saved = false;
  editing = false;

  informationForm!: FormGroup;
  nameControl!: FormControl<string>;
  emailControl!: FormControl<string>;
  phoneControl!: FormControl<number>;
  licenseControl!: FormControl<string>;
  passwordControl!: FormControl<string>;

  constructor(
    private readonly userService: UserService,
    private route: ActivatedRoute,
    private readonly router: Router,
    private readonly titleService: Title,
    private snackBar: MatSnackBar,
    private fb: NonNullableFormBuilder
  ) {
    this.resetUser();
  }

  resetUser() {
    this.newUser =  {
      name: '',
      email: '',
      password: '',
      phone: 0,
      license: '',
    };
    this.saved = false;
  }



  ngOnInit(): void {
    //this.informationForm.reset();
    this.nameControl = this.fb.control('', [
      Validators.required,
    ]);
    this.emailControl = this.fb.control('', [
      Validators.required,
    ]);
    this.phoneControl = this.fb.control(0, [
      Validators.required,
    ]);
    this.licenseControl = this.fb.control('', [
      Validators.required,
    ]);
    this.passwordControl = this.fb.control('', [
      Validators.required,
    ]);
    this.informationForm = this.fb.group({
      nameForm: this.nameControl,
      emailForm: this.emailControl,
      phoneForm: this.phoneControl,
      licenseForm: this.licenseControl,
      passwordForm: this.passwordControl,
    });

    this.userService.getProfile()
    .subscribe({
      next: (rta) => {
        this.newUser = rta
        console.log(this.newUser)
        this.informationForm.patchValue({
          nameForm: this.newUser.name,
          emailForm: this.newUser.email,
          phoneForm: this.newUser.phone,
          licenseForm: this.newUser.license,
        });
      },
      error: error => console.error(error),
      complete: () => console.log("User loaded")
    });
  }



  canDeactivate() {
    return this.saved ||
    confirm('Do you want to leave this page?. Changes can be lost');
  }

  goBack() {
    this.router.navigate(['/users/profile']);
  }

  editUser() {

    this.newUser.name = this.nameControl.value;
    this.newUser.email = this.emailControl.value;
    this.newUser.phone = this.phoneControl.value;
    this.newUser.license = this.licenseControl.value;
    this.newUser.password = this.passwordControl.value;
    this.newUser.roles = this.newUser.roles;



    this.userService.editUser(this.newUser)
    .subscribe({
      next: () => {
        console.log('editing user');
        this.saved = true;
        this.snackBar.open('Editando usuario', undefined, {
          duration: 1500,
          verticalPosition: 'top',
          panelClass: 'awesome-snackbar',
        });
        this.router.navigate(['/users/profile']);
      },
      error: (error) =>{
        console.error(error);
        this.snackBar.open('Error', undefined, {
          duration: 1500,
          verticalPosition: 'top',
          panelClass: 'awesome-snackbar',
        });
      }
    });
  }
  validClasses(control: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid
    };
  }

}
