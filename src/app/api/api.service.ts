import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import test from "node:test";
import { catchError, Observable, throwError } from "rxjs";

export interface Letragrabar{

  numeroLetra: String,
  fechaEmision: String,
  fechaVencimiento: String,
  valorNominal: number,
  tasaEfectiva: number,
  carteraid: number
  
}




export interface letraResposive {
  idLetra: number,
  numeroLetra: String,
  fechaEmision: Date,
  fechaVencimiento: Date,
  valorNominal: number,
  tasaEfectiva: number,
  cartera: {
    idCartera: number,
    nombreCartera: String,
    fechaCreacion: Date,
    tipoDoc: String,
    moneda: String,
    tasaCambio: String,
    usuarioCreador: {
      iduser: number,
      username: String,
      ident: String,
      password: String,
      email: String,
      estado: String,
      fechacreacion: Date,
      rol: {
        idRol: number,
        name: String
      }
    }
  }



}
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
export interface Cartera {

  idCartera: number;
  nombreCartera: String;
  fechaCreacion: String;
  tipoDoc: String;
  moneda: String;
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
  public login(username: string, password: string): Observable<any> {
    return this.http.get(`${this.url}/api/usuario/login`, { params: { username, password }, responseType: 'text' })
      ;
  }

  public getdataUser(username: string): Observable<any> {
    const url = `${this.url}/api/usuario/get`;
    return this.http.get(url, { params: { username: username } }).pipe(
      catchError(this.handleError)
    );
  }

  public getlistCartera(usuarioId: number): Observable<Cartera[]> {
    const url = `${this.url}/api/carteraByUser`;
    console.log('idusuiario ingresado:', usuarioId);
    return this.http.get<Cartera[]>(url, { params: { usuarioId: usuarioId } })
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
  public listaletra(carteraId: number): Observable<letraResposive[]> {
    const url = `${this.url}/api/letra/letraByCartera`; // Cambia esto según la estructura de tu API
    return this.http.get<letraResposive[]>(url, { params: { carteraId } }).pipe(
      catchError((error) => {
        console.error('Error en createCartera:', error);
        return throwError(error);
      })
    );
  }

  public crearletra(letra: Letragrabar): Observable<any> {
    const url = `${this.url}/api/letra/save`; // Cambia esto según la estructura de tu API
    console.log('letra insertando...',letra)
    return this.http.post<any>(url, letra).pipe(
      
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
