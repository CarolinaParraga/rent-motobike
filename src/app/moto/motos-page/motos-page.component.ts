import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Moto } from '../interfaces/moto';
import { FormsModule } from '@angular/forms';
import { MotoFormComponent } from '../moto-form/moto-form.component';
import { MotoCardComponent } from '../moto-card/moto-card.component';
import { MotoService } from '../services/moto.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MotoFilterPipe } from '../pipes/moto-filter.pipe';
import { AuthService } from 'src/app/auth/services/auth.service';
import { state, trigger, style, transition, animate, keyframes  } from '@angular/animations';



@Component({
  selector: 'rm-motos-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MotoFormComponent,
    MotoCardComponent,
    RouterLink,
    MotoFilterPipe,

  ],
  templateUrl: './motos-page.component.html',
  styleUrls: ['./motos-page.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-500px)' }),
        animate('500ms ease-out', keyframes([
          style({ opacity: 1, transform: 'translateY(220px)' }),
          style({ transform: 'translateY(-10px)' }),
          style({ transform: 'translateY(0px)' }),
        ])),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0px)' }),
        animate('500ms ease-in', keyframes([
          style({ transform: 'translateY(-30px)', offset: 0.6 }),
          style({ opacity: 0, transform: 'translateY(500px)', offset: 1 }),
        ])),
      ]),
    ])
  ]
})
export class MotosPageComponent implements OnInit {
  motos: Moto[] = [];
  search = '';
  show = true;

  constructor(private readonly motoService: MotoService,
    private route: ActivatedRoute, public authService: AuthService) {

  }

  ngOnInit() {

    this.motoService.getMotos()
    .subscribe({
      next: rta => {
        console.log(rta)
        this.motos = rta},
      error: error =>{
        console.error(error)},
      complete: () => console.log("Motos loaded")
    });


  }
  deleteMoto(moto: Moto) {
    this.motos = this.motos.filter(m => m !== moto);
    console.log(this.motos)
  }

  showHide() {
    this.show = !this.show;
  }
}
