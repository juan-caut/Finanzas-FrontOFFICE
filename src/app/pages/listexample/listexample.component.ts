import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 Reemplaza BrowserModule por CommonModule

@Component({
  selector: 'app-listexample',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listexample.component.html',
  styleUrl: './listexample.component.css'
})
export class ListexampleComponent {
  contacts = [
    { name: 'Amelia Harper', role: 'Network Admin', company: 'ACME', status: 'Salaried', assignedTo: 'John Heart', phone: '+1(213)555-4276' },
    { name: 'Antony Remmen', role: 'Support Assistant', company: 'Clicker', status: 'Salaried', assignedTo: 'Samantha Bright', phone: '+1(310)555-6625' },
    // Agrega más contactos aquí...
  ]
}
