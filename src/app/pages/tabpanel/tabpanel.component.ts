import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 Reemplaza BrowserModule por CommonModule

import { MatIconModule } from '@angular/material/icon'; // 👈 Importamos el módulo
import { CarteraComponent } from '../component/cartera/cartera.component';
import { PanelComponent } from "../panel/panel.component";
import { SuportComponent } from "../suport/suport.component";
import { MicuentaComponent } from "../micuenta/micuenta.component";

@Component({
  selector: 'app-tabpanel',
  standalone: true,
  // 👇 Importamos los módulos necesarios directamente en el componente standalone.
  imports: [CommonModule, MatIconModule, CarteraComponent, PanelComponent, SuportComponent, MicuentaComponent],
  templateUrl: './tabpanel.component.html',
  styleUrls: ['./tabpanel.component.css'], // 👈 Corrección: "styleUrl" -> "styleUrls"
  providers: [],
})
export class TabpanelComponent {
  @ViewChild(CarteraComponent) carteraComponent!: CarteraComponent;
  @ViewChild(PanelComponent) panelComponent!: PanelComponent;
  @ViewChild(SuportComponent) soporteComponent!: SuportComponent;
  @ViewChild(MicuentaComponent) micuentaComponent!: MicuentaComponent;

  statuses = ['Principal', 'Gestion de carteras', 'Soporte'];
  botuses = ['Mi cuenta'];

  selectedStatus = 'Principal';

  selectStatus(stat: string) {
    this.selectedStatus = stat;
    //falta condicion para llamar a otros componentes segun el stat selecionado
    switch (stat) {
      case 'Principal':
        if (this.panelComponent) {
          this.panelComponent.selectedStatus = stat;
        }
        break;
      case 'Gestion de carteras':
        if (this.carteraComponent) {
          this.carteraComponent.selectedStatus = stat;
        }
        break;
      case 'Soporte':
        if (this.soporteComponent) {
          this.soporteComponent.selectedStatus = stat;
        }
        break;
      case 'Mi cuenta':
        if (this.micuentaComponent) {
          this.micuentaComponent.selectedStatus = stat;
        }
        break;
      default:
        console.log('Opción no válida, intenta de nuevo.');
        break;
    }
  }
}
