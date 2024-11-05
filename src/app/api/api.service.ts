import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private url = 'http://localhost:8080'
    constructor(private http: HttpClient) { }
    public getData(username: string, password: string): Observable<any> {
        const url = `${this.url}/api/usuario/login/${username}/${password}`;
        return this.http.get(url, { responseType: 'text' }).pipe(
          catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        // Aquí puedes manejar el error según lo desees
        let errorMessage = 'Ha ocurrido un error desconocido.';
        if (error.error instanceof ErrorEvent) {
          // Errores del lado del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Errores del lado del servidor
          errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));}
}
