import { Injectable } from '@angular/core';
import StorageHelper from '../libs/helpers/storage.helper';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: string = 'Chris111';
  private password: string = '123456';

  constructor() { }

  login(loginForm: any): Observable<any>{

    return new Observable<boolean>(observer => {
      if(this.user === loginForm.user && this.password === loginForm.password){
        StorageHelper.setItem('auth', 'true')
        observer.next(true)
      }else {
        observer.next(false)
        throw new Error('Credenciales incorrectas')
      }
    })




    
   
  }
}
