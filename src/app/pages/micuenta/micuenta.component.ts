import { Component } from '@angular/core';

@Component({
  selector: 'app-micuenta',
  standalone: true,
  imports: [],
  templateUrl: './micuenta.component.html',
  styleUrl: './micuenta.component.css'
})
export class MicuentaComponent {

  selectedStatus: string = 'Mi cuenta';

  username:string='';
  
  ngOnInit(): void {
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    //console.log('esto es la cartera', userData);
    this.username=userData.username;
  }
}
