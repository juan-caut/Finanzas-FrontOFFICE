import { Component, model, signal,ElementRef, ViewChild  } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule

// Importa los módulos de Angular Material que necesitas
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Si usas <mat-input> dentro del form field

import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-detail-letras',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatExpansionModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    CommonModule,
    DatePipe,
    MatCardModule,
  ],

  templateUrl: './detail-letras.component.html',
  styleUrl: './detail-letras.component.css',
  providers: [DatePipe], // Añade DatePipe aquí
})
export class DetailLetrasComponent {
  isDialogOpen = false; // Controla la visibilidad del diálogo
  readonly panelOpenState = signal(true);
  readonly panelOpenState2 = signal(true);
  readonly panelOpenState3 = signal(true);

  letra: Letra = {
    idletra: 1,
    numletra: '001',
    fechaemision: '2024-11-05',
    fechavencim: '2025-11-05',
    tasaefectiva: '5.00',
    valornominal: '1000.00',
  };
  descuento:Descuento={
    descuento: "1234",
    valorNeto: "5000",
    tcea: "20.45",
    valorRecibido: "4000",
    valorEntregado: "4000",
  };
  
  fechadesc: string | null = null;
  costosiniciales: string = '';
  costosfinales: string = '';


  registrarDatosDescuentoDialog(): void {
    this.isDialogOpen = true; // Con
  }
  
  calcularDescuento(): void {
    //LLAMAR AL CONTROLADOR DE CALCDESCUENTO DE descuentocontroller
  }

  @ViewChild('printSection') printSection!: ElementRef;


  // Otras propiedades y métodos de tu componente

  Imprimir(): void {
    const printContents = this.printSection.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;

    // Abrir una nueva ventana
    const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');

    if (popupWin) {
      popupWin.document.open();
      popupWin.document.write(`
        <html>
          <head>
            <title>Imprimir Detalle Letra</title>
            <style>
              /* Aquí puedes incluir los estilos necesarios para la impresión */
              @media print {
                body {
                  -webkit-print-color-adjust: exact;
                }
              }
              /* Copia los estilos de tu aplicación */
              ${this.getStyles()}
            </style>
          </head>
          <body onload="window.print(); window.close();">
            ${printContents}
          </body>
        </html>
      `);
      popupWin.document.close();
    } else {
      alert('No se pudo abrir la ventana de impresión. Por favor, permite las ventanas emergentes en tu navegador.');
    }
  }

  // Método para obtener los estilos de tu aplicación
  private getStyles(): string {
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(style => style.outerHTML)
      .join('\n');
    return styles;
  }

  ///===============DIALOG-----------------------------------------------REGISTRAR EN LA TABLA TRANSACCION
 
  fechadescD: string | null = null;
  costosinicialesD: string = '';
  costosfinalesD: string = '';

  constructor(private datePipe: DatePipe) {}

  
  onDateChange(event: any): void {
    // Aplica el formato MM-dd-yyyy
    this.fechadescD = this.datePipe.transform(event, 'MM-dd-yyyy');
  }

  
  
  onCancel(): void {
    this.isDialogOpen = false; // Cierra el diálogo
    this.fechadescD = '';
    this.costosinicialesD = '';
    this.costosfinalesD = '';
  }


  onRegister(): void {
    this.fechadesc = this.fechadescD;
    this.costosiniciales = this.costosinicialesD;
    this.costosfinales = this.costosfinalesD;
    const data = {
      fechadescueto: this.fechadescD,
      costosiniciales: this.costosinicialesD,
      costosfinales: this.costosfinalesD,
    };
    console.log('Datos registrados:', data);
    this.isDialogOpen = false;
    // Restablece los campos del formulario
    this.fechadescD = '';
    this.costosinicialesD = '';
    this.costosfinalesD = '';
  }
}

interface Letra {
  idletra: number;
  numletra: string;
  fechaemision: string;
  fechavencim: string;
  tasaefectiva: string;
  valornominal: string;
}

interface Descuento {
  descuento: string;
  valorNeto: string;
  tcea: string;
  valorRecibido: string;
  valorEntregado: string;
}

