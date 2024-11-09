import { Component, model, signal,ElementRef, ViewChild, Input, OnInit  } from '@angular/core';
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


interface Letra {
  idletra: number;
  numletra: String;
  fechaemision: String;
  fechavencim: String;
  tasaefectiva: String;
  valornominal: String;
}

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

  @Input() idletra!: number;
  @Input() letra!: Letra;

  
  fechadesc: string | null = null;
  costosiniciales: string = '';
  costosfinales: string = '';


  @ViewChild('printSection') printSection!: ElementRef;

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

}
