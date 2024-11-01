import { Component, inject, TemplateRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cartera',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.css'], // Cambié `styleUrl` por `styleUrls`
})


export class CarteraComponent {
  selectedStatus: string = 'Gestion de carteras';

  cartera: Cartera[] = [
    { nombrec: 'LETRAS OCTUBRE A NOVIEMBRE 2025', tipodoc: 'LETRA', fechacrea: '2023/09/16', moneda: 'USD', configstat: 'Gestion de carteras' },
    { nombrec: 'New Website Design', tipodoc: 'FACTURA', fechacrea: '2023/09/16', moneda: 'PEN', configstat: 'Gestion de carteras' },
    { nombrec: 'Bandwidth Increase', tipodoc: 'LETRA', fechacrea: '2023/09/16', moneda: 'PEN', configstat: 'Gestion de carteras' },
    { nombrec: 'Support', tipodoc: 'FACTURA', fechacrea: '2023/09/16', moneda: 'USD', configstat: 'In Progress' },
    { nombrec: 'Training Material', tipodoc: 'LETRA', fechacrea: '2023/09/16', moneda: 'PEN', configstat: 'Gestion de carteras' },
  ];

  get filteredCart() {
    return this.cartera.filter((cartera) => cartera.configstat === this.selectedStatus);
  }

  //DIALOOOOOOOOOG
  dialog = inject(MatDialog);
  animal: string = '';
  data = { name: 'User' };

  openDialog(templateRef: TemplateRef<any>) {

    const config = new MatDialogConfig();
    config.panelClass = 'custom-mat-dialog-container';  // Clase CSS personalizada

    const dialogRef = this.dialog.open(templateRef, {
      data: this.data,
      ...config
    });
    

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.animal = result;
        console.log('Favorite animal:', result);
      }
    });
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }


}

interface Cartera {
  nombrec: string;
  fechacrea: string;
  tipodoc: string;
  moneda: string;
  configstat: string;
}
