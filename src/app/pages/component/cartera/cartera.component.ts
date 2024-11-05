import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
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
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { DetailLetrasComponent } from "../detail-letras/detail-letras.component";
import { LetrasComponent } from '../letras/letras.component';
import { FacturasComponent } from '../facturas/facturas.component';

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
    MatSelect,
    MatOption,
    DetailLetrasComponent,
    LetrasComponent
],
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.css'], // Cambié `styleUrl` por `styleUrls`
})
export class CarteraComponent {
  selectedStatus: string = 'Gestion de carteras';
  goLetrasoFac:boolean=false;

  cartera: Cartera[] = [
    {
      idcartera:'1',
      nombrec: 'LETRAS OCTUBRE A NOVIEMBRE 2025',
      tipodoc: 'LETRA',
      fechacrea: '2023/09/16',
      moneda: 'USD',
    },
    {
      idcartera:'2',
      nombrec: 'New Website Design',
      tipodoc: 'FACTURA',
      fechacrea: '2023/09/16',
      moneda: 'PEN',
    },
    {
      idcartera:'3',
      nombrec: 'Bandwidth Increase',
      tipodoc: 'LETRA',
      fechacrea: '2023/09/16',
      moneda: 'PEN',
    },
    {
      idcartera:'4',
      nombrec: 'Support',
      tipodoc: 'FACTURA',
      fechacrea: '2023/09/16',
      moneda: 'USD',
    },
    {
      idcartera:'5',
      nombrec: 'Training Material',
      tipodoc: 'LETRA',
      fechacrea: '2023/09/16',
      moneda: 'PEN',
    },{
      idcartera:'1',
      nombrec: 'LETRAS OCTUBRE A NOVIEMBRE 2025',
      tipodoc: 'LETRA',
      fechacrea: '2023/09/16',
      moneda: 'USD',
    },
    {
      idcartera:'2',
      nombrec: 'New Website Design',
      tipodoc: 'FACTURA',
      fechacrea: '2023/09/16',
      moneda: 'PEN',
    },
    {
      idcartera:'3',
      nombrec: 'Bandwidth Increase',
      tipodoc: 'LETRA',
      fechacrea: '2023/09/16',
      moneda: 'PEN',
    },
    {
      idcartera:'4',
      nombrec: 'Support',
      tipodoc: 'FACTURA',
      fechacrea: '2023/09/16',
      moneda: 'USD',
    },
    {
      idcartera:'5',
      nombrec: 'Training Material',
      tipodoc: 'LETRA',
      fechacrea: '2023/09/16',
      moneda: 'PEN',
    },{
      idcartera:'1',
      nombrec: 'LETRAS OCTUBRE A NOVIEMBRE 2025',
      tipodoc: 'LETRA',
      fechacrea: '2023/09/16',
      moneda: 'USD',
    },
    {
      idcartera:'2',
      nombrec: 'New Website Design',
      tipodoc: 'FACTURA',
      fechacrea: '2023/09/16',
      moneda: 'PEN',
    },
    {
      idcartera:'3',
      nombrec: 'Bandwidth Increase',
      tipodoc: 'LETRA',
      fechacrea: '2023/09/16',
      moneda: 'PEN',
    },
    {
      idcartera:'4',
      nombrec: 'Support',
      tipodoc: 'FACTURA',
      fechacrea: '2023/09/16',
      moneda: 'USD',
    },
    {
      idcartera:'5',
      nombrec: 'Training Material',
      tipodoc: 'LETRA',
      fechacrea: '2023/09/16',
      moneda: 'PEN',
    },
  ];

  get listCart() {
    return this.cartera;
  }

  ///// ==========================================DIALOG REGISTRO CARTERA
  isDialogOpen = false; // Controla la visibilidad del diálogo
  nombredoc: string = '';
  tipodoc: string = '';
  monedadoc: string = '';

  openRegistrarDialog(): void {
    this.isDialogOpen = true; // Con
  }

  onCancel(): void {
    this.isDialogOpen = false; // Cierra el diálogo
  }

  onRegister(): void {
    const data = {
      nombre: this.nombredoc,
      tipo: this.tipodoc,
      moneda: this.monedadoc,
    };
    console.log('Datos registrados:', data);
    this.isDialogOpen = false;
    // Restablece los campos del formulario
    this.nombredoc = '';
    this.tipodoc = '';
    this.monedadoc = '';
  }

  ///VER DETALLLE DE LETRA O FACTURA
  @ViewChild(LetrasComponent) letraComponent!: LetrasComponent;
  @ViewChild(FacturasComponent) facturaComponent!: FacturasComponent;

  goListLetFac(idLetFac:string){

    this.goLetrasoFac=true;
   ///asignar el ID DE LA CARTERA 

  // this.letraComponent.
  // this.facturaComponent

  }
}

interface Cartera {
  idcartera:string;
  nombrec: string;
  fechacrea: string;
  tipodoc: string;
  moneda: string;
}
