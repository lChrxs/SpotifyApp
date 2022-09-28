import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService{

  credentials = {
    clientId: "106b1801ba274e508294fd2b62cc4eed",
    clientSecret: "7190ba99145d40c297eef33cd2737d08",
    accessToken: ""
  }

  tokenUrl = 'https://accounts.spotify.com/api/token'
  spotifyUrl = 'https://api.spotify.com/v1/'

  constructor(
    private http: HttpClient,
    public router: Router  
  ) { 
    this.updateToken();
  }

  updateToken(): void{
    this.credentials.accessToken = sessionStorage.getItem('token') ?? ''
  }

/**
 * It gets the access token from the Spotify API and stores it in the sessionStorage with the key token, then navigates to home
 */
  // getToken(): void{
  //   const body = new HttpParams()
  //     .set('grant_type', 'client_credentials')
  //     .set('client_id', this.credentials.clientId)
  //     .set('client_secret', this.credentials.clientSecret);

  //   this.http.post(this.tokenUrl, body.toString(), {
  //     headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  //   }).subscribe({
  //       next: (res: any) => {
  //         sessionStorage.setItem('token', res.access_token)
  //         // this.router.navigate(['/home'])
  //       },
  //       error: (err) => {
  //         console.error(err)
  //       },
  //       complete: () => console.info('Peticion completa')
  //     })
  // }

  checkSpotifyToken(): boolean{
    let check = (sessionStorage.getItem('token')) ? true : false
    console.log('Auth: ' + check)
    return check
  }

  getNewReleases(): Observable<any>{
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${this.credentials.accessToken}` 
    // })
    return this.http.get(this.spotifyUrl + 'browse/new-releases').pipe(
      map((res: any) => {
        return res.albums.items
      })
    )
  }

  getAlbum(id: any): Observable<any>{
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${this.credentials.accessToken}` 
    // })
    return this.http.get(this.spotifyUrl + `albums/${id}`)
  }


  getArtistas(value: string): Observable<any>{
    return this.http.get(this.spotifyUrl + `search?q=${value}&type=artist&limit=20`).pipe(
      map((res: any) => {
        return res.artists.items
      })
    )
  }


}
