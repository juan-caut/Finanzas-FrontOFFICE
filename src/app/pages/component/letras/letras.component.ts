import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, model, ViewChild } from '@angular/core';
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


@Component({
  selector: 'app-letras',
  standalone: true,
  imports: [MatPaginatorModule,MatCardModule,MatNativeDateModule,MatDatepickerModule, MatCheckboxModule, MatTableModule, MatIconModule, DetailLetrasComponent,CommonModule,FormsModule,MatTabsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './letras.component.html',
  styleUrl: './letras.component.css'
})
export class LetrasComponent implements  AfterViewInit {

  goLetraDetail:boolean=false;



  displayedColumns: string[] = ['select','idletra', 'numletra', 'fechaemision', 'fechavencim', 'tasaefectiva', 'valornominal', 'detalle'];
  
  dataSource = new MatTableDataSource<Letra>([
    { idletra: 10248, numletra: '234234', fechaemision: '2024-01-06', fechavencim: '2013-01-06', tasaefectiva: '10', valornominal: '10000' },
    { idletra: 10249, numletra: '234334', fechaemision: '2024-01-06', fechavencim: '2013-01-06', tasaefectiva: '20', valornominal: '5800' },
    { idletra: 10248, numletra: '234234', fechaemision: '2024-01-06', fechavencim: '2013-01-06', tasaefectiva: '10', valornominal: '10000' },
    { idletra: 10249, numletra: '234334', fechaemision: '2024-01-06', fechavencim: '2013-01-06', tasaefectiva: '20', valornominal: '5800' },
    { idletra: 10248, numletra: '234234', fechaemision: '2024-01-06', fechavencim: '2013-01-06', tasaefectiva: '10', valornominal: '10000' },
    { idletra: 10249, numletra: '234334', fechaemision: '2024-01-06', fechavencim: '2013-01-06', tasaefectiva: '20', valornominal: '5800' },
    { idletra: 10248, numletra: '234234', fechaemision: '2024-01-06', fechavencim: '2013-01-06', tasaefectiva: '10', valornominal: '10000' },
    { idletra: 10249, numletra: '234334', fechaemision: '2024-01-06', fechavencim: '2013-01-06', tasaefectiva: '20', valornominal: '5800' },
    { idletra: 10248, numletra: '234234', fechaemision: '2024-01-06', fechavencim: '2013-01-06', tasaefectiva: '10', valornominal: '10000' },
    { idletra: 10249, numletra: '234334', fechaemision: '2024-01-06', fechavencim: '2013-01-06', tasaefectiva: '20', valornominal: '5800' },
    { idletra: 10248, numletra: '234234', fechaemision: '2024-01-06', fechavencim: '2013-01-06', tasaefectiva: '10', valornominal: '10000' },
    { idletra: 10249, numletra: '234334', fechaemision: '2024-01-06', fechavencim: '2013-01-06', tasaefectiva: '20', valornominal: '5800' },
    { idletra: 10248, numletra: '234234', fechaemision: '2024-01-06', fechavencim: '2013-01-06', tasaefectiva: '10', valornominal: '10000' },
    { idletra: 10249, numletra: '234334', fechaemision: '2024-01-06', fechavencim: '2013-01-06', tasaefectiva: '20', valornominal: '5800' },
  ]);

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

  verLetradetail(idletra:string){
    this.goLetraDetail=true;
  }

  ///// ==========================================DIALOG REGISTRO LETRAA
  isDialogOpen = false; // Controla la visibilidad del diálogo

  numletra: string='';
  fechaemision: string='';
  fechavencim: string="";
  tasaefectiva: string='';
  valornominal:string= '';

  openRegistrarLetra(): void {
    this.isDialogOpen = true; // Con
  }

  onCancel(): void {
    this.isDialogOpen = false; // Cierra el diálogo
  }

  onRegister(): void {
    const data = {
      numletra: this.numletra,
      fechaemision: this.fechaemision,
      fechavencim: this.fechavencim,
      tasaefectiva: this.tasaefectiva,
      valornominal:this.valornominal
    };
    console.log('Datos registrados:', data);
    this.isDialogOpen = false;
    // Restablece los campos del formulario
    this.numletra='';
    this.fechaemision='';
    this.fechavencim='';
    this.tasaefectiva='';
    this.valornominal='';
  }

  activeTab = 'tab1'; // Define una propiedad para rastrear la pestaña activa

  // Método para cambiar la pestaña activa
  openTab(tabId: string): void {
    this.activeTab = tabId;
  }

  //================CALENDAR============
  selected: Date | null = null;
  selected2: Date | null = null;
  isCalendarVisible: boolean = false;
  isCalendar2Visible: boolean = false;

  showCalendar(): void {
    this.isCalendarVisible = true;
  }
  showCalendar1(): void {
    this.isCalendar2Visible = true;
  }

  hideCalendar(): void {
    // Usamos un pequeño retardo para permitir la selección antes de ocultar
    setTimeout(() => this.isCalendarVisible = false, 50);
  }
  hideCalendar2(): void {
    // Usamos un pequeño retardo para permitir la selección antes de ocultar
    setTimeout(() => this.isCalendar2Visible = false, 50);
  }

  onDateChange(date: Date): void {
    this.isCalendarVisible = false;  // Oculta el calendario después de seleccionar una fecha
    // Convertir la fecha seleccionada al formato DD/MM/AAAA
    this.fechaemision = formatDate(date, 'dd/MM/yyyy', 'en-US');
  }
  onDateChange2(date: Date): void {
    this.isCalendar2Visible = false;  // Oculta el calendario después de seleccionar una fecha
    // Convertir la fecha seleccionada al formato DD/MM/AAAA
    this.fechavencim = formatDate(date, 'dd/MM/yyyy', 'en-US');
  }

  

}



interface Letra {
  idletra: number;
  numletra:string;
  fechaemision: string;
  fechavencim: string;
  tasaefectiva: string;
  valornominal: string;
}