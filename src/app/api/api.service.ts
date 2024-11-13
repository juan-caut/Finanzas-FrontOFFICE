import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
//import test from "node:test";
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
export interface LetraModificar {
  id: number;
  fechaInicial: String;
  fechaVencimiento: String;
  tasaEfectAnual: number;
  valorNominal: number;
}
export interface Letragrabar {
  idLetra: number;
  numeroLetra: string;
  fechaEmision: string;
  fechaVencimiento: string;
  valorNominal: number;
  tasaEfectiva: number;
  carteraid: number;
}

export interface TasaConversion {
  tasaNominal: number;
  tipoTasa: number;
  capitalizacion: number;
  tasaEfectiva: number;
}

export interface letraResposive {
  idLetra: number;
  numeroLetra: String;
  fechaEmision: Date;
  fechaVencimiento: Date;
  valorNominal: number;
  tasaEfectiva: number;
  visible: boolean;
  cartera: {
    idCartera: number;
    nombreCartera: String;
    fechaCreacion: Date;
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
      fechacreacion: Date;
      rol: {
        idRol: number;
        name: String;
      };
    };
  };
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
    };
  };
}
export interface UserCrearRequest {
  username: String;
  ident: String;
  email: String;
  passwordd: String;
  idRol: number;
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
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = `${environment.base}`;

  //USER SERVICES
  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<any> {
    return this.http.get(`${this.url}/api/usuario/login`, {
      params: { username, password },
      responseType: 'text',
    });
  }

  public getdataUser(username: string): Observable<any> {
    const url = `${this.url}/api/usuario/get`;
    return this.http
      .get(url, { params: { username: username } })
      .pipe(catchError(this.handleError));
  }

  //CARTERA SERVICES

  public crearuser(username: UserCrearRequest): Observable<any> {
    const url = `${this.url}/api/usuario`;
    return this.http.post(url, username).pipe(catchError(this.handleError));
  }

  public getlistCartera(usuarioId: number): Observable<Cartera[]> {
    const url = `${this.url}/api/cartera/carteraByUser`;
    console.log('idusuiario ingresado:', usuarioId);
    return this.http.get<Cartera[]>(url, { params: { usuarioId: usuarioId } });
  }
  public createCartera(carteraData: carteraGrabar): Observable<String> {
    const url = `${this.url}/api/cartera`; // Cambia esto según la estructura de tu API
    return this.http.post<String>(url, carteraData).pipe(
      catchError((error) => {
        console.error('Error en createCartera:', error);
        return throwError(error);
      })
    );
  }

  //LETRA SERVICES

  public eliminarCartera(id: number) {
    const url = `${this.url}/api/cartera/eliminar`;
    const params = new HttpParams().set('id', id);
    return this.http.delete(url, { params }).pipe(catchError(this.handleError));
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
    const url = `${this.url}/api/letra`; // Cambia esto según la estructura de tu API
    console.log('letra insertando...', letra);
    return this.http.post<any>(url, letra);
  }
  public modificarletra(letra: LetraModificar): Observable<any> {
    const url = `${this.url}/api/letra/actualizacion`;
    return this.http.put(url, letra).pipe(catchError(this.handleError));
  }
  public eliminarLetra(id: number) {
    const url = `${this.url}/api/letra/eliminar`;
    const params = new HttpParams().set('id', id);
    return this.http.delete(url, { params }).pipe(catchError(this.handleError));
  }

  //CONV TASA SERVICES
  public convTasa(tasaconv: TasaConversion): Observable<any> {
    const url = `${this.url}/api/conversiontasa`; // Cambia esto según la estructura de tu API
    console.log('tasaconv insertando...', tasaconv);
    return this.http.post<any>(url, tasaconv);
  }

  //TRANSACTION SERVICES

  public gettransacpletra(id: number): Observable<Transaccion> {
    const url = `${this.url}/api/transaccion/trapletr/${id}`; // Incluye `id` en la URL directamente
    return this.http.get<Transaccion>(url).pipe(
      catchError((error) => {
        console.error('Error en createCartera:', error);
        return throwError(error);
      })
    );
  }
  public gettransacpfactura(id: number): Observable<Transaccion> {
    const url = `${this.url}/api/transaccion/trapfact/${id}`; // Incluye `id` en la URL directamente
    return this.http.get<Transaccion>(url).pipe(
      catchError((error) => {
        console.error('Error en createCartera:', error);
        return throwError(error);
      })
    );
  }


  public insertardatosdesc(transac: Transaccion): Observable<any> {
    const url = `${this.url}/api/transaccion`; // Cambia esto según la estructura de tu API
    console.log('transaccion insertando...', transac);
    return this.http.post<any>(url, transac);
  }

  
  public insertardescC(transac: TransaccionC): Observable<any> {
    const url = `${this.url}/api/transaccion/transacart`; // Cambia esto según la estructura de tu API
    console.log('transaccion insertando...', transac);
    return this.http.post<any>(url, transac);
  }

  //DESCUENTO SERVICES

  public getdescuentotra(idtra: number): Observable<Descuento> {
    const url = `${this.url}/api/descuento/descontar`;
    console.log('TRANSACCION ... :', idtra);
    return this.http.get<Descuento>(url, { params: { idtra } }).pipe(
      catchError((error) => {
        console.error('Error en createCartera:', error);
        return throwError(error);
      })
    );
  }

  //FACTURA SERVICES
  public listafactura(carteraId: number): Observable<Factura[]> {
    const url = `${this.url}/api/factura/listart`; // Cambia esto según la estructura de tu API
    return this.http.get<Factura[]>(url, { params: { carteraId } }).pipe(
      catchError((error) => {
        console.error('Error en createCartera:', error);
        return throwError(error);
      })
    );
  }

  public crearfactura(fac: Factura): Observable<any> {
    const url = `${this.url}/api/factura/insert`; // Cambia esto según la estructura de tu API
    console.log('Factura insertando...', fac);
    return this.http.post<any>(url, fac);
  }

//REPORTE:
public getreport(idcar: number): Observable<Reporte[]> {
  const url = `${this.url}/api/cartera/carterareport`;
  console.log('REPORTE POR CARTERA:', idcar);
  return this.http.get<Reporte[]>(url, { params: { idcar: idcar } });
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

export interface TransaccionC {
  fechaTransaccion: string;
  id_cartera: number;
}

export interface Reporte{
   idletfac: number ;
   numletfac: string;
   fechaem: string;
   fechaven: string;
   valornom: number ;
   tea: number ;
   fechadesc: string;
   valorneto: number ;
   costeinicial: number ;
   costefinal: number ;
   valorrecibido: number ;
   valorentregado: number ;
   tcea: number ;
}

export interface Factura {
  idFactura: number;
  numeroFactura: String;
  fechaEmision: String;
  fechaVencimiento: String;
  montoTotal: String;
  tasaEfectiva: String;
  idcartera: number;
}

export interface Transaccion {
  idTransaccion: number;
  idletra: number;
  idfactura: number;
  fechaTransaccion: string;
  costesIniciales: number;
  costesFinales: number;
  diasadesc: number;
}

export interface Descuento {
  idDescuento: number;
  idtransaccion: Descuento;
  descuento: number;
  valorNeto: number;
  tcea: number;
  valorRecibido: number;
  valorEntregado: number;
}
