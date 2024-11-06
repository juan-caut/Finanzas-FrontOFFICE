import { Component, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-detail-letras',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule,MatCheckboxModule,MatExpansionModule],
  templateUrl: './detail-letras.component.html',
  styleUrl: './detail-letras.component.css',
  animations: [
    trigger('transitionMessages', [
      state('void', style({ opacity: 0 })),
      state('enter', style({ opacity: 1 })),
      transition('void => enter', [
        animate('300ms ease-in')
      ]),
      transition('enter => void', [
        animate('300ms ease-out')
      ])
    ])
  ]
})



export class DetailLetrasComponent {



  
  readonly panelOpenState = signal(false);


  
}