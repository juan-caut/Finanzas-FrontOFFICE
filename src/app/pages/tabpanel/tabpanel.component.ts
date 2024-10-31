import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 Reemplaza BrowserModule por CommonModule

import { MatIconModule } from '@angular/material/icon'; // 👈 Importamos el módulo
import { CarteraComponent } from '../component/cartera/cartera.component';
;

@Component({
  selector: 'app-tabpanel',
  standalone: true,
  // 👇 Importamos los módulos necesarios directamente en el componente standalone.
  imports: [CommonModule,MatIconModule,CarteraComponent ],
  templateUrl: './tabpanel.component.html',
  styleUrls: ['./tabpanel.component.css'], // 👈 Corrección: "styleUrl" -> "styleUrls"
  providers: [],
})
export class TabpanelComponent {

  
  @ViewChild(CarteraComponent) carteraComponent!: CarteraComponent;


  statuses = [
    'Principal',
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

  selectedStatus = 'Principal';


  selectStatus(stat: string) {
    this.selectedStatus = stat;
    //falta condicion para llamar a otros componentes segun el stat selecionado
    
    this.carteraComponent.selectedStatus = stat;
  }


}
