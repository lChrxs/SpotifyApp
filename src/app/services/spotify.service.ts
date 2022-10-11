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
  getToken(): void{
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', this.credentials.clientId)
      .set('client_secret', this.credentials.clientSecret);

    this.http.post(this.tokenUrl, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }).subscribe({
        next: (res: any) => {
          sessionStorage.setItem('token', res.access_token)
        },
        error: (err) => {
          console.error(err)
        },
        complete: () => console.info('Peticion completa')
      })
  }

  adaptador(url: string){
    if(url.includes('browse/new-releases')){
      this.getNewReleases()
    }else if(url.includes('search?q=')){
      let link = new URL(url)
      let params = new URLSearchParams(link.search);
      let nombre = params.get('q')
      this.getArtistas(nombre!)
    }
  }

  // !No se esta usando, se puede usar en el Guard
  // checkSpotifyToken(): boolean{
  //   let check = (sessionStorage.getItem('token')) ? true : false
  //   console.log('Auth: ' + check)
  //   return check
  // }

  
/**
 * We're using the HttpClient to make a GET request to the Spotify API, and then we're using the map
 * operator to return the albums.items property from the response
 * @returns The new releases from the Spotify API
 */
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

/**
 * We're using the HttpClient to make a GET request to the Spotify API, and we're passing in the id of
 * the album we want to get
 * @param {any} id - The Spotify ID for the album.
 * @returns An observable of the album with the id that was passed in.
 */
  getAlbum(id: any): Observable<any>{
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${this.credentials.accessToken}` 
    // })
    return this.http.get(this.spotifyUrl + `albums/${id}`)
  }


/**
 * We're using the HttpClient to make a GET request to the Spotify API, and then we're using the RxJS
 * map operator to return the artists.items property from the response
 * @param {string} value - string - The value of the search input.
 * @returns An observable of an array of artists.
 */
  getArtistas(value: string): Observable<any>{
    return this.http.get(this.spotifyUrl + `search?q=${value}&type=artist&limit=20`).pipe(
      map((res: any) => {
        return res.artists.items
      })
    )
  }




}
