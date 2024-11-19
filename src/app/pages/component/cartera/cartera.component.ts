import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DetailLetrasComponent } from '../detail-letras/detail-letras.component';
import { LetrasComponent } from '../letras/letras.component';
import { FacturasComponent } from '../facturas/facturas.component';
import { ApiService, carteraGrabar } from '../../../api/api.service';
import { MatMenuModule } from '@angular/material/menu';
interface CarteraElect {
  idcartera: number;
  nombrec: String;
  fechacrea: String;
  tipodoc: String;
  moneda: String;
  tasaCambio: String;
}
@Component({
  selector: 'app-cartera',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatDialogModule, // Incluye MatDialogContent, MatDialogTitle, MatDialogActions y MatDialogClose
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule, // Incluye MatSelect y MatOption
    DetailLetrasComponent,
    LetrasComponent,
    FacturasComponent,
    MatMenuModule

  ],
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.css'], // Cambié `styleUrl` por `styleUrls`
})
export class CarteraComponent implements OnInit, AfterViewInit {
  @ViewChild(LetrasComponent) letraComponent!: LetrasComponent;
  @ViewChild(FacturasComponent) facturaComponent!: FacturasComponent;

  selectedStatus: string = 'Gestión de carteras';
  selectedCarteraId!: number;
  goLetras: boolean = false;
  goFacturas: boolean = false;

  carterau: CarteraElect[] = [];
  constructor(private carteraService: ApiService) { }

  ngOnInit(): void {
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    //console.log('esto es la cartera', userData);
    const activate = this.carteraService.getlistCartera(
      parseInt(userData.iduser)
    );
    activate.forEach((data) => {
      data.map(
        (datareal) =>
        (this.carterau = [
          ...this.carterau,
          {
            idcartera: datareal.idCartera,
            nombrec: datareal.nombreCartera,
            moneda: datareal.moneda,
            tipodoc: datareal.tipoDoc,
            fechacrea: datareal.fechaCreacion,
            tasaCambio: datareal.tasaCambio,
          },
        ])
      );
    });
    //console.log('esto es la cartera', this.carterau);
  }
  editarCartera(cartera: any) {
    // Implementa la lógica para editar la cartera
    //console.log('Editando cartera:', cartera);
  }

  eliminarCartera(cartera: any) {
    //console.log('Editando cartera:', cartera);

    this.carteraService.eliminarCartera(cartera.idcartera).subscribe(
      (response) => {
       // console.log('Cartera eliminada con éxito:', response);
        // Realiza cualquier otra acción que desees tras la eliminación
        this.refreslist();
      },
      (error) => {
        console.error('Error al eliminar la Cartera:', error);
      }
    );;
  }
  ngAfterViewInit(): void { }

  refreslist(): void {
    this.carterau = []; // Restablece el estado del array de carteras
    this.ngOnInit();    // Reejecuta el método ngOnInit
  }

  get listCart() {
    return this.carterau.slice().sort((a, b) => {
      // Convertimos las fechas a objetos Date para una comparación precisa
      const fechaA = a.idcartera;
      const fechaB = b.idcartera;

      return fechaA - fechaB; // Orden ascendente por fechacrea
    });
  }

  isDialogOpen = false; // Controla la visibilidad del diálogo
  nombredoc: string = '';
  tipodoc: string = '';
  monedadoc: string = '';
  tasaCambio: string = '';
  openRegistrarDialog(): void {
    this.isDialogOpen = true; // Con
  }
  onCancel(): void {
    this.isDialogOpen = false; // Cierra el diálogo
  }
  onRegister(): void {
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    const tasaCambioNum = parseFloat(this.tasaCambio);
    if (isNaN(tasaCambioNum) || tasaCambioNum <= 0) {
      console.error('La tasa de cambio debe ser un número válido mayor que 0.');
      return;
    }
    const data = {
      nombre: this.nombredoc,
      tipo: this.tipodoc,
      moneda: this.monedadoc,
      tasaCambio: tasaCambioNum,
    };

    const carteraData: carteraGrabar = {
      nombreCartera: data.nombre,
      tipoDoc: data.tipo,
      moneda: data.moneda,
      fechaCreador: new Date().toISOString(),
      tasaCambio: data.tasaCambio.toString(),
      usuarioCreador: {
        iduser: userData.iduser, // Asegúrate de que iduser existe en el JSON
        username: userData.username,
        ident: userData.ident,
        password: userData.password,
        email: userData.email,
        estado: userData.estado,
        fechacreacion: userData.fechacreacion,
        rol: {
          idRol: userData.rol?.idRol, // Opcional: ? verifica que rol existe
          name: userData.rol?.name,
        },
      },
    };
   // console.log('esta el el json ', carteraData);
    this.carteraService.createCartera(carteraData).subscribe({
      next: (response) => {
       // console.log('Cartera creada exitosamente:', response);
      },
      error: (err) => {
        console.error('Error al crear la cartera:', err);
      },
    });
    this.isDialogOpen = false;
    this.nombredoc = '';
    this.tipodoc = '';
    this.monedadoc = '';
    this.tasaCambio = '';

  }

  goListLetFac(carter: CarteraElect) {
    this.selectedCarteraId = carter.idcartera ? carter.idcartera : 0;
    //console.log(this.selectedCarteraId);
    if (this.selectedCarteraId !== null) {
      this.goLetras = carter.tipodoc === 'LETRA';
      this.goFacturas = carter.tipodoc === 'FACTURA';
    }
    if (carter.tipodoc === 'LETRA') {
      this.goLetras = true;
      //this.letraComponent.idcartera  = carter.idcartera;
    } else if (carter.tipodoc === 'FACTURA') {
      this.goFacturas = true;
      //this.facturaComponent.idcartera = carter.idcartera!;
    }
  }
}
