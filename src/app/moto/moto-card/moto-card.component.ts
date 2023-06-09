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
import { DomSanitizer } from '@angular/platform-browser';
import { state, trigger, style, transition, animate, keyframes  } from '@angular/animations';

const scale = trigger('scale', [
  state('scaleIn', style({ transform: 'scale(1)' })),
  state('scaleOut', style({ transform: 'scale(1.1)' })),
  transition('scaleIn <=> scaleOut', animate('500ms linear'))
]);
@Component({
  selector: 'rm-moto-card',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    MatDialogModule,
    MatSnackBarModule],
  templateUrl: './moto-card.component.html',
  styleUrls: ['./moto-card.component.css'],
  animations: [ scale ]
})
export class MotoCardComponent {
  @Output() deleted = new EventEmitter<void>();
  @Input() moto!: Moto;
  public scale = 'scaleIn';
  fotos: string[] = ['moto1', 'moto2', 'moto3', 'moto4']

  constructor(private readonly motoService: MotoService, private dialogo: MatDialog,
    private snackBar: MatSnackBar, public authService: AuthService,
    private router: Router, private sanitizer: DomSanitizer) {

  }

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public toggleScale() {
    this.scale = this.scale === 'scaleIn' ? 'scaleOut' : 'scaleIn';
  }

  delete() {

    this.dialogo
      .open(DialogConfirmationComponent, {
        data: `¿Quiere eliminar este modelo de moto ${this.moto.model}?`,
        panelClass: 'bg-color'
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
                verticalPosition: 'top',
                panelClass: 'awesome-snackbar',
              });
            },
            error: (error) =>{
              console.error(error);
              this.snackBar.open('Error al eliminar la moto', undefined, {
                duration: 1500,
                verticalPosition: 'top',
              panelClass: 'awesome-snackbar',
              });}
          });
      })

  }

}
