import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 👈 Reemplaza BrowserModule por CommonModule


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, CommonModule ], // Módulos necesarios se importan directamente aquí

})
export class LoginComponent {
  user = {
    email: '',
    password: '',
    rememberMe: false
  };

  onSubmit() {
    console.log('User:', this.user);
    // Aquí puedes agregar la lógica de autenticación
  }
}
