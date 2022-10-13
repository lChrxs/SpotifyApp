import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, concatMap, tap, concat, merge, combineLatestAll, combineLatest } from 'rxjs';
import { Constants } from '../utils/constants.class';
import { environment } from '../../environments/environment.prod';
import { ApiEndpoints } from '../utils/apiendpoints.class';
import StorageHelper from '../libs/helpers/storage.helper';
import Transform from '../libs/helpers/transform.helper';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService{

  private artistUrls: Observable<any>[] = []

  constructor(
    private http: HttpClient 
  ) { }


  getToken(): Observable<any>{
    //Preparamos el body con los parámetros que se necesitan para pedir un nuevo token
    const body = new HttpParams()
    .set('grant_type', 'client_credentials')
    .set('client_id', Constants.CLIENT_ID)
    .set('client_secret', Constants.CLIENT_SECRET)

    return this.http.post(environment.TOKEN_URL, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    })
  }



/**
 * It checks if the token is stored in the session storage
 * @returns True if token exist, false if token doesn't exist
 */
  checkSpotifyToken(): boolean{
    let check = StorageHelper.getItem('token') ? true : false
    return check
  }

  

/**
 * We're using the HttpClient to make a GET request to the Spotify API, and then we're using the map
 * operator to return the albums.items property from the response
 * @returns An observable of an array of albums.
 */
  getNewReleases(offset: number): Observable<any>{

    return this.http.get(environment.SPOTIFY_URL + ApiEndpoints.getNewReleases(offset)).pipe(
      map((res: any) => {
        return Transform.releases(res.albums.items)
      })
    )
  }


/**
 * This function takes an id as a parameter and returns an observable of type any
 * @param {any} id - The id of the album.
 * @returns Observable<any>
 */
  getAlbum(id: any): Observable<any>{
    return this.http.get(environment.SPOTIFY_URL + ApiEndpoints.getAlbum(id))
  }



/**
 * We're using the HttpClient to make a GET request to the Spotify API, and then we're using the map
 * operator to return the artists.items property from the response
 * @param {string} value - string - The value that the user types in the search bar.
 * @returns An observable of an array of artists.
 */
  getArtistas(value: string): Observable<any>{
    return this.http.get(environment.SPOTIFY_URL + ApiEndpoints.getArtist(value)).pipe(
      map((res: any) => {
        let transformRes = Transform.artists(res.artists.items)
        transformRes.forEach(artist => {
          this.artistUrls.push(this.http.get(environment.SPOTIFY_URL + ApiEndpoints.getArtistSong(artist.id)))
        })
        return transformRes
      }),
      concatMap((transformRes: any) => {
        
        return this.getArtistSongs(transformRes)
      })
      
    )
  }

  
  getArtistSongs(transformRes: any): Observable<any>{
    return merge(this.artistUrls).pipe(
      combineLatestAll(),
      map((res: any) => {
        
        let songs = res.map((item: any) => {
          return {
            album: item.tracks[0]?.name,
            song: item.tracks[0]?.preview_url
          }
        })

        let i = 0

        let newRes = transformRes
        newRes.forEach((artist: any) => {
          
          if(i < songs.length){
            artist.song = songs[i]
            i++
          }
          
        });
        
        return newRes
        
      })
      )
    }
    
    addLikedRelease(id: number){
      let list = JSON.parse(localStorage.getItem(Constants.MY_LIKED_RELEASES) ?? '[]')
      if(list.indexOf(id) == -1){
        list.push(id)
        localStorage.setItem(Constants.MY_LIKED_RELEASES, JSON.stringify(list))
      }
    }
  
    removeLikedRelease(id: number){
      let list = JSON.parse(localStorage.getItem(Constants.MY_LIKED_RELEASES) ?? '[]')
      let index = list.indexOf(id)
      if(index > -1){
        list.splice(index, 1)
        localStorage.setItem(Constants.MY_LIKED_RELEASES, JSON.stringify(list))
      }
    }
  
  
    checkLikedRelease(id: number): boolean {
      let list = JSON.parse(localStorage.getItem(Constants.MY_LIKED_RELEASES) ?? '[]')
      return (list.indexOf(id) > -1)
    }


  }
  