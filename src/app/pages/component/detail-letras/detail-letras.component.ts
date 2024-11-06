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


}