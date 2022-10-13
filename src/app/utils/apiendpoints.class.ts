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

  static getAlbum(id: any){
    return `albums/${id}`
  }

  static getArtist(value: string){
    return `search?q=${value}&type=artist&limit=20`
  }

  static getArtistSong(id: any){
    return `artists/${id}/top-tracks?market=MX`
  }
}