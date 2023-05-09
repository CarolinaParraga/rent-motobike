import { Component, EventEmitter, Output, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../interfaces/reservation';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CanDeactivateComponent } from '../../shared/guards/leave-page.guard';
import { ReservationService } from '../services/reservation.service';
import { Title } from '@angular/platform-browser';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'rm-reservation-form',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatSnackBarModule],
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit, CanDeactivateComponent  {
  newReservation!: Reservation;
  saved = false;
  editing = false;

  @ViewChild('reservationForm') reservationForm!: NgForm;

  constructor(
    private readonly reservationService: ReservationService,
    private route: ActivatedRoute,
    private readonly router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.resetReservation();
  }

  resetReservation() {
    this.newReservation =  {
      startdate: '',
      enddate: '',
      starthour: '',
      endhour: '',
      pickuplocation: '',
      returnlocation: '',
    };
    this.saved = false;
  }

  ngOnInit(): void {

    this.route.data
    .subscribe((data) => {
      if (data['reservation']) { // IF WE DETECT A product WE ARE EDITING
        console.log('We are editing');
        this.editing = true;
        this.newReservation = data['reservation']; // LOAD product'S VALUES
      }
    });
  }

  canDeactivate() {
    return this.saved ||
    this.reservationForm.pristine || // IF THE FORM IS NOT TOUCHED YOU CAN LEAVE WITHOUT ASKING
    confirm('Do you want to leave this page?. Changes can be lost');
  }

  editReservation() {
    if(this.editing){
      this.reservationService.editReservation(this.newReservation)
      .subscribe({
        next: () => {
          console.log('editing restaurant');
          this.saved = true;
          this.snackBar.open('Editando reserva', undefined, {
            duration: 1500,
          });
          this.router.navigate(['/reservations']);
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
