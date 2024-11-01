import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule } from '@angular/common'; // 👈 Reemplaza BrowserModule por CommonModule
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'FinanzasFront';
}
