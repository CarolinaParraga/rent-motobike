import { Component, EventEmitter, Output, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Moto } from '../interfaces/moto';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CanDeactivateComponent } from '../../shared/guards/leave-page.guard';
import { MotoService } from '../services/moto.service';
import { Title } from '@angular/platform-browser';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'rm-moto-form',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatSnackBarModule],
  templateUrl: './moto-form.component.html',
  styleUrls: ['./moto-form.component.css']
})
export class MotoFormComponent implements OnInit, CanDeactivateComponent {
  newMoto!: Moto;
  saved = false;
  editing = false;

  @ViewChild('motoForm') motoForm!: NgForm;

  constructor(
    private readonly motoService: MotoService,
    private route: ActivatedRoute,
    private readonly router: Router,
    private readonly titleService: Title,
    private snackBar: MatSnackBar,
  ) {
    this.resetMoto();
  }

  resetMoto() {

    this.newMoto =  {
      brand:'',
      carregistration: '',
      color: '',
      model: '',
      price: 0,
      photo:'',
      description:'',

    };
    this.saved = false;
  }

  ngOnInit(): void {
    this.route.data
    .subscribe((data) => {
      if (data['moto']) { // IF WE DETECT A product WE ARE EDITING
        console.log('We are editing');
        this.editing = true;
        this.newMoto = data['moto']; // LOAD product'S VALUES
        this.titleService.setTitle(`Editando ${this.newMoto.description} | Alquiler Motos`); // SET A TITLE TO KNOW WE ARE EDITING
      }
      else {
        console.log('We are adding');
        this.editing = false; // IF NO OBJECTS ARE DETECTED WE ARE ADDING A PRODUCT
        this.titleService.setTitle('Añadiendo Moto | Alquiler Motos'); // SET TITLE ACCORDINGLY
      }
    });
  }

  canDeactivate() {
    return this.saved ||
    this.motoForm.pristine || // IF THE FORM IS NOT TOUCHED YOU CAN LEAVE WITHOUT ASKING
    confirm('Quiere abandonar la página?. Los cambios se perderán');
  }

  addEditMoto() {
    if(this.editing){
      this.motoService.editMoto(this.newMoto)
      .subscribe({
        next: () => {
          console.log('editing moto');
          this.saved = true;
          this.snackBar.open('Vehículo modificado', undefined, {
            duration: 1500,
          });
          this.router.navigate(['/motos',this.newMoto.id]);
        },
        error: (error) =>{
          console.error(error);
          this.snackBar.open('Error: '+ error.error.message, undefined, {
            duration: 1500,
          });
        }
      });
    }
    else{

      this.motoService.addMoto(this.newMoto)
      .subscribe({
        next: (moto) => {
          console.log('adding moto');
          this.saved = true;
          this.newMoto = moto;
          this.snackBar.open('Vehículo añadido correctamente', undefined, {
            duration: 1500,
          });
          this.router.navigate(['/motos']);
        },
        error: (error) =>{
          console.error(error)
          this.snackBar.open('Error al añadir el vehículo ', undefined, {
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
