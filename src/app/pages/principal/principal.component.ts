import { Component } from '@angular/core';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { TopbarComponent } from '../layout/topbar/topbar.component';
import { ListexampleComponent } from '../listexample/listexample.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent,ListexampleComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

}
