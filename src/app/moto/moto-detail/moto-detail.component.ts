import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MotoCardComponent } from '../moto-card/moto-card.component';
import { Moto } from '../interfaces/moto';
import { RouterLink } from '@angular/router';
import { MotoService } from '../services/moto.service';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormControl, NonNullableFormBuilder, Validators, ɵFormControlCtor } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import { User } from 'src/app/user/interfaces/user';
import { UserService } from 'src/app/user/services/user.service';
import { Reservation } from 'src/app/reservation/interfaces/reservation';
import { CanDeactivateComponent } from '../../shared/guards/leave-page.guard';
import { ReservationService } from 'src/app/reservation/services/reservation.service';
import { DomSanitizer } from '@angular/platform-browser';
import { state, trigger, style, transition, animate, keyframes  } from '@angular/animations';

const scale = trigger('scale', [
  state('scaleIn', style({ transform: 'scale(1)' })),
  state('scaleOut', style({ transform: 'scale(1.4)' })),
  transition('scaleIn <=> scaleOut', animate('500ms linear'))
]);

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
  styleUrls: ['./moto-detail.component.css'],
  animations: [ scale ]
})
export class MotoDetailComponent implements OnInit, CanDeactivateComponent {
  public scale = 'scaleIn';
  moto!: Moto;
  userLoged! :User;
  reservations: Reservation[] = [];
  filter: Reservation[] = [];
  selectedValue!: number;
  newReservation!: Reservation;
  saved = false;
  rate = 0;
  idMoto = '';
  model = '';
  disponibilidad = false;
  fechauno = new Date;
  fechados = new Date;
  resultado = false;

  reservationForm!: FormGroup;
  startdateControl!: FormControl<string>;
  enddateControl!: FormControl<string>;
  starthourControl!: FormControl<string>;
  endhourControl!: FormControl<string>;
  pickupControl!: FormControl<string>;
  returnControl!: FormControl<string>;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly motoService: MotoService,
    private readonly userService: UserService,
    private readonly reservationService: ReservationService,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private fb: NonNullableFormBuilder
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
    this.startdateControl = this.fb.control('', [
      Validators.required,
    ]);
    this.enddateControl = this.fb.control('', [
      Validators.required,
    ]);
    this.starthourControl = this.fb.control('', [
      Validators.required,
    ]);
    this.endhourControl = this.fb.control('', [
      Validators.required,
    ]);
    this.pickupControl = this.fb.control('', [
      Validators.required,
    ]);
    this.returnControl = this.fb.control('', [
      Validators.required,
    ]);
    this.reservationForm = this.fb.group({
      startdateForm: this.startdateControl,
      enddateForm: this.enddateControl,
      starthourForm: this.starthourControl,
      endhourForm: this.endhourControl,
      pickupForm: this.pickupControl,
      returnForm: this.returnControl,
    });



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

    this.reservationService.getAvailability()
    .subscribe({
      next: av => {
        console.log(av)
        this.reservations = av
        console.log(this.reservations)},

      error: error =>{
        console.error(error)},
      complete: () => console.log("Motos loaded")
    });


  }

  public toggleScale() {
    this.scale = this.scale === 'scaleIn' ? 'scaleOut' : 'scaleIn';
  }

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


  canDeactivate() {
    return this.saved ||
    confirm('Quiere abandonar la página?. Los cambios no se guardarán');
  }

  addReservation(){
    console.log(this.reservations)
    console.log(this.moto.model)

    this.newReservation.startdate = this.startdateControl.value;
    this.newReservation.enddate = this.enddateControl.value;
    this.newReservation.starthour = this.starthourControl.value;
    this.newReservation.endhour = this.endhourControl.value;
    this.newReservation.pickuplocation = this.pickupControl.value;
    this.newReservation.returnlocation = this.returnControl.value;
    this.fechauno = new Date(this.newReservation.startdate);
    this.fechados = new Date(this.newReservation.enddate);
    console.log(this.fechauno)
    console.log(this.fechados)



    if(this.newReservation.startdate < this.newReservation.enddate){
      this.reservations.forEach(element => {
        if(String(element.moto) == this.moto.model && (element.startdate == this.newReservation.startdate
        || element.enddate == this.newReservation.enddate || element.enddate == this.newReservation.startdate ||
        element.startdate == this.newReservation.enddate ||
        (this.newReservation.startdate > element.startdate
          && this.newReservation.startdate < element.enddate) || (this.newReservation.enddate < element.enddate
            && this.newReservation.enddate > element.startdate) || (this.newReservation.enddate < element.startdate
              && this.newReservation.enddate > element.enddate) )){
          this.filter.push(element);
        }
      });
      console.log(this.filter.length)
      if(!this.filter.length){
      this.newReservation.moto = this.moto.id!;
          this.newReservation.user = this.userLoged.id!;
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
              this.router.navigate(['/reservations']);
            },
            error: (error) => {
              console.error(error);
              this.snackBar.open('Reserva NO realizada', undefined, {
                duration: 1500,
                verticalPosition: 'top',
                panelClass: 'awesome-snackbar',
              });}
          });

        }
        else{
          this.snackBar.open('No hay disponibilidad para las fechas solicitadas', undefined, {
            duration: 2000,
            verticalPosition: 'top',
              panelClass: 'awesome-snackbar',
          });
          this.router.navigate(['/motos']);
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
