import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { SpotifyService } from '../spotify.service';
import StorageHelper from 'src/app/libs/helpers/storage.helper';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private spotifyS: SpotifyService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // *Validamos si la ruta es para solicitar el token, si es asi solo retorna la petición
    if(req.url.includes('api/token')) return next.handle(req)

    // *Guardamos la petición original en caso de que haya expirado el Token para poder volver a hacerla cando se tenga un Token valido
    let originalReq = req;

    // *Clonamos la petición para incluir el header de Authorization con el Bearer token
    req = req.clone({
      setHeaders: {
        Authorization: "Bearer " + StorageHelper.getItem('token')  
      }
    })

    return next.handle(req).pipe(
      catchError(error => { //Si hay un error, lo cachamos
        if (error instanceof HttpErrorResponse && error.status === 401) { //Validamos si el error es de tipo HttpErrorResponse y si el status es 401
          return this.refreshToken(originalReq, next)
        }

      return error //Si el error no es de tipo HttpErrorResponse y/o el status no es 401, retornamos ese error
      })
    );
  }


/**
 * We're going to get a new token from the Spotify API, then we're going to clone the original request
 * and add the new token to the header, then we're going to send the request to the next handler
 * @param originalReq - The original request that was intercepted by the interceptor.
 * @param {HttpHandler} next - HttpHandler - This is the next handler in the chain.
 * @returns The next.handle(originalReq) is being returned.
 */
  private refreshToken(originalReq: HttpRequest<unknown>, next: HttpHandler){
    return this.spotifyS.getToken().pipe(
      switchMap((res: any) => {
        StorageHelper.setItem('token', res.access_token) //*Guardamos el nuevo Token en el SessionStorage con la key "token"

        originalReq = originalReq.clone({
          setHeaders: {
            Authorization: "Bearer " + StorageHelper.getItem('token')  
          }
        })

        return next.handle(originalReq)

      })
    )
  }


}
