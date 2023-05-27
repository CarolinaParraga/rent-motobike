import { Component, EventEmitter, Output, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../interfaces/reservation';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CanDeactivateComponent } from '../../shared/guards/leave-page.guard';
import { ReservationService } from '../services/reservation.service';
import { Moto } from '../../moto/interfaces/moto';
import { User } from '../../user/interfaces/user';
import { MotoService } from '../../moto/services/moto.service';
import { UserService } from '../../user/services/user.service';
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
  motos: Moto[] = [];
  motoReserva!: Moto;
  users: User[] = [];
  saved = false;
  editing = false;
  model!: string [];
  array =  {
    user: '',
    moto: '',
    startdate: '',
    enddate: '',
    starthour: '',
    endhour: '',
    pickuplocation: '',
    returnlocation: '',
  };

  @ViewChild('reservationForm') reservationForm!: NgForm;

  constructor(
    private readonly reservationService: ReservationService,
    private readonly userService: UserService,
    private readonly motoService: MotoService,
    private route: ActivatedRoute,
    private readonly router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.resetReservation();
  }

  resetReservation() {
    this.newReservation =  {
      user: 0,
      moto: 0,
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
        console.log(data['reservation'])
        this.editing = true;
        this.newReservation = data['reservation']; // LOAD product'S VALUES
        this.array = data['reservation'];
        console.log(this.array)
      }
    });
    this.motoService.getMotos()
    .subscribe({
      next: rta => {
        console.log(rta)
        this.motos = rta},
      error: error =>{
        console.error(error)},
      complete: () => console.log("Motos loaded")
    });
    this.userService.getUsers()
    .subscribe({
      next: rta => {
        console.log(rta)
        this.users = rta},
      error: error =>{
        console.error(error)},
      complete: () => console.log("Users loaded")
    });
    console.log(this.array.moto)
    console.log(this.motos)


  }

  canDeactivate() {
    return this.saved ||
    this.reservationForm.pristine || // IF THE FORM IS NOT TOUCHED YOU CAN LEAVE WITHOUT ASKING
    confirm('Do you want to leave this page?. Changes can be lost');
  }



  editReservation() {
    if(this.editing){

      this.motos = this.motos.filter(m => m.model == this.array.moto)
      this.users = this.users.filter(m => m.email == this.array.user)
      this.motos.forEach(m => this.newReservation.moto = m.id)
      this.users.forEach(m => this.newReservation.user = m.id)

      this.reservationService.editReservation(this.newReservation)
      .subscribe({
        next: () => {
          console.log('editing restaurant');
          this.saved = true;
          this.snackBar.open('Editando reserva', undefined, {
            duration: 1500,
            verticalPosition: 'top',
            panelClass: 'awesome-snackbar',
          });
          this.router.navigate(['/reservations']);
        },
        error: (error) =>{
          console.error(error);
          this.snackBar.open('Error: '+ error.error.message, undefined, {
            duration: 1500,
            verticalPosition: 'top',
            panelClass: 'awesome-snackbar',
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
