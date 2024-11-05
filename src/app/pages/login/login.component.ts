import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TabpanelComponent } from '../tabpanel/tabpanel.component';
import { Router } from '@angular/router';
import { ApiService } from '../../api/api.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule,HttpClientModule ], // Módulos necesarios se importan directamente aquí

})
export class LoginComponent {

  
  @ViewChild(TabpanelComponent) panelComponent!: TabpanelComponent;

  constructor( private router: Router,  private apiService:ApiService) {}


  user = {
    username: '',
    password: '',
    rememberMe: false
  };

  onSubmit() {

    this.apiService.getData(this.user.username, this.user.password).subscribe({
      next: (response) => {
        this.apiService.getdataUser(this.user.username).subscribe({
          next: (userData) => {
           sessionStorage.setItem('userData', JSON.stringify(userData));
           console.log('data',userData)
            this.router.navigate(['/panel']);
          },
          error: (err) => {
            console.error('Error al obtener los datos del usuario:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al autenticar:', err);
      }
    });
  }
 
}
