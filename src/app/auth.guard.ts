// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verifica si 'userData' está almacenado en sessionStorage
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      return true; // Permite el acceso si 'userData' existe
    } else {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
      return false;
    }
  }
}
