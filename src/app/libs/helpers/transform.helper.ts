import { Artists } from "../interfaces/artists.interface";
import { Image, Releases } from "../interfaces/releases.interface";

export default class Transform {

  /**
   * It takes an array of albums, and returns an array of Releases with the mapped properties
   * @param {any[]} albums - array of albums
   * @returns An array of Releases that have been mapped to the Releases interface
   */
  public static releases(albums: any[]): Releases[]{
    let mappedAlbums = albums.map(album => {

      let artistas: string[] = []
      let images: Image[] = []

      Object.keys(album).forEach(key => {
        if(key.includes('artists')){
          album[key].forEach((artist: any) => {
            artistas.push(artist.name)
            
          });
        
        }else if(key.includes('images')){
          album[key].forEach((image: any) => {
            images.push(image)
            
          });
        }
      })

      return {
        artists: artistas,
        external_urls: album.external_urls.spotify,
        id: album.id,
        images: images,
        name: album.name,
        release_date: album.release_date
      }
    })
    
    return mappedAlbums
  }

  
/**
 * It takes an array of artists, maps over them, and returns a new array of Artists with the mapped properties
 * @param {any[]} artists - artists array
 * @returns An array of objects that have been mapped to the Artists interface.
 */
  public static artists(artists: any[]): Artists[]{
    let mappedArtists = artists.map(artist => {
      let images: Image[] = []

      Object.keys(artist).forEach(key => {
        if(key.includes('images')){
          artist[key].forEach((image: any) => {
            images.push(image)
            
          });
        }
      })

      return {
        external_urls: artist.external_urls.spotify,
        followers: artist.followers.total,
        images: images,
        name: artist.name,
        id: artist.id
      }

    })

    return mappedArtists
  }
}