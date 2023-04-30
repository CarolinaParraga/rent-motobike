import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Moto } from '../interfaces/moto';
import { RouterLink } from '@angular/router';
import { MotoService } from '../services/moto.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmationComponent } from "../../shared/dialog-confirmation/dialog-confirmation.component"
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';

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

  constructor(private readonly motoService: MotoService, private dialogo: MatDialog, private snackBar: MatSnackBar) {

  }

}
