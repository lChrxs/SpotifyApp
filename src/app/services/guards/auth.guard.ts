import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../spotify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private spotifyS: SpotifyService){ }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // if(this.spotifyS.checkSpotifyToken()){
      //   return this.spotifyS.checkSpotifyToken();

      // }else {
      //   this.spotifyS.getToken();
      //   return false;
      // }
      return true
  }

}
