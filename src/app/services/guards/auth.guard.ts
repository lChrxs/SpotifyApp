import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import StorageHelper from '../../libs/helpers/storage.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router: Router){ }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let authorize = StorageHelper.getItem('auth') ? true : false

      if(state.url.includes('login') && authorize){
        this.router.navigate(['home'])

      }else if(state.url.includes('login') && !authorize){
        return true
      }
      

      if(authorize){
        return true
        
      }else {
        this.router.navigate(['/login'])
        return true
      }
  }

}
