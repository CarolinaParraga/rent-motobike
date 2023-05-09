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

@Component({
  selector: 'rm-reservation-card',
  standalone: true,
  imports:
  [CommonModule,
    RouterLink,
    MatDialogModule,
    MatSnackBarModule],
  templateUrl: './reservation-card.component.html',
  styleUrls: ['./reservation-card.component.css']
})
export class ReservationCardComponent {
  @Output() deleted = new EventEmitter<void>();
  @Input() reservation!: Reservation;

  constructor(private readonly reservationService: ReservationService, private route: ActivatedRoute,
    private router: Router,
    private dialogo: MatDialog, private snackBar: MatSnackBar) {
  }

  delete() {

    this.dialogo
      .open(DialogConfirmationComponent, {
        data: `¿Quiere borrar esta reserva ${this.reservation.id}?`
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
              this.snackBar.open('Borrando reserva', undefined, {
                duration: 1500,
              });
            },
            error: (error) =>{
              console.error(error);
              this.snackBar.open('Error', undefined, {
                duration: 1500,
              });}
          });
      })

  }

  edit() {
    this.router.navigate(['/reservations', this.reservation.id, 'edit']);
  }

}
