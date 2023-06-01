import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../interfaces/reservation';
import { RouterLink } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmationComponent } from "../../shared/dialog-confirmation/dialog-confirmation.component"
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from "../../auth/services/auth.service";

@Component({
  selector: 'rm-reservation-card',
  standalone: true,
  imports:
  [CommonModule,
    RouterLink,
    MatDialogModule,
    MatSnackBarModule,
    FontAwesomeModule],
  templateUrl: './reservation-card.component.html',
  styleUrls: ['./reservation-card.component.css']
})
export class ReservationCardComponent {
  @Output() deleted = new EventEmitter<void>();
  @Input() reservation!: Reservation;
  icons = { faPencil, faTrash }


  constructor(private readonly reservationService: ReservationService, private route: ActivatedRoute,
    private router: Router,
    private dialogo: MatDialog, private snackBar: MatSnackBar, public authService: AuthService,) {
  }

  delete() {

    this.dialogo
      .open(DialogConfirmationComponent, {
        data: `¿Quiere eliminar esta reserva ${this.reservation.id}?`,
        width: '500px'
      })
      .afterClosed()
      .subscribe((conf: Boolean) => {
        if (!conf) return;
        this.reservationService
          .deleteReservation(this.reservation.id!)
          .subscribe({
            next: () => {
              console.log('deleting reservation');
              this.deleted.emit();
              this.snackBar.open('Eliminando reserva', undefined, {
                duration: 1500,
                verticalPosition: 'top',
                panelClass: 'awesome-snackbar',
              });
            },
            error: (error) =>{
              console.error(error);
              this.snackBar.open('Error al eliminar la reserva', undefined, {
                duration: 1500,
                verticalPosition: 'top',
                panelClass: 'awesome-snackbar',
              });}
          });
      })

  }

  edit() {
    this.router.navigate(['/reservations', this.reservation.id, 'edit']);
  }

}
