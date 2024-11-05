
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-detail-letras',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,MatCheckboxModule],
  templateUrl: './detail-letras.component.html',
  styleUrl: './detail-letras.component.css'
})
export class DetailLetrasComponent {

}