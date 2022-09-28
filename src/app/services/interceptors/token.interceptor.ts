import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse, HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { BehaviorSubject, ConnectableObservable, Observable, throwError } from 'rxjs';
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
    let authReq = req;
    const token = sessionStorage.getItem('token');
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes('auth/signin') && error.status === 401) {
        //authReq = 
        const body = new HttpParams()
        .set('grant_type', 'client_credentials')
        .set('client_id', '106b1801ba274e508294fd2b62cc4eed')
        .set('client_secret', '7190ba99145d40c297eef33cd2737d08');
  
        this.http.post('https://accounts.spotify.com/api/token', body.toString(), {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        })
        .toPromise()
        .then(
          (res:any) => {
            sessionStorage.setItem('token', res.access_token); 
            const token = res.access_token;
            console.log(token);
        
            let authReq401 = authReq.clone({ headers: authReq.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`) });
            return next.handle(authReq401);
          }
        )

        /*this.handle401Error(authReq, next).then(
          data => {
            console.log(data);
            return next.handle(data)
          }
        ) */       
      }
      return error
    }));
  }

  getToken(request: HttpRequest<any>, next: HttpHandler) {
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', '106b1801ba274e508294fd2b62cc4eed')
      .set('client_secret', '7190ba99145d40c297eef33cd2737d08');

    return this.http.post('https://accounts.spotify.com/api/token', body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    })
    .toPromise()
    .then(
      (res:any) => {
        sessionStorage.setItem('token', res.access_token); 
      }
    )
  }

  private async handle401Error(request: HttpRequest<any>, next: HttpHandler) : Promise<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      // this.refreshTokenSubject.next(null);
      await this.getToken(request, next);      

      const token = sessionStorage.getItem('token');
      console.log(token);
  
      let authReq = request;
      
      if (token != null) {
        authReq = this.addTokenHeader(request, token);
      }
  
      return authReq;
    }

    return request;
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`) });
  }
}
