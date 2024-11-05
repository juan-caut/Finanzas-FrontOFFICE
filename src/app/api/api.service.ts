import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
export interface carteraGrabar {
  nombreCartera: String;
  tipoDoc: String;
  moneda: String;
  fechaCreador: string;
  tasaCambio: String;
  usuarioCreador: {
    iduser: number;
    username: String;
    ident: String;
    password: String;
    email: String;
    estado: String;
    fechacreacion: String;
    rol: {
      idRol: number;
      name: String;
    }
  }

}



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
  public getdataUser(username: string): Observable<any> {
    const url = `${this.url}/api/usuario/get/${username}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  public getlistCartera(usuarioId:string): Observable<any[]> {
    const url = `${this.url}/api/carteraByUser/${usuarioId}`;
    return this.http.get<any[]>(url);
  }
  public createCartera(carteraData: carteraGrabar): Observable<any> {
    const url = `${this.url}/api/api/cartera`; // Cambia esto según la estructura de tu API
    return this.http.post<any>(url, carteraData).pipe(
      catchError((error) => {
        console.error('Error en createCartera:', error);
        return throwError(error);
      })
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
    return throwError(() => new Error(errorMessage));
  }
}
