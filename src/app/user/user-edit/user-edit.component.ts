import { Component, OnInit, ViewChild } from '@angular/core';
import { CanDeactivateComponent } from 'src/app/shared/guards/leave-page.guard';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'rm-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatSnackBarModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, CanDeactivateComponent {
  newUser! : User;
  saved = false;
  editing = false;

  @ViewChild('userForm') userForm!: NgForm;

  constructor(
    private readonly userService: UserService,
    private route: ActivatedRoute,
    private readonly router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.resetUser();
  }

  resetUser() {
    this.newUser =  {
      name: '',
      email: '',
      password: '',
      phone: 0,
      license: ''
    };
    this.saved = false;
  }



  ngOnInit(): void {
    this.route.data
    .subscribe((data) => {
      if (data['user']) { // IF WE DETECT A product WE ARE EDITING
        console.log('We are editing');
        this.editing = true;
        this.newUser = data['user']; // LOAD product'S VALUES
      }
    });
  }



  canDeactivate() {
    return this.saved ||
    confirm('Do you want to leave this page?. Changes can be lost');
  }

  editUser() {
    if(this.editing){
      this.userService.editUser(this.newUser)
      .subscribe({
        next: () => {
          console.log('editing user');
          this.saved = true;
          this.snackBar.open('Editando usuario', undefined, {
            duration: 1500,
          });
          this.router.navigate(['/profile']);
        },
        error: (error) =>{
          console.error(error);
          this.snackBar.open('Error: '+ error.error.message, undefined, {
            duration: 1500,
          });
        }
      });
    }

  }
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }

}
