import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse, HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { SpotifyService } from '../spotify.service';

// const TOKEN_HEADER_KEY = 'Authorization';  // for Spring Boot back-end
const TOKEN_HEADER_KEY = 'Authorization';    // for Node.js Express back-end

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private spotifyS: SpotifyService,
    private http: HttpClient  
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Validamos si la ruta es para solicitar el token, si es asi solo retorna la peticion, sino, valida si hay token, si lo hay, lo agrega a la peticion, sino, lo solicita, y en caso de que el token haya expirado, solicitda uno nuevo
    if(req.url.includes('api/token')) return next.handle(req)

    let authReq = req;
    const token = sessionStorage.getItem('token');

    if (token != null) {
      authReq = this.addTokenHeader(req, token); //Agrega el token a la peticion
    }

    // ?Si no hay error, regresa le peticion? o como funciona este return
    return next.handle(authReq).pipe(catchError(error => { //Si hay un error, lo cachamos
      if (error instanceof HttpErrorResponse && error.status === 401) { //Validamos si el error es de tipo HttpErrorResponse y si el status es 401

        //Preparamos el body con los parametros que se necistan para pedir un nuevo token
        const body = new HttpParams()
        .set('grant_type', 'client_credentials')
        .set('client_id', '106b1801ba274e508294fd2b62cc4eed')
        .set('client_secret', '7190ba99145d40c297eef33cd2737d08');
        
        return this.http.post('https://accounts.spotify.com/api/token', body.toString(), { //Hacemos la peticion para recibir un nuevo token
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        })
        .subscribe({ //Nos suscribimos a la peticion
          next: 
            (res:any) => {
              sessionStorage.setItem('token', res.access_token);  //Guardamos el nuevo token en su key del sessionStorage
              
              this.spotifyS.adaptador(req.url) //Llamamos al servicio SpotifyService y la funcion adptador
            }
        })
 
      }

      return error //Si el error no es de tipo HttpErrorResponse y/o el status no es 401, retornamos ese error
    }));
  }


  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`) });
  }
}
