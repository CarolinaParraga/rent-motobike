import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoCardComponent } from '../moto-card/moto-card.component';
import { Moto } from '../interfaces/moto';
import { RouterLink } from '@angular/router';
import { MotoService } from '../services/moto.service';
import { ReactiveFormsModule, NgForm, NgModel, FormGroup, FormControl, NonNullableFormBuilder, Validators, ɵFormControlCtor } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import { User } from 'src/app/user/interfaces/user';
import { UserService } from 'src/app/user/services/user.service';
import { Reservation } from 'src/app/reservation/interfaces/reservation';
import { CanDeactivateComponent } from '../../shared/guards/leave-page.guard';

@Component({
  selector: 'rm-moto-detail',
  standalone: true,
  imports:
  [
    CommonModule,
    MotoCardComponent,
    RouterLink,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './moto-detail.component.html',
  styleUrls: ['./moto-detail.component.css']
})
export class MotoDetailComponent implements OnInit, CanDeactivateComponent {
  moto!: Moto;
  userLoged! :User;
  selectedValue!: number;
  newReservation!: Reservation;
  saved = false;
  rate = 0;

  reservationForm!: FormGroup;
  nameControl!: FormControl<string>;
  emailControl!: FormControl<string>;
  startControl!: FormControl<string>;
  endControl!: FormControl<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly motoService: MotoService,
    private readonly userService: UserService,
    private snackBar: MatSnackBar,
    private fb: NonNullableFormBuilder
  ) {
    this.resetReservation();
  }

  resetReservation() {
    this.newReservation =  {
      stardate: "",
      enddate: "",
      model: "",
      customer: 0,
      moto: 0,
      status: false,
      reservationdate: ""
    };
    this.saved = false;
  }

  ngOnInit(): void {

    this.nameControl = this.fb.control('', [
      Validators.required,
    ]);

    this.moto = this.route.snapshot.data['moto'];
    this.resetReservation();
    this.motoService.getMoto(this.moto.id!)
    .subscribe({
      next: rta =>{ this.moto = rta,
      console.log(this.moto)},
      error: error => console.error(error),
      complete: () => console.log("Moto loaded")
    });
    this.userService.getMe()
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

    this.newReservation.reservationdate = new Date().toLocaleDateString();
    this.newReservation.moto = this.moto.id!;
    this.newReservation.customer = this.userLoged.id!;

    this.motoService.addReservation(this.newReservation)
      .subscribe({
        next: () => {
          console.log('adding reservation');
          this.saved = true;
          this.snackBar.open('La reserva se ha realizado con éxito', undefined, {
            duration: 1500,
          });
          this.router.navigate(['/motos']);
        },
        error: (error) => {
          console.error(error);
          this.snackBar.open('Error: '+ error.error.message, undefined, {
            duration: 1500,
          });}
      });
  }

  goBack() {
    this.router.navigate(['/motos']);
  }

  validClasses(control: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid
    };
  }

}
