import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../interfaces/user';
import { FormsModule } from '@angular/forms';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserFilterPipe } from '../pipes/user-filter.pipe';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogConfirmationComponent } from "../../shared/dialog-confirmation/dialog-confirmation.component"
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'rm-user-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UserCardComponent,
    UserFilterPipe,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  users: User[] = [];
  search = '';
  headers = {
    id: 'ID',
    email: 'Email',
    name: 'Nombre',
    phone: 'Teléfono',
    license: 'Carnet de conducir'
  };

  constructor(private readonly userService: UserService, private route: ActivatedRoute,
    private dialogo: MatDialog, private snackBar: MatSnackBar) {

  }

  ngOnInit() {

    this.userService.getUsers()
    .subscribe({
      next: rta => this.users = rta,
      error: error => {
        console.error(error);
        this.snackBar.open('Acceso no autorizado', undefined, {
          duration: 1500,
          verticalPosition: 'top',
          panelClass: 'awesome-snackbar',
        });
      }
    });
  }

  deleteUser(user: User) {
    this.users = this.users.filter(r => r !== user);
  }
}
