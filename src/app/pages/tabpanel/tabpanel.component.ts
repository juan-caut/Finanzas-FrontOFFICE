import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 Reemplaza BrowserModule por CommonModule

import { MatIconModule } from '@angular/material/icon'; // 👈 Importamos el módulo

@Component({
  selector: 'app-tabpanel',
  standalone: true,
  // 👇 Importamos los módulos necesarios directamente en el componente standalone.
  imports: [CommonModule,MatIconModule ],
  templateUrl: './tabpanel.component.html',
  styleUrls: ['./tabpanel.component.css'], // 👈 Corrección: "styleUrl" -> "styleUrls"
  providers: [],
})
export class TabpanelComponent {
  statuses = [
    'Gestion de carteras',
    'Soporte',
    'In Progress',
    'Deferred',
    'Rejected',
    'Completed',
  ];
  botuses = [
    'Mi cuenta',
  ];

  selectedStatus = 'Gestion de carteras';

  tasks: Task[] = [
    { title: 'Online Sales', date: '2023/09/16', owner: 'Cindy Stanwick', status: 'Gestion de carteras' },
    { title: 'New Website Design', date: '2023/09/16', owner: 'Sammy Hill', status: 'In Progress' },
    { title: 'Bandwidth Increase', date: '2023/09/16', owner: 'Davey Jones', status: 'Gestion de carteras' },
    { title: 'Support', date: '2023/09/16', owner: 'Victor Norris', status: 'In Progress' },
    { title: 'Training Material', date: '2023/09/16', owner: 'John Heart', status: 'In Progress' },
  ];

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

  selectStatus(cartera: string) {
    this.selectedStatus = cartera;
  }
}


interface Task {
  title: string;
  date: string;
  owner: string;
  status: string;
}

interface Cartera {
  nombrec: string;
  fechacrea: string;
  tipodoc: string;
  moneda: string;
  configstat:string;
}
