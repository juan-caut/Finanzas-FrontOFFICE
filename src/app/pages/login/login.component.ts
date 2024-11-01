import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TabpanelComponent } from '../tabpanel/tabpanel.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule ], // Módulos necesarios se importan directamente aquí

})
export class LoginComponent {

  
  @ViewChild(TabpanelComponent) panelComponent!: TabpanelComponent;

  constructor(private router: Router) {}


  user = {
    email: '',
    password: '',
    rememberMe: false
  };

  onSubmit() {
    console.log('User:', this.user);
    // Aquí puedes agregar la lógica de autenticación
    this.router.navigate(['/panel']);

  }
 
}
