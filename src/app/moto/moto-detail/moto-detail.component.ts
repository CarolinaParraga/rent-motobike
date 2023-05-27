import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MotoCardComponent } from '../moto-card/moto-card.component';
import { Moto } from '../interfaces/moto';
import { RouterLink } from '@angular/router';
import { MotoService } from '../services/moto.service';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import { User } from 'src/app/user/interfaces/user';
import { UserService } from 'src/app/user/services/user.service';
import { Reservation } from 'src/app/reservation/interfaces/reservation';
import { CanDeactivateComponent } from '../../shared/guards/leave-page.guard';
import { ReservationService } from 'src/app/reservation/services/reservation.service';

@Component({
  selector: 'rm-moto-detail',
  standalone: true,
  imports:
  [
    CommonModule,
    MotoCardComponent,
    RouterLink,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './moto-detail.component.html',
  styleUrls: ['./moto-detail.component.css']
})
export class MotoDetailComponent implements OnInit, CanDeactivateComponent {
  moto!: Moto;
  userLoged! :User;
  reservations: Reservation[] = [];
  filter: Reservation[] = [];
  selectedValue!: number;
  newReservation!: Reservation;
  saved = false;
  rate = 0;
  idMoto = '';

  @ViewChild('reservationForm') reservationForm!: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly motoService: MotoService,
    private readonly userService: UserService,
    private readonly reservationService: ReservationService,
    private snackBar: MatSnackBar
  ) {
    this.resetReservation();
  }

  resetReservation() {
    this.newReservation =  {
      startdate: "",
      enddate: "",
      starthour:"",
      endhour:"",
      user: 0,
      moto: 0,
      pickuplocation: "",
      returnlocation: "",
      status: false,

    };
    this.saved = false;
  }

  ngOnInit(): void {



    this.idMoto = this.route.snapshot.params['id'];
    console.log(this.idMoto);
    const id = this.idMoto ? +this.idMoto : null;
    console.log(id)

    this.resetReservation();
    this.moto = this.route.snapshot.data['moto'];
    this.motoService.getMoto(this.moto.id!)
    .subscribe({
      next: rta => {
        console.log(rta)
        this.moto = rta},
      error: error => console.error(error),
      complete: () => console.log("Moto loaded")
    });
    this.userService.getProfile()
    .subscribe({
      next: (rta) => {
        this.userLoged = rta
      },
      error: error => console.error(error),
      complete: () => console.log("User loaded")
    });


  }

  canDeactivate() {
    return this.saved ||
    confirm('Quiere abandonar la página?. Los cambios no se guardarán');
  }

  addReservation(){
    this.reservationService.getAvailability()
    .subscribe({
      next: rta => {
        console.log(rta)
        this.reservations = rta},
      error: error =>{
        console.error(error)},
      complete: () => console.log("Motos loaded")
    });
    this.newReservation.moto = this.moto.id!;
      this.newReservation.user = this.userLoged.id!;
      console.log(typeof(this.newReservation.startdate))
      console.log(this.newReservation)


      this.reservationService.addReservation(this.newReservation)
        .subscribe({
          next: () => {
            console.log('adding reservation');
            this.saved = true;
            this.snackBar.open('La reserva se ha realizado con éxito', undefined, {
              duration: 1500,
              verticalPosition: 'top',
              panelClass: 'awesome-snackbar',
            });
            this.router.navigate(['/motos']);
          },
          error: (error) => {
            console.error(error);
            this.snackBar.open('Error: '+ error.error.message, undefined, {
              duration: 1500,
              verticalPosition: 'top',
              panelClass: 'awesome-snackbar',
            });}
        });
  }

  goBack() {
    this.router.navigate(['/motos']);
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }

}
