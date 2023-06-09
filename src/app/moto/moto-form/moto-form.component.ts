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
  photoName = '';

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

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.newMoto.photo = reader.result as string;
    });
  }

  ngOnInit(): void {
    this.route.data
    .subscribe((data) => {
      if (data['moto']) {
        console.log('We are editing');
        this.editing = true;
        this.newMoto = data['moto'];
        this.photoName = '';
        this.titleService.setTitle(`Editando Moto | Alquiler Motos`);
      }
      else {
        console.log('We are adding');
        this.editing = false;
        this.photoName = '';
        this.titleService.setTitle('Añadiendo Moto | Alquiler Motos');
      }
    });
  }

  canDeactivate() {
    return this.saved ||
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
            verticalPosition: 'top',
            panelClass: 'awesome-snackbar',
          });
          this.router.navigate(['/motos']);
        },
        error: (error) =>{
          console.error(error);
          this.snackBar.open('No se han guardado cambios', undefined, {
            duration: 1500,
            verticalPosition: 'top',
            panelClass: 'awesome-snackbar',
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
            verticalPosition: 'top',
          panelClass: 'awesome-snackbar',
          });
          this.router.navigate(['/motos']);
        },
        error: (error) =>{
          console.error(error)
          this.snackBar.open('No se ha añadido vehículo', undefined, {
            duration: 1500,
            verticalPosition: 'top',
          panelClass: 'awesome-snackbar',
          });
        }
      });
    }
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
