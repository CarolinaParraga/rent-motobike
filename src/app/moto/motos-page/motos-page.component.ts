import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Moto } from '../interfaces/moto';
import { FormsModule } from '@angular/forms';
import { MotoFormComponent } from '../moto-form/moto-form.component';
import { MotoCardComponent } from '../moto-card/moto-card.component';
import { MotoService } from '../services/moto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'rm-motos-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MotoFormComponent,
    MotoCardComponent
  ],
  templateUrl: './motos-page.component.html',
  styleUrls: ['./motos-page.component.css']
})
export class MotosPageComponent implements OnInit {
  motos: Moto[] = [];

  constructor(private readonly motoService: MotoService, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.motoService.getMotos()
    .subscribe({
      next: rta => this.motos = rta,
      error: error =>{
        console.error(error)},
      complete: () => console.log("Motos loaded")
    });
  }
  deleteMoto(moto: Moto) {
    this.motos = this.motos.filter(m => m !== moto);
  }
}
