import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent implements OnInit {
  constructor(private route: Router) { }
  username: string | null = '';
  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    if (!this.username) {
      this.username = 'Usuario desconocido';
    }
  }

}
