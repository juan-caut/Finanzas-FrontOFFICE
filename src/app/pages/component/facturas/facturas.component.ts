import { Component } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
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

import { signal,ElementRef  } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

import {
  MatDatepicker,
} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [
    MatPaginatorModule, MatExpansionModule,
    MatCardModule,
    MatNativeDateModule, MatDatepicker,
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

  dataSource = new MatTableDataSource<Factura>([]);
  
  @Input() idcartera!: number;

  constructor(private server: ApiService,private datePipe: DatePipe) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.server
      .listafactura(this.idcartera)
      .subscribe((data: Factura[]) => {
        console.log('Datos obtenidos:', data);
        
        console.log('CARTERA NUM:', this.idcartera);

        const transformedData: Factura[] = data.map((factura) => ({
          idFactura: factura.idFactura,
          numeroFactura: factura.numeroFactura,
          fechaEmision: factura.fechaEmision.toString(),
          fechaVencimiento: factura.fechaVencimiento.toString(),
          tasaEfectiva: factura.tasaEfectiva.toString(),
          montoTotal: factura.montoTotal.toString(),
          idcartera:factura.idcartera
        }));
        this.dataSource.data = transformedData;
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
  facturaDetalle!:Factura;
  verFacturadetail(let1: Factura) {
    this.facturaDetalle=let1;
    this.selectedFacturaid=let1.idFactura?let1.idFactura:0;
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
          idcartera:this.idcartera
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
          idcartera:this.idcartera
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
  refreslist():void{
    this.dataSource= new MatTableDataSource<Factura>([]);; // Restablece el estado del array de carteras
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

  fechadescD: string | null = null;
  costosinicialesD: string = '';
  costosfinalesD: string = '';

  isDialogOpen2 = false; // Controla la visibilidad del diálogo

  descuento:Descuento={
    descuento: "1234",
    valorNeto: "5000",
    tcea: "20.45",
    valorRecibido: "4000",
    valorEntregado: "4000",
  };

  registrarDatosDescuentoDialog(): void {
    this.isDialogOpen2 = true; // Con
  }
  
  calcularDescuento(): void {
    //LLAMAR AL CONTROLADOR DE CALCDESCUENTO DE descuentocontroller
  }
  
  onDateChange(event: any): void {
    // Aplica el formato MM-dd-yyyy
    this.fechadescD = this.datePipe.transform(event, 'MM-dd-yyyy');
  }
  
  
  onCancel2(): void {
    this.isDialogOpen2 = false; // Cierra el diálogo
    this.fechadescD = '';
    this.costosinicialesD = '';
    this.costosfinalesD = '';
  }


  onRegister2(): void {
    this.fechadesc = this.fechadescD;
    this.costosiniciales = this.costosinicialesD;
    this.costosfinales = this.costosfinalesD;
    const data = {
      fechadescueto: this.fechadescD,
      costosiniciales: this.costosinicialesD,
      costosfinales: this.costosfinalesD,
    };
    console.log('Datos registrados:', data);
    this.isDialogOpen2 = false;
    // Restablece los campos del formulario
    this.fechadescD = '';
    this.costosinicialesD = '';
    this.costosfinalesD = '';
  }
}





interface Factura {
  idFactura: number;
  numeroFactura: String;
  fechaEmision: String;
  fechaVencimiento: String;
  montoTotal: String;
  tasaEfectiva: String;
  idcartera:number
}

interface Descuento {
  descuento: string;
  valorNeto: string;
  tcea: string;
  valorRecibido: string;
  valorEntregado: string;
}