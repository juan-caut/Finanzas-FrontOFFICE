import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
@Component({
  selector: 'app-mostrarlogin',
  templateUrl: './mostrarlogin.component.html',
  styleUrl: './mostrarlogin.component.css'
})
export class MostrarloginComponent {
 data=inject(MAT_DIALOG_DATA);
}
