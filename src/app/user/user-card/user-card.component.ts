import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../interfaces/user';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmationComponent } from "../../shared/dialog-confirmation/dialog-confirmation.component"
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'rm-user-card',
  standalone: true,
  imports:
  [CommonModule,
    RouterLink,
    MatDialogModule,
    MatSnackBarModule,
    FontAwesomeModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Output() deleted = new EventEmitter<void>();
  @Input() user!: User;
  icons = { faPencil, faTrash }

  constructor(private readonly userService: UserService, private route: ActivatedRoute,
    private router: Router,
    private dialogo: MatDialog, private snackBar: MatSnackBar) {
  }

  delete() {

    this.dialogo
      .open(DialogConfirmationComponent, {
        data: `¿Quiere eliminar este ususario ${this.user.id}?`
      })
      .afterClosed()
      .subscribe((conf: Boolean) => {
        if (!conf) return;
        this.userService
          .deleteUser(this.user.id!)
          .subscribe({
            next: () => {
              console.log('deleting user');
              this.deleted.emit();
              this.snackBar.open('Eliminando ususario', undefined, {
                duration: 1500,
                verticalPosition: 'top',
                panelClass: 'awesome-snackbar',
              });
            },
            error: (error) =>{
              console.error(error);
              this.snackBar.open('Error al eliminar el usuario', undefined, {
                duration: 1500,
                verticalPosition: 'top',
                panelClass: 'awesome-snackbar',
              });}
          });
      })

  }

  edit() {
    this.router.navigate(['/users', this.user.id, 'edit']);
  }

}
