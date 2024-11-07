import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { DetailLetrasComponent } from '../detail-letras/detail-letras.component';
import { LetrasComponent } from '../letras/letras.component';
import { FacturasComponent } from '../facturas/facturas.component';
import { ApiService, carteraGrabar } from '../../../api/api.service';

interface Cartera {
  idcartera: number;
  nombrec: string;
  fechacrea: string;
  tipodoc: string;
  moneda: string;
  tasaCambio: string;
}
@Component({
  selector: 'app-cartera',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatButtonModule,
    FormsModule,
    MatSelect,
    MatOption,
    DetailLetrasComponent,
    LetrasComponent,
    FacturasComponent,
  ],
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.css'], // Cambié `styleUrl` por `styleUrls`
})
export class CarteraComponent implements OnInit, AfterViewInit {
  
  @ViewChild(LetrasComponent) letraComponent!: LetrasComponent;
  @ViewChild(FacturasComponent) facturaComponent!: FacturasComponent;
  
  selectedStatus: string = 'Gestión de carteras';

  goLetras: boolean = false;
  goFacturas: boolean = false;

  cartera: Cartera[] = [];

  constructor(private carteraService: ApiService) {}

  ngOnInit(): void {
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    console.log('esto es la cartera', userData);

    const activate = this.carteraService.getlistCartera(userData.iduser);
    activate.forEach((data) => {
      data.map(
        (datareal) =>
          (this.cartera = [
            ...this.cartera,
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
    console.log('esto es la cartera', this.cartera);
  }
  
  ngAfterViewInit(): void {
    // Ahora `letraComponent` y `facturaComponent` están disponibles
  }

  get listCart() {
    return this.cartera;
  }
  ///// ==========================================DIALOG REGISTRO CARTERA
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
    console.log('esta el el json ', carteraData);
    this.carteraService.createCartera(carteraData).subscribe({
      next: (response) => {
        console.log('Cartera creada exitosamente:', response);
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


  _idcarteraselect!:number;


  goListLetFac(carter: Cartera) {

    this._idcarteraselect=carter.idcartera;

    if (carter.tipodoc === 'LETRA' ) {
      this.goLetras = true;
      this.letraComponent.idcartera  = this._idcarteraselect;
    } else if (carter.tipodoc === 'FACTURA') {
      this.goFacturas = true;
      this.facturaComponent.idcartera = this._idcarteraselect;
    }
  }
}
