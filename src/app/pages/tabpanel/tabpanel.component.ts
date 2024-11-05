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

  selectedStatus = 'Panel';

  selectStatus(stat: string) {
    this.selectedStatus = stat;
    //falta condicion para llamar a otros componentes segun el stat selecionado
    switch (stat) {
      case 'Principal':
        // Aquí puedes realizar acciones específicas para la opción 1
        this.panelComponent.selectedStatus = stat;
        break;
      case 'Gestion de carteras':
        this.carteraComponent.selectedStatus = stat;
        // Aquí puedes realizar acciones específicas para la opción 2
        break;
      case 'Soporte':
        // Aquí puedes realizar acciones específicas para la opción 3
        this.soporteComponent.selectedStatus = stat;
        break;
      case 'Mi cuenta':
        this.micuentaComponent.selectedStatus = stat;
        break;
      default:
        console.log('Opción no válida, intenta de nuevo.');
        break;
    }
  }
}
