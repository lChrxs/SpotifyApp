import { Artists } from "../interfaces/artists.interface";
import { Image, Releases } from "../interfaces/releases.interface";

export default class Transform {

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