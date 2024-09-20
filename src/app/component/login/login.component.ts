import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api/api.service';
import {
  _closeDialogVia,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { T } from '@angular/cdk/keycodes';
import { MostrarloginComponent } from '../mostrarlogin/mostrarlogin.component';
import { Router, RouterLink } from '@angular/router';
interface Login {
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  data: any[] = [];
  readonly dialog = inject(MatDialog);
  constructor(private apiservice: ApiService, private route: Router) {
  }
  errorMessage = signal('');
  FormgroupLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  login() {
    console.log("datos", this.FormgroupLogin.value);
  }
  obtenerdata() {
    this.apiservice.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);

    })
    const usernameControl = this.FormgroupLogin.get('username');
    const pwcontrol=this.FormgroupLogin.get('password');
    if (usernameControl) {
      const usernamevalue = usernameControl.value;
      console.log(usernamevalue);
      const userexist = this.data.find(e => e.usuario === usernamevalue && e.password===pwcontrol?.value);
    
      if (userexist) {

        console.log('bienvenido: ', userexist.name)
        sessionStorage.setItem('username', userexist.usuario);
        this.dialog.closeAll();
        this.route.navigate(['/panel'] );
      }
      else {
        console.log("usuario no encontrado");
      }
      //this.dialog.open(MostrarloginComponent, { data:{username:'leonardo'} })
    }
  }
  updateErrorMessage() {
    const usernameContro = this.FormgroupLogin.get('username');

    if (usernameContro && usernameContro.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else {
      this.errorMessage.set('');
    }
  }

};

