import { Component, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-detail-letras',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,MatCheckboxModule,MatExpansionModule],
  templateUrl: './detail-letras.component.html',
  styleUrl: './detail-letras.component.css',
})



export class DetailLetrasComponent {

  readonly panelOpenState = signal(true);
  
  readonly panelOpenState2 = signal(false);
  letra: Letra = {
    idletra: 1,
    numletra: '001',
    fechaemision: '2024-11-05',
    fechavencim: '2025-11-05',
    tasaefectiva: '5.00',
    valornominal: '1000.00'
  };

}

interface Letra {
  idletra: number;
  numletra:string;
  fechaemision: string;
  fechavencim: string;
  tasaefectiva: string;
  valornominal: string;
}