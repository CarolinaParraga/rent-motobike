import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Moto } from '../interfaces/moto';
import { Router, RouterLink } from '@angular/router';
import { MotoService } from '../services/moto.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmationComponent } from "../../shared/dialog-confirmation/dialog-confirmation.component"
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'rm-moto-card',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    MatDialogModule,
    MatSnackBarModule],
  templateUrl: './moto-card.component.html',
  styleUrls: ['./moto-card.component.css']
})
export class MotoCardComponent {
  @Output() deleted = new EventEmitter<void>();
  @Input() moto!: Moto;

  fotos: string[] = ['moto1', 'moto2', 'moto3', 'moto4']

  constructor(private readonly motoService: MotoService, private dialogo: MatDialog,
    private snackBar: MatSnackBar, public authService: AuthService, private router: Router) {

  }

  delete() {

    this.dialogo
      .open(DialogConfirmationComponent, {
        data: `¿Quiere eliminar este modelo de moto ${this.moto.model}?`
      })
      .afterClosed()
      .subscribe((conf: Boolean) => {
        if (!conf) return;
        this.motoService
          .deleteMoto(this.moto.id!)
          .subscribe({
            next: () => {
              console.log('deleting moto');
              this.deleted.emit();
              this.snackBar.open('Moto eliminada', undefined, {
                duration: 1500,
              });
            },
            error: (error) =>{
              console.error(error);
              this.snackBar.open('Error al eliminar la moto', undefined, {
                duration: 1500,
              });}
          });
      })

  }

}
