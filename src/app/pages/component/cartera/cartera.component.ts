import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule } from '@angular/common'; // 👈 Reemplaza BrowserModule por CommonModule

@Component({
  selector: 'app-cartera',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './cartera.component.html',
  styleUrl: './cartera.component.css'
})

export class CarteraComponent {

  

  selectedStatus: string = 'Principal'; 

  cartera: Cartera[] = [
    { nombrec: 'LETRAS OCTUBRE A NOVIEMBRE 2025', tipodoc: 'LETRA', fechacrea: '2023/09/16',moneda:'USD', configstat: 'Gestion de carteras' },
    { nombrec: 'New Website Design', tipodoc: 'FACTURA', fechacrea: '2023/09/16',moneda:'PEN', configstat: 'Gestion de carteras' },
    { nombrec: 'Bandwidth Increase', tipodoc: 'LETRA', fechacrea: '2023/09/16',moneda:'PEN', configstat: 'Gestion de carteras' },
    { nombrec: 'Support', tipodoc: 'FACTURA', fechacrea: '2023/09/16',moneda:'USD', configstat: 'In Progress' },
    { nombrec: 'Training Material', tipodoc: 'LETRA', fechacrea: '2023/09/16',moneda:'PEN', configstat: 'Gestion de carteras' },
  ];

  get filteredCart() {
    return this.cartera.filter(cartera => cartera.configstat === this.selectedStatus);
  }
}

interface Cartera {
  nombrec: string;
  fechacrea: string;
  tipodoc: string;
  moneda: string;
  configstat:string;
}
