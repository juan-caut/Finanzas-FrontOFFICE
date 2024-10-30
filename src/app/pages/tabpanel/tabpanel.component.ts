import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 Reemplaza BrowserModule por CommonModule

import { MatIconModule } from '@angular/material/icon'; // 👈 Importamos el módulo

@Component({
  selector: 'app-tabpanel',
  standalone: true,
  // 👇 Importamos los módulos necesarios directamente en el componente standalone.
  imports: [CommonModule,MatIconModule ],
  templateUrl: './tabpanel.component.html',
  styleUrls: ['./tabpanel.component.css'], // 👈 Corrección: "styleUrl" -> "styleUrls"
  providers: [],
})
export class TabpanelComponent {
  statuses = [
    'Gestion de carteras',
    'Soporte',
    'In Progress',
    'Deferred',
    'Rejected',
    'Completed',
  ];
  botuses = [
    'Mi cuenta',
  ];

  selectedStatus = 'Gestion de carteras';

  tasks: Task[] = [
    { title: 'Online Sales', date: '2023/09/16', owner: 'Cindy Stanwick', status: 'Gestion de carteras' },
    { title: 'New Website Design', date: '2023/09/16', owner: 'Sammy Hill', status: 'In Progress' },
    { title: 'Bandwidth Increase', date: '2023/09/16', owner: 'Davey Jones', status: 'Gestion de carteras' },
    { title: 'Support', date: '2023/09/16', owner: 'Victor Norris', status: 'In Progress' },
    { title: 'Training Material', date: '2023/09/16', owner: 'John Heart', status: 'In Progress' },
  ];

  get filteredTasks() {
    return this.tasks.filter(task => task.status === this.selectedStatus);
  }

  selectStatus(status: string) {
    this.selectedStatus = status;
  }
}


interface Task {
  title: string;
  date: string;
  owner: string;
  status: string;
}
