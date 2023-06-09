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
  //moto!: Moto;
  reservations: Reservation[] = [];
  filter: Reservation[] = [];
  user!: User;
  newReservation!: Reservation;
  motos: Moto[] = [];
  users: User[] = [];
  saved = false;
  array =  {
    id: 0,
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
      if (data['reservation']) {
        console.log('We are editing');
        console.log(data['reservation'])
        this.newReservation = data['reservation'];
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

    this.userService.getProfile()
    .subscribe({
      next: rta => {
        this.user = rta
        console.log(this.user)
      },
      error: error => console.error(error),
      complete: () => console.log("User loaded")
    });

    this.reservationService.getAvailability()
    .subscribe({
      next: av => {
        console.log(av)
        this.reservations = av
        console.log(this.reservations)},

      error: error =>{
        console.error(error)},
      complete: () => console.log("Reservations loaded")
    });

  }

  canDeactivate() {
    return this.saved ||
    this.reservationForm.pristine || // IF THE FORM IS NOT TOUCHED YOU CAN LEAVE WITHOUT ASKING
    confirm('Quiere abandonar la página?. Los cambios se perderán');
  }

  goBack() {
      this.router.navigate(['/reservations']);
  }

  editReservation() {
    this.motos = this.motos.filter(m => m.model == this.array.moto)
    console.log(this.motos)
    //this.users = this.users.filter(m => m.email == this.array.user)
    //let arrayMotos = this.motos.map(m => this.newReservation.moto = m.id)
    //console.log(arrayMotos)
    //this.users.forEach(m => this.newReservation.user = m.id)
    this.newReservation.user = this.user.id
    console.log(this.array)
    if(this.newReservation.startdate < this.newReservation.enddate){
      this.reservations.forEach(element => {
        if(element.id != this.array.id && String(element.moto) == this.array.moto && (element.startdate == this.newReservation.startdate
        || element.enddate == this.newReservation.enddate || element.enddate == this.newReservation.startdate || (this.newReservation.startdate > element.startdate
          && this.newReservation.startdate < element.enddate) || (this.newReservation.enddate < element.enddate
            && this.newReservation.enddate > element.startdate) || (this.newReservation.enddate < element.startdate
              && this.newReservation.enddate > element.enddate) )){
          this.filter.push(element);
        }
      });

      if(!this.filter.length){
        this.motos.forEach(m => this.newReservation.moto = m.id)
        this.reservationService.editReservation(this.newReservation)
        .subscribe({
          next: () => {
            console.log('editing reservation');
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
            this.snackBar.open('Los cambios no se han guardado', undefined, {
              duration: 1500,
              verticalPosition: 'top',
              panelClass: 'awesome-snackbar',
            });
          }
        });
      }
      else{
        this.snackBar.open('No hay disponibilidad para las fechas solicitadas', undefined, {
          duration: 2000,
          verticalPosition: 'top',
            panelClass: 'awesome-snackbar',
        });
        this.router.navigate(['/reservations']);
      }

    }
    else{
      this.snackBar.open('Las fechas de devolución no puede ser anterior a la de recogida', undefined, {
        duration: 1500,
        verticalPosition: 'top',
          panelClass: 'awesome-snackbar',
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
