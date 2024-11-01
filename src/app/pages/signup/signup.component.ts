import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 👈 Reemplaza BrowserModule por CommonModule
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  standalone: true, // ¡Este es un componente standalone!
  imports: [FormsModule,CommonModule,MatFormFieldModule],
})
export class SignupComponent {
  user = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('User:', this.user);
    // Aquí puedes conectar con tu backend para registrar al usuario.
  }
}
