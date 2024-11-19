import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  Input,
  model,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { DetailLetrasComponent } from '../detail-letras/detail-letras.component';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
// Importaciones necesarias
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card'; // Importa MatCardModule
import { ApiService, letraResposive } from '../../../api/api.service';
//import { Init } from 'v8';

import { signal, ElementRef } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

import {
  MatDatepicker,
} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-letras',
  standalone: true,
  imports: [
    MatPaginatorModule, MatExpansionModule,
    MatCardModule,
    MatNativeDateModule, MatDatepicker,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    DetailLetrasComponent,
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './letras.component.html',
  styleUrl: './letras.component.css',
  providers: [DatePipe], // Añade DatePipe aquí
})
export class LetrasComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'idletra',
    'numletra',
    'fechaemision',
    'fechavencim',
    'tasaefectiva',
    'valornominal',
    'detalle',
  ];
  displayedColumns2: string[] = [
    'idlet',
    'numlet',
    'fechaem',
    'fechaven',
    'valornom',
    'tea',
    'fechadesc',
    'valorneto',
    'costeinicial',
    'costefinal',
    'valorrecibido',
    'valorentregado',
    'tcea',
  ];

  dataSource = new MatTableDataSource<Letra>([]);
  dataSource2 = new MatTableDataSource<Reporte>([]);
  
  @Input() idcartera!: number;
  idtransac!:number;

  constructor(private server: ApiService, private datePipe: DatePipe) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.server
      .listaletra(this.idcartera)
      .subscribe((data: letraResposive[]) => {
        //console.log('Datos obtenidos:', data);

        const transformedData: Letra[] = data.map((letra) =>
        ({
          idletra: letra.idLetra,
          numletra: letra.numeroLetra,
          fechaemision: letra.fechaEmision.toString(),
          fechavencim: letra.fechaVencimiento.toString(),
          tasaefectiva: letra.tasaEfectiva.toString(),
          valornominal: letra.valorNominal.toString(),
        }));
        this.dataSource.data = transformedData;

        //obtiene la transaccion de la cartera
        this.server
      .getreport(this.idcartera)
      .subscribe((data: Reporte[]) => {
        //console.log('Datos obtenidos:', data);

        const transformedData2: Reporte[] = data.map((reporte) =>
        ({
          idletfac:reporte.idletfac,
          numletfac:reporte.numletfac,
          fechaem:reporte.fechaem,
          valornom:reporte.valornom,
          tea:reporte.tea,
          fechaven:reporte.fechaven,
          fechadesc:reporte.fechadesc,
          valorneto:reporte.valorneto,
          costeinicial:reporte.costeinicial,
          costefinal:reporte.costefinal,
          valorrecibido:reporte.valorrecibido,
          valorentregado:reporte.valorentregado,
          tcea:reporte.tcea
        }));
        this.dataSource2.data = transformedData2;       
      });  

      });
  }

  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  toggleSelectAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach((row) => this.selection.select(row));
    }
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  isAnySelected() {
    return this.selection.selected.length > 0 && !this.isAllSelected();
  }
  toggleRowSelection(row: Letra) {
    this.selection.toggle(row);
  }

  selection = new SelectionModel<Letra>(true, []);

  printSelectedIds(): void {
    const data = this.selection.selected.map((letra) => {
      //console.log('Eliminando letra con id:', letra.idletra);
  
      // Llamamos al método de eliminación y usamos subscribe para manejar la respuesta
      this.server.eliminarLetra(letra.idletra).subscribe(
        (response) => {
          //console.log('Letra eliminada con éxito:', response);
          // Realiza cualquier otra acción que desees tras la eliminación
          this.refreslist();
        },
        (error) => {
          console.error('Error al eliminar la letra:', error);
        }
      );
    });
  

    //console.log('Proceso de eliminación iniciado');
  }
  loadLetras(): void {
    this.server.listaletra(this.idcartera).subscribe((data: letraResposive[]) => {
      //console.log('Datos obtenidos:', data);
      const transformedData: Letra[] = data.map((letra) => ({
        idletra: letra.idLetra,
        numletra: letra.numeroLetra,
        fechaemision: letra.fechaEmision.toString(),
        fechavencim: letra.fechaVencimiento.toString(),
        tasaefectiva: letra.tasaEfectiva.toString(),
        valornominal: letra.valorNominal.toString(),
      }));
      this.dataSource.data = transformedData;
    });
  }
  //==========================LETRA DETAIL VIEW
  goLetraDetail: boolean = false;

  selectedLetraid!: number;
  letraDetalle!: Letra;
  verLetradetail(let1: Letra) {
    this.letraDetalle = let1;
    this.selectedLetraid = let1.idletra ? let1.idletra : 0;
    this.goLetraDetail = true;

  }

  ///// ==========================================DIALOG REGISTRO LETRAA
  isDialogOpen = false; // Controla la visibilidad del diálogo

  numletra: string = '';
  fechaemision: string = '';
  fechavencim: string = '';
  tasaefectiva: string = '';
  valornominal: string = '';

  fechaemisionI: Date | undefined;
  fechavencimI: Date | undefined;

  openRegistrarLetra(): void {
    this.isDialogOpen = true; // Con
  }
  onCancel(): void {
    this.isDialogOpen = false; // Cierra el diálogo
    this.tasanominal = 0;
    this.tipotasanominal = 0;
    this.capitatasanom = 0;
    this.teacalc = 0;
    this.activeTab = 'tab1';
  }
  onRegister(): void {
    if (this.activeTab == 'tab1') {
      const data = {
        numeroLetra: this.numletra,
        fechaEmision: this.fechaemisionI!.toISOString().split('T')[0],
        fechaVencimiento: this.fechavencimI!.toISOString().split('T')[0],
        valorNominal: parseFloat(this.valornominal),
        tasaEfectiva: parseFloat(this.tasaefectiva),
        cartera: this.idcartera,
      };
      //console.log('Datos registrados:', data);
      this.server
        .crearletra({
          idLetra: 0,
          numeroLetra: this.numletra,
          fechaEmision: this.fechaemisionI!.toISOString().split('T')[0],
          fechaVencimiento: this.fechavencimI!.toISOString().split('T')[0],
          valorNominal: parseFloat(this.valornominal),
          tasaEfectiva: parseFloat(this.tasaefectiva),
          carteraid: this.idcartera,
        })
        .subscribe();
      this.isDialogOpen = false;
      // Restablece los campos del formulario
      this.numletra = '';
      this.fechaemisionI = undefined;
      this.fechavencimI = undefined;
      this.tasaefectiva = '';
      this.valornominal = '';
    } else {
      const data = {
        numeroLetra: this.numletra,
        fechaEmision: this.fechaemisionI!.toISOString().split('T')[0],
        fechaVencimiento: this.fechavencimI!.toISOString().split('T')[0],
        valorNominal: parseFloat(this.valornominal),
        tasaEfectiva: this.teacalc,
        cartera: this.idcartera,
      };
      //console.log('Datos registrados:', data);
      this.server
        .crearletra({
          idLetra: 0,
          numeroLetra: this.numletra,
          fechaEmision: this.fechaemisionI!.toISOString().split('T')[0],
          fechaVencimiento: this.fechavencimI!.toISOString().split('T')[0],
          valorNominal: parseFloat(this.valornominal),
          tasaEfectiva: this.teacalc,
          carteraid: this.idcartera,
        })
        .subscribe();
      this.isDialogOpen = false;
      // Restablece los campos del formulario
      this.numletra = '';
      this.fechaemisionI = undefined;
      this.fechavencimI = undefined;
      this.tasaefectiva = '';
      this.valornominal = '';

      this.tasanominal = 0;
      this.tipotasanominal = 0;
      this.capitatasanom = 0;
      this.teacalc = 0;
      this.activeTab = 'tab1';
    }
  }
  refreslist(): void {
    this.dataSource = new MatTableDataSource<Letra>([]);; // Restablece el estado del array de carteras
    this.dataSource2 = new MatTableDataSource<Reporte>([]);; // Restablece el estado del array de carteras
    this.ngOnInit();    // Reejecuta el método ngOnInit
  }

  activeTab = 'tab1'; // Define una propiedad para rastrear la pestaña activa
  // Método para cambiar la pestaña activa
  openTab(tabId: string): void {
    this.activeTab = tabId;
  }

  //==============================CALC TEA-REGIST TASA CONV
  //tasanominal
  tasanominal: number = 0;
  tipotasanominal: number = 0;
  capitatasanom: number = 0;
  teacalc: number = 0;

  onCalcTEA(): void {
    const data = {
      tasaNominal: this.tasanominal,
      tipoTasa: this.tipotasanominal,
      capitalizacion: this.capitatasanom,
      tasaEfectiva: 0,
    };
    //console.log('Datos de conversion:', data);
    this.server
      .convTasa({
        tasaNominal: this.tasanominal,
        tipoTasa: this.tipotasanominal,
        capitalizacion: this.capitatasanom,
        tasaEfectiva: 0,
      })
      .subscribe({
        next: (valorConvertido: number) => {
          // `valorConvertido` es el número que retorna el backend
          //console.log('Valor convertido:', valorConvertido);
          // Puedes almacenar este valor en una variable para utilizarlo más adelante
          this.teacalc = valorConvertido;
        },
        error: (error) => {
          console.error('Error al convertir la tasa:', error);
        },
      });
    // Restablece los campos del formulario
  }


  //=============================DISCOUNT SECTION


  readonly panelOpenState2 = signal(false);
  readonly panelOpenState3 = signal(false);


  fechadesc: string | null = null;

  fechadescD: Date | null = null;
  isDialogOpen2 = false; // Controla la visibilidad del diálogo



  registrarDatosDescuentoDialog(): void {
    this.isDialogOpen2 = true; // Con
  }

  calcularDescuento(): void {
    //LLAMAR AL CONTROLADOR DE CALCDESCUENTO DE descuentocontroller
    this.dataSource2 = new MatTableDataSource<Reporte>([]);; // Restablece el estado del array de carteras
    this.ngOnInit();    // Reejecuta el método ngOnInit
  }


  onCancel2(): void {
    this.isDialogOpen2 = false; // Cierra el diálogo
    this.fechadescD = null;
  }


  onRegister2(): void {
    
    this.fechadesc= this.fechadescD!.toISOString().split('T')[0],

    this.server.insertardescC({
      id_cartera:this.idcartera,
      fechaTransaccion:this.fechadescD!.toISOString().split('T')[0],
    }).subscribe(() => {

      //console.log('TRANSACCION REALIZADA:');
      
      
    });
    this.isDialogOpen2 = false;
    // Restablece los campos del formulario
    this.fechadescD = null;
    //obtener el id de la transaccion
   
  }


  ///=====================IMPRIMIR REPORTE============
  

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
            <title>Imprimir detalle letra</title>
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


export interface TransaccionC {
  fechaTransaccion: string;
  id_cartera: number;
}


 interface Reporte{
  idletfac: number ;
  numletfac: string;
  fechaem: string;
  fechaven: string;
  valornom: number ;
  tea: number ;
  fechadesc: string;
  valorneto: number ;
  costeinicial: number ;
  costefinal: number ;
  valorrecibido: number ;
  valorentregado: number ;
  tcea: number ;
}

interface Transaccion {
  idTransaccion:number;
  idletra: number;
  idfactura:number;
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