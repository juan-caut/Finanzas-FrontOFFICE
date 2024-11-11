import { Component, model, signal,ElementRef, ViewChild, Input, OnInit  } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
import { ApiService } from '../../../api/api.service';


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
export class DetailLetrasComponent implements OnInit {

  isDialogOpen = false; // Controla la visibilidad del diálogo
  readonly panelOpenState = signal(true);
  readonly panelOpenState2 = signal(true);
  readonly panelOpenState3 = signal(true);

  @Input() letra!: Letra;

  
  fechadesc: string | null = null;
  costosiniciales: string = '';
  costosfinales: string = '';
  diasdesc:string='';
  idtransac!:number;
  
  ngOnInit(): void {
    this.server
      .gettransacpletra(this.letra.idletra)
      .subscribe((data: Transaccion) => {
        console.log('Datos obtenidos:', data);

        this.fechadesc= data.fechaTransaccion;
        this.costosiniciales= data.costesIniciales.toString();
        this.costosfinales= data.costesFinales.toString();
        this.diasdesc=data.diasadesc.toString()
        this.idtransac=data.idTransaccion;

      });
  }


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


  

  //=============================DISCOUNT SECTION

  
  constructor(private server: ApiService,private datePipe: DatePipe) {}


  fechadescD: Date | null = null;
  costosinicialesD: number = 0;
  costosfinalesD: number = 0;

  isDialogOpen2 = false; // Controla la visibilidad del diálogo

  registrarDatosDescuentoDialog(): void {
    this.isDialogOpen2 = true; // Con
  }

  descuento: number = 0;
  tcea: number = 0;
  valorEntregado: number = 0;
  valorRecibido: number = 0;
  valorNeto: number = 0;

  calcularDescuento(): void {
    console.log('TRANSACCION ... :', this.idtransac);
    //LLAMAR AL CONTROLADOR DE CALCDESCUENTO DE descuentocontroller
    this.server
      .getdescuentotra(this.idtransac)
      .subscribe((data1: Descuento) => {
        console.log('Datos obtenidos:', data1);

        this.descuento=data1.descuento;
        this.tcea=data1.tcea;
        this.valorEntregado=data1.valorEntregado;
        this.valorRecibido=data1.valorRecibido;
        this.valorNeto=data1.valorNeto;

      });
  }
  
  
  onCancel2(): void {
    this.isDialogOpen2 = false; // Cierra el diálogo
    this.fechadescD = null;
    this.costosinicialesD = 0;
    this.costosfinalesD = 0;
  }


  onRegister2(): void {
    this.fechadesc= this.fechadescD!.toISOString().split('T')[0],
    this.costosiniciales=this.costosinicialesD.toString();
    this.costosfinales=this.costosfinalesD.toString();
    this.server.insertardatosdesc({
      idletra:this.letra.idletra,
      fechaTransaccion:this.fechadescD!.toISOString().split('T')[0],
      costesIniciales:this.costosinicialesD,
      costesFinales:this.costosfinalesD,
      idTransaccion:0,
      diasadesc:0,
    }).subscribe();
    this.isDialogOpen2 = false;
    // Restablece los campos del formulario
    this.fechadescD = null;
    this.costosinicialesD = 0;
    this.costosfinalesD = 0;
  }

}


interface Descuento {
  idDescuento:number;
  idtransaccion:Descuento;
descuento: number;
valorNeto: number;
tcea: number;
valorRecibido: number;
valorEntregado: number;
}



interface Transaccion {
  idTransaccion:number;
  idletra: number;
  fechaTransaccion: string;
  costesIniciales: number;
  costesFinales: number;
  diasadesc:number;
}




interface Letra {
  idletra: number;
  numletra: String;
  fechaemision: String;
  fechavencim: String;
  tasaefectiva: String;
  valornominal: String;
}



  
  
  
  