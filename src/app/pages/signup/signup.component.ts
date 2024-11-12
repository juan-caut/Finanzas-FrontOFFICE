import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 👈 Reemplaza BrowserModule por CommonModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService, UserCrearRequest } from '../../api/api.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  standalone: true, // ¡Este es un componente standalone!
  imports: [FormsModule, CommonModule, MatFormFieldModule],
})
export class SignupComponent {
  constructor(private usercreate: ApiService, private route: Router) { }
  user = {
    username: '',
    ident: '',
    email: '',
    passwordd: '',
    confirmPassword: ''
  };

  onSubmit() {
    if (this.user.passwordd !== this.user.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const data = this.usercreate.crearuser({
      email: this.user.email, ident: this.user.ident, idRol: 2, passwordd: this.user.passwordd, username: this.user.username
    })
    data.forEach(data => { console.log('usuario creado') })
    this.route.navigate(['/panel']);
  }
}
