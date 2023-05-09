import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../interfaces/reservation';
import { FormsModule } from '@angular/forms';
import { ReservationFormComponent } from '../reservation-form/reservation-form.component';
import { ReservationCardComponent } from '../reservation-card/reservation-card.component';
import { ReservationFilterPipe } from '../pipes/reservation-filter.pipe';
import { DateFilterPipe } from '../pipes/date-filter.pipe';
import { ReservationService } from '../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'rm-reservation-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReservationFormComponent,
    ReservationCardComponent,
    ReservationFilterPipe,
    DateFilterPipe
  ],
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css']
})
export class ReservationPageComponent implements OnInit {
  reservations: Reservation[] = [];
  search = '';
  headers = {
    id: 'ID',
    startdate: 'Fecha Recogina',
    enddate: 'Fecha Devolución',
    starthour: 'Hora recogida',
    endhour: 'Hora devolución',
    moto: 'Moto',
    pickuplocation: 'Lugar Regogida',
    returnlocation: 'Lugar Devolución',
  };

  constructor(private readonly reservationService: ReservationService, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.reservationService.getReservations()
    .subscribe({
      next: rta => this.reservations = rta,
      error: error => console.error(error),
      complete: () => console.log("Reservations loaded")
    });
  }

  deleteRestaurant(reservation: Reservation) {
    this.reservations = this.reservations.filter(r => r !== reservation);
  }

}
