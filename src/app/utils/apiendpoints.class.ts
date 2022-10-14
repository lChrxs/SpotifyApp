export class ApiEndpoints {
  

  /**
   * It takes the number of albums to omit and return the endpoint string with the offset number
   * @param {number} offset - The index of the first album to return. Default: 0 (the first object).
   * Maximum offset: 100.000. Use with limit to get the next set of albums.
   * @returns Api endpoint for new-releases
   */
  static getNewReleases(offset: number){
    return `browse/new-releases?country=MX&limit=25&offset=${offset}`
  }

/**
 * It takes the album id and return the endpoint string with the album id
 * @param {any} id - any
 * @returns Api endpoint for album
 */
  static getAlbum(id: any){
    return `albums/${id}`
  }

/**
 * It takes the artist the user types and return the endpoint to search the artist the user is looking for
 * @param {string} artist - the artist value of the search input
 * @returns Api endpoint for search artist
 */
  static getArtist(artist: string){
    return `search?q=${artist}&type=artist&limit=20`
  }

/**
 * It takes the artist id and return the endpoint to search the artist top tracks in Mexico
 * @param {any} id - The id of the artist
 * @returns Api endpoint for artist top tracks in Mexico
 */
  static getArtistSong(id: any){
    return `artists/${id}/top-tracks?market=MX`
  }
}