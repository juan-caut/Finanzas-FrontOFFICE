import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, model, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { DetailLetrasComponent } from "../detail-letras/detail-letras.component";
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
// Importaciones necesarias
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';  // Importa MatCardModule
import { ApiService, letraResposive } from '../../../api/api.service';
//import { Init } from 'v8';


interface Letra {
  nombreletra: number;
  numletra: String;
  fechaemision: String;
  fechavencim: String;
  tasaefectiva: String;
  valornominal: String;
}
@Component({
  selector: 'app-letras',
  standalone: true,
  imports: [MatPaginatorModule, MatCardModule, MatNativeDateModule, MatDatepickerModule, MatCheckboxModule, MatTableModule, MatIconModule, DetailLetrasComponent, CommonModule, FormsModule, MatTabsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './letras.component.html',
  styleUrl: './letras.component.css'
})

export class LetrasComponent implements OnInit {
  dataSource = new MatTableDataSource<Letra>([]);
  @Input() idcartera!: number;
  constructor(private server: ApiService) { }
  ngOnInit(): void {
    this.server.listaletra(this.idcartera).subscribe(
      (data: letraResposive[]) => {
        console.log('Datos obtenidos:', data);

        const transformedData: Letra[] = data.map((letra) => ({
          nombreletra: letra.idLetra,
          numletra: letra.numeroLetra,
          fechaemision: (letra.fechaEmision).toString(),
          fechavencim: (letra.fechaVencimiento).toString(),
          tasaefectiva: letra.tasaEfectiva.toString(),
          valornominal: letra.valorNominal.toString(),
        }));
        this.dataSource.data = transformedData;
      },
    )
  }

  goLetraDetail: boolean = false;
  displayedColumns: string[] = ['select', 'idletra', 'numletra', 'fechaemision', 'fechavencim', 'tasaefectiva', 'valornominal', 'detalle'];


  selection = new SelectionModel<Letra>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toggleSelectAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
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

  verLetradetail(idletra: string) {
    this.goLetraDetail = true;
  }

  ///// ==========================================DIALOG REGISTRO LETRAA
  isDialogOpen = false; // Controla la visibilidad del diálogo

  numletra: string = '';
  fechaemision: string = '';
  fechavencim: string = "";
  tasaefectiva: string = '';
  valornominal: string = '';

  //tasanominal
  tasanominal: string = "";
  tipotasanominal: string = '';
  capitatasanom: string = '';
  teacalc: string = '';

  openRegistrarLetra(): void {
    this.isDialogOpen = true; // Con
  }

  onCancel(): void {
    this.isDialogOpen = false; // Cierra el diálogo
  }

  onRegister(): void {
    const data = {
      cartera: { idCartera: this.idcartera },
      fechaEmision: this.fechaemision,
      fechaVencimiento: this.fechavencim,
      numeroLetra: this.numletra,
      tasaEfectiva: parseFloat(this.tasaefectiva),
      valorNominal: parseFloat(this.valornominal)
    };
    console.log('Datos registrados:', data);
    this.server.crearletra({
      cartera: { idCartera: this.idcartera },
      fechaEmision: this.fechaemision,
      fechaVencimiento: this.fechavencim,
      numeroLetra: this.numletra,
      tasaEfectiva: parseFloat(this.tasaefectiva),
      valorNominal: parseFloat(this.valornominal)
    })
    this.isDialogOpen = false;
    // Restablece los campos del formulario
    this.numletra = '';
    this.fechaemision = '';
    this.fechavencim = '';
    this.tasaefectiva = '';
    this.valornominal = '';
  }

  activeTab = 'tab1'; // Define una propiedad para rastrear la pestaña activa

  // Método para cambiar la pestaña activa
  openTab(tabId: string): void {
    this.activeTab = tabId;
  }

}
