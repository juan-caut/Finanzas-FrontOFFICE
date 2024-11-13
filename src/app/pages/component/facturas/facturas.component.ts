import { Component } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Input, model, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { DetailFacturasComponent } from '../detail-facturas/detail-facturas.component';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
// Importaciones necesarias
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card'; // Importa MatCardModule
import { ApiService } from '../../../api/api.service';
//import { Init } from 'v8';

import { signal, ElementRef } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatDatepicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatExpansionModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepicker,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    DetailFacturasComponent,
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.css',
  providers: [DatePipe], // Añade DatePipe aquí
})
export class FacturasComponent {
  displayedColumns: string[] = [
    'select',
    'idfactura',
    'numfactura',
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

  dataSource = new MatTableDataSource<Factura>([]);
  dataSource2 = new MatTableDataSource<Reporte>([]);

  @Input() idcartera!: number;
  idtransac!: number;

  constructor(private server: ApiService, private datePipe: DatePipe) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.server.listafactura(this.idcartera).subscribe((data: Factura[]) => {
      console.log('Datos obtenidos:', data);

      console.log('CARTERA NUM:', this.idcartera);

      const transformedData: Factura[] = data.map((factura) => ({
        idFactura: factura.idFactura,
        numeroFactura: factura.numeroFactura,
        fechaEmision: factura.fechaEmision.toString(),
        fechaVencimiento: factura.fechaVencimiento.toString(),
        tasaEfectiva: factura.tasaEfectiva.toString(),
        montoTotal: factura.montoTotal.toString(),
        idcartera: factura.idcartera,
      }));
      this.dataSource.data = transformedData;

      this.server.getreport(this.idcartera).subscribe((data: Reporte[]) => {
        console.log('Datos obtenidos:', data);

        const transformedData2: Reporte[] = data.map((reporte) => ({
          idletfac: reporte.idletfac,
          numletfac: reporte.numletfac,
          fechaem: reporte.fechaem,
          valornom: reporte.valornom,
          tea: reporte.tea,
          fechaven: reporte.fechaven,
          fechadesc: reporte.fechadesc,
          valorneto: reporte.valorneto,
          costeinicial: reporte.costeinicial,
          costefinal: reporte.costefinal,
          valorrecibido: reporte.valorrecibido,
          valorentregado: reporte.valorentregado,
          tcea: reporte.tcea,
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
  toggleRowSelection(row: Factura) {
    this.selection.toggle(row);
  }

  selection = new SelectionModel<Factura>(true, []);

  //==========================LETRA DETAIL VIEW
  goFacturaDetail: boolean = false;

  selectedFacturaid!: number;
  facturaDetalle!: Factura;
  verFacturadetail(let1: Factura) {
    this.facturaDetalle = let1;
    this.selectedFacturaid = let1.idFactura ? let1.idFactura : 0;
    this.goFacturaDetail = true;
  }

  ///// ==========================================DIALOG REGISTRO LETRAA
  isDialogOpen = false; // Controla la visibilidad del diálogo

  numfactura: string = '';
  fechaemision: string = '';
  fechavencim: string = '';
  tasaefectiva: string = '';
  valornominal: string = '';

  fechaemisionI: Date | undefined;
  fechavencimI: Date | undefined;

  openRegistrarFactura(): void {
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
        numeroFactura: this.numfactura,
        fechaEmision: this.fechaemisionI!.toISOString().split('T')[0],
        fechaVencimiento: this.fechavencimI!.toISOString().split('T')[0],
        valorNominal: parseFloat(this.valornominal),
        tasaEfectiva: parseFloat(this.tasaefectiva),
        cartera: this.idcartera,
      };
      console.log('Datos registrados:', data);
      this.server
        .crearfactura({
          idFactura: 0,
          numeroFactura: this.numfactura,
          fechaEmision: this.fechaemisionI!.toISOString().split('T')[0],
          fechaVencimiento: this.fechavencimI!.toISOString().split('T')[0],
          montoTotal: this.valornominal,
          tasaEfectiva: this.tasaefectiva,
          idcartera: this.idcartera,
        })
        .subscribe();
      this.isDialogOpen = false;
      // Restablece los campos del formulario
      this.numfactura = '';
      this.fechaemisionI = undefined;
      this.fechavencimI = undefined;
      this.tasaefectiva = '';
      this.valornominal = '';
    } else {
      const data = {
        numeroFactura: this.numfactura,
        fechaEmision: this.fechaemisionI!.toISOString().split('T')[0],
        fechaVencimiento: this.fechavencimI!.toISOString().split('T')[0],
        valorNominal: parseFloat(this.valornominal),
        tasaEfectiva: this.teacalc,
        cartera: this.idcartera,
      };
      console.log('Datos registrados:', data);
      this.server
        .crearfactura({
          idFactura: 0,
          numeroFactura: this.numfactura,
          fechaEmision: this.fechaemisionI!.toISOString().split('T')[0],
          fechaVencimiento: this.fechavencimI!.toISOString().split('T')[0],
          montoTotal: this.valornominal,
          tasaEfectiva: this.teacalc.toString(),
          idcartera: this.idcartera,
        })
        .subscribe();
      this.isDialogOpen = false;
      // Restablece los campos del formulario
      this.numfactura = '';
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
    this.dataSource = new MatTableDataSource<Factura>([]); // Restablece el estado del array de carteras
    this.dataSource2 = new MatTableDataSource<Reporte>([]); // Restablece el estado del array de carteras
    this.ngOnInit(); // Reejecuta el método ngOnInit
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
    console.log('Datos de conversion:', data);
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
          console.log('Valor convertido:', valorConvertido);
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
  costosiniciales: string = '';
  costosfinales: string = '';

  fechadescD: Date | null = null;
  costosinicialesD: string = '';
  costosfinalesD: string = '';

  isDialogOpen2 = false; // Controla la visibilidad del diálogo

  descuento: Descuento = {
    descuento: '1234',
    valorNeto: '5000',
    tcea: '20.45',
    valorRecibido: '4000',
    valorEntregado: '4000',
  };

  registrarDatosDescuentoDialog(): void {
    this.isDialogOpen2 = true; // Con
  }

  calcularDescuento(): void {
    //LLAMAR AL CONTROLADOR DE CALCDESCUENTO DE descuentocontroller
    this.dataSource2 = new MatTableDataSource<Reporte>([]); // Restablece el estado del array de carteras
    this.ngOnInit(); // Reejecuta el método ngOnInit
  }

  onCancel2(): void {
    this.isDialogOpen2 = false; // Cierra el diálogo
    this.fechadescD = null;
    this.costosinicialesD = '';
    this.costosfinalesD = '';
  }

  onRegister2(): void {
    (this.fechadesc = this.fechadescD!.toISOString().split('T')[0]),
      this.server
        .insertardescC({
          id_cartera: this.idcartera,
          fechaTransaccion: this.fechadescD!.toISOString().split('T')[0],
        })
        .subscribe(() => {
          console.log('TRANSACCION REALIZADA :');
        });
    this.isDialogOpen2 = false;
    // Restablece los campos del formulario
    this.fechadescD = null;
    //obtener el id de la transaccion
  }


  ///========================================REPORTE
  

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
            <title>Imprimir detalle factura</title>
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

interface Reporte {
  idletfac: number;
  numletfac: string;
  fechaem: string;
  fechaven: string;
  valornom: number;
  tea: number;
  fechadesc: string;
  valorneto: number;
  costeinicial: number;
  costefinal: number;
  valorrecibido: number;
  valorentregado: number;
  tcea: number;
}

interface Factura {
  idFactura: number;
  numeroFactura: String;
  fechaEmision: String;
  fechaVencimiento: String;
  montoTotal: String;
  tasaEfectiva: String;
  idcartera: number;
}

interface Descuento {
  descuento: string;
  valorNeto: string;
  tcea: string;
  valorRecibido: string;
  valorEntregado: string;
}
