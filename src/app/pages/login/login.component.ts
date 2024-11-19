import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TabpanelComponent } from '../tabpanel/tabpanel.component';
import { Router } from '@angular/router';
import { ApiService } from '../../api/api.service';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule]
})
export class LoginComponent {
  
  @ViewChild(TabpanelComponent) panelComponent!: TabpanelComponent;

  constructor(private router: Router, private apiService: ApiService) {}

  user = {
    username: '',
    password: '',
    rememberMe: false
  };

  onSubmit() {
    const { username, password } = this.user;

    this.apiService.login(username, password).subscribe({
      next: () => {
        this.apiService.getdataUser(this.user.username).subscribe({
          next: (userData) => {
           sessionStorage.setItem('userData', JSON.stringify(userData));
           //console.log('data',userData)
            this.router.navigate(['/panel']);
          },
          error: (err) => {
            console.error('Error al obtener los datos del usuario:', err);
          }
        });
      },
     
    });
  }
}
